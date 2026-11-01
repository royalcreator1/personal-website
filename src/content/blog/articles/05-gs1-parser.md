---
id: "1293665633f7"
slug: "how-i-built-a-robust-gs1-parser-for-real-world-medical-barcodes-android-kotlin"
title: "How I built a robust GS1 parser for real-world medical barcodes (Android/Kotlin)"
publishedAt: "2025-12-09"
author: "Jaswanth"
category: "Android & integrations"
---

# How I built a robust GS1 parser for real-world medical barcodes (Android/Kotlin)

I had a Honeywell Android device with a scanner feeding my Android app raw GS1 strings **without** FNC1 separators. Many GS1 libraries assume clean, standards-compliant inputs (e.g., explicit group separators), but hospital labels don’t always cooperate. I needed a parser that could **reliably extract GTIN, lot, expiry, production, and serial** from messy strings produced by various medical products.

Here’s how I approached it and the reusable Kotlin “plugin” I ended up shipping.

## The real-world problem

Device: Honeywell handhelds scanning DataMatrix/GS1.

Input: raw strings with **no FNC1** (ASCII 29) and **inconsistent formatting** (duplicates, stray characters, missing wrappers).

Goal: extract these Application Identifiers (AIs):

- `01`: GTIN (fixed 14 digits)
- `10`: LOT (variable length)
- `17`: Expiry date (YYMMDD)
- `11`: Production date (YYMMDD)
- `21`: Serial (variable length)

Constraint: Many ribbons/labels cram values tightly; separators are absent; some scanners even **duplicate the whole payload** (`A + A`).

## Design principles

**Start from the first true GTIN**: find `01` that’s not preceded by a digit and only accept it if it’s followed by 14 digits.

**Sanitize but keep useful chars**: normalize Unicode, drop invisibles, keep `-`, `/`, `.` because lots often contain them (e.g., `C24137/C`).

**Guard dates**: accept `11` and `17` **only** if followed by a valid YYMMDD (not just six digits).

**Heuristics for variable fields**:

- For `10` (Lot): prefer the next valid `21` (Serial) **that doesn’t overlap** a date; otherwise, stop at the next valid date; otherwise, consider a duplicate `01` as the next block.
- For `21` (Serial): if a date is close, stop there; else prefer the **right-most** valid `10` (Lot) before a date; else duplicate `01`.

**Handle duplicates**: if the segment after the first `01` is literally `A + A`, trim to `A`.

**Be conservative**: never cut numeric lots just because a random `01` appears — use it only when no fixed boundary (dates) is available.

## Edge cases the parser handles

- No FNC1s (or they’re removed by the scanner).
- Serial before lot and vice versa.
- Lots with `/`, `-`, `.` characters.
- Duplicate blocks (same payload twice).
- Stray digits that look like AIs but are not (e.g., `11` without a valid YYMMDD).
- Overlap pitfalls where `…2117…` tricks a naive parser.

## Drop-in “plugin” for Android/Kotlin

Put this file anywhere you reuse parsing (e.g., `com.company.scanner.gs1` module). It’s self-contained and has clear requirements at the top.  
just copy paste this code and use it

```kotlin
package com.company.scanner.util

import android.util.Log
import java.text.Normalizer

/**
 * -------------------------------------------------------------------------
 *  GS1 BARCODE PARSER – SIMPLE
 * -------------------------------------------------------------------------
 *
 *  REQUIREMENTS:
 *  - Parse GS1-128 / GS1 DataMatrix strings.
 *  - Extract common AIs:
 *        (01) GTIN
 *        (10) LOT / Batch
 *        (17) Expiry (YYMMDD)
 *        (21) Serial
 *  - Should NOT crash on malformed data.
 *  - Should ignore unknown AIs.
 *  - Suitable for Kotlin Multiplatform or Android.
 *
 *  NOTES:
 *  - This parser assumes parentheses-based AIs: (01)1234...(10)ABC...
 *  - Keeps logic readable & maintainable for medium-sized PRs.
 *  - Extend the AI_MAP if new attributes are required.
 */
object Gs1 {
    // -------------------- CONFIG --------------------
    private const val TAG = "INV_DEBUG"
    private const val GS1_PARSER_VERSION = "v31-fix-gs1-21-overlap"
    // -------------------- DATA MODEL --------------------
    data class Result(
        val raw: String,
        val gtin: String?,
        val lot: String?,
        val expiryYmd: String?,
        val serial: String?,
        val productionYmd: String?
    )
    // -------------------- OPTIONAL DEBUG WRAPPER --------------------
    fun parseWithDebug(raw0: String): Result? {
        Log.d(TAG, "---------------- GS1 DEBUG ----------------")
        Log.d(TAG, "PARSER VERSION = $GS1_PARSER_VERSION")
        Log.d(TAG, "RAW EXACT = [$raw0]")
        Log.d(TAG, "RAW CHARS = " + raw0.toCharArray().joinToString(" ") { it.toString() })
        Log.d(TAG, "RAW HEX   = " + raw0.encodeToByteArray().joinToString(" ") { "%02X".format(it) })
        val result = parse(raw0)
        Log.d(TAG, "PARSED GS1 → $result")
        Log.d(TAG, "-------------------------------------------")
        return result
    }
    // -------------------- CORE PARSER --------------------
    private const val validateCheckDigit = false
    private val TRUE_01 = Regex("(?<!\\d)01\\d{14}")        // true GTIN start
    // heuristics
    private const val MIN_SERIAL_LEN = 6
    private const val MAX_VAR_LEN = 20
    private const val MIN_LOT_LEN = 1
    private const val GS = '\u001D'
    fun parse(raw0: String): Result? {
        fun sanitizeForGs1(input: String): String {
            val nfkc = Normalizer.normalize(input, Normalizer.Form.NFKC)
            val noInvis = nfkc.replace(Regex("[\\p{Cf}\\p{Z}\\p{Mn}\\p{Me}]"), "")
            val noGs = noInvis.replace(GS.toString(), "")
            val unwrapped = noGs.removePrefix("]Q3").removePrefix("]Q1")
                .replace("(", "").replace(")", "")
            // keep A–Z, a–z, 0–9, '-', '/', '.'
            return unwrapped.replace(Regex("[^A-Za-z0-9\\-\\./]"), "")
        }
        var s = sanitizeForGs1(raw0)
        val first01Match = TRUE_01.find(s) ?: return null
        val first01 = first01Match.range.first
        // Trim A+A duplicate block if present (after first 01)
        run {
            val seg = s.substring(first01)
            if (seg.length % 2 == 0) {
                val half = seg.length / 2
                val a = seg.substring(0, half)
                val b = seg.substring(half)
                if (b.startsWith(a)) s = s.substring(0, first01) + a
            }
        }
        var i = first01
        var gtin: String? = null
        var lot: String? = null
        var prodIso: String? = null
        var expIso: String? = null
        var serial: String? = null
        var seenGtin = false
        fun digitsAt(p: Int, n: Int): Boolean {
            if (p + n > s.length) return false
            for (k in 0 until n) if (!s[p + k].isDigit()) return false
            return true
        }
        fun fixedDigits(p0: Int, n: Int): Pair<String, Int> {
            var p = p0
            val sb = StringBuilder()
            while (p < s.length && sb.length < n && s[p].isDigit()) {
                sb.append(s[p]); p++
            }
            return sb.toString() to p
        }
        fun isValidYyMmDd(s6: String): Boolean {
            if (s6.length != 6 || !s6.all { it.isDigit() }) return false
            val mm = s6.substring(2, 4).toInt()
            val dd = s6.substring(4, 6).toInt()
            return mm in 1..12 && dd in 1..31
        }
        fun yymmddToIso(s6: String): String? {
            if (!isValidYyMmDd(s6)) return null
            val yy = s6.substring(0, 2)
            val mm = s6.substring(2, 4)
            val dd = s6.substring(4, 6)
            return "20$yy-$mm-$dd"
        }
        // Next fixed boundary for variable fields: next valid 11/17 (ignore 01)
        fun nextFixedBoundaryNo01(p0: Int): Int {
            var best = s.length
            var idx = p0
            while (true) {
                idx = s.indexOf("11", idx)
                if (idx == -1) break
                if (digitsAt(idx + 2, 6) && isValidYyMmDd(s.substring(idx + 2, idx + 8))) {
                    best = minOf(best, idx); break
                }
                idx++
            }
            idx = p0
            while (true) {
                idx = s.indexOf("17", idx)
                if (idx == -1) break
                if (digitsAt(idx + 2, 6) && isValidYyMmDd(s.substring(idx + 2, idx + 8))) {
                    best = minOf(best, idx); break
                }
                idx++
            }
            return best
        }
        // Next duplicate "01" (with 14 digits after) before searchEnd
        fun nextDup01After(p0: Int, searchEnd: Int): Int {
            var idx = s.indexOf("01", p0)
            while (idx != -1 && idx < searchEnd) {
                if (digitsAt(idx + 2, 14)) return idx
                idx = s.indexOf("01", idx + 1)
            }
            return -1
        }
        // -------- boundaries for variable AIs --------
        // LOT (AI=10): prefer a plausible SERIAL (21) if it does NOT overlap a date AI; else fixed date; else dup 01.
        fun boundaryForLot(p0: Int, haveSerial: Boolean): Int {
            val fixedCandidate = nextFixedBoundaryNo01(p0)
            var candidate = fixedCandidate
            var chosen = false
            if (!haveSerial) {
                var idx = p0
                while (true) {
                    idx = s.indexOf("21", idx)
                    if (idx == -1) break
                    val gap = idx - p0
                    if (gap > MAX_VAR_LEN) break
                    // prevent overlap - require the '21' to fully precede the fixed boundary, not share its '1'
                    if (fixedCandidate != s.length && (idx + 2) > fixedCandidate) { idx++; continue }
                    if (gap < MIN_LOT_LEN) { idx++; continue }
                    val endFor21 = nextFixedBoundaryNo01(idx + 2)
                    val serialCand = s.substring(idx + 2, minOf(idx + 2 + MAX_VAR_LEN, endFor21))
                    val ok = serialCand.isNotEmpty() &&
                            serialCand.length >= MIN_SERIAL_LEN &&
                            serialCand.all { it.isLetterOrDigit() }
                    if (ok) {
                        candidate = minOf(candidate, idx)
                        chosen = true
                        break
                    }
                    idx++
                }
            }
            // If no valid date boundary exists at all, allow dup 01 as last resort
            if (!chosen && candidate == s.length && seenGtin) {
                val dup01 = nextDup01After(p0, candidate)
                if (dup01 != -1 && (dup01 - p0) >= MIN_LOT_LEN) candidate = dup01
            }
            return candidate
        }
        // SERIAL (AI=21): use near fixed date if present; else right-most valid LOT (10); else dup "01".
        fun boundaryForSerial(p0: Int, haveLot: Boolean): Int {
            val fixed = nextFixedBoundaryNo01(p0)
            val useFixed = fixed != s.length && (fixed - p0) <= MAX_VAR_LEN
            if (useFixed) return fixed
            val searchEnd = if (fixed != s.length) fixed else s.length
            var best10 = -1
            if (!haveLot) {
                var idx = p0
                while (true) {
                    idx = s.indexOf("10", idx)
                    if (idx == -1 || idx >= searchEnd) break
                    if (idx - p0 >= MIN_SERIAL_LEN) {
                        val endFor10 = nextFixedBoundaryNo01(idx + 2)
                        val lotCand = s.substring(idx + 2, minOf(idx + 2 + MAX_VAR_LEN, endFor10))
                        val ok = lotCand.isNotEmpty() &&
                                lotCand.length in MIN_LOT_LEN..MAX_VAR_LEN &&
                                lotCand.all { it.isLetterOrDigit() || it == '-' || it == '/' || it == '.' }
                        if (ok) best10 = idx // keep right-most valid 10
                    }
                    idx++
                }
            }
            val dup01 = nextDup01After(p0, searchEnd)
            if (best10 != -1) {
                if (dup01 != -1 && dup01 < best10) {
                    return if (dup01 + 1 == best10) best10 else dup01
                }
                return best10
            }
            if (dup01 != -1) return dup01
            return fixed
        }
        // ---- main scan loop ----
        while (i + 2 <= s.length) {
            if (s[i] == GS) { i++; continue }
            val ai = s.substring(i, i + 2)
            val p = i + 2
            when (ai) {
                "01" -> {
                    if (seenGtin) break
                    val (v, np) = fixedDigits(p, 14)
                    if (v.length == 14) {
                        gtin = if (validateCheckDigit) v.takeIf { isValidGtin14(it) } else v
                        seenGtin = true
                        i = np
                    } else {
                        i++
                    }
                }
                "11" -> {
                    val (v, np) = fixedDigits(p, 6)
                    if (v.length == 6 && isValidYyMmDd(v)) {
                        prodIso = yymmddToIso(v); i = np
                    } else i += 2
                }
                "17" -> {
                    val (v, np) = fixedDigits(p, 6)
                    if (v.length == 6 && isValidYyMmDd(v)) {
                        expIso = yymmddToIso(v); i = np
                    } else i += 2
                }
                "10" -> {
                    val end = boundaryForLot(p, haveSerial = (serial != null))
                    val v = s.substring(p, end).trim().trimEnd(GS)
                    if (v.isNotEmpty() && lot == null) lot = v
                    i = end
                }
                "21" -> {
                    val end = boundaryForSerial(p, haveLot = (lot != null))
                    val v = s.substring(p, end).trim().trimEnd(GS)
                    if (v.isNotEmpty() && serial == null) serial = v
                    i = end
                }
                else -> {
                    if (ai.all { it.isDigit() }) i += 2 else i++
                }
            }
        }
        if (gtin == null && lot == null && expIso == null && serial == null && prodIso == null) return null
        return Result(raw0, gtin, lot, expIso, serial, prodIso)
    }
    // -------------------- HELPERS --------------------
    private fun isValidGtin14(s: String): Boolean {
        if (!s.matches(Regex("\\d{14}"))) return false
        val d = s.map { it - '0' }
        var sum = 0
        for (i in 12 downTo 0) {
            val weight = if ((12 - i) % 2 == 0) 3 else 1
            sum += d[i] * weight
        }
        val check = (10 - (sum % 10)) % 10
        return d[13] == check
    }
}
```

```kotlin
// Production code (silent)
val parsed = Gs1.parse(rawScan)
if (parsed != null) {
    // Use fields: parsed.gtin, parsed.lot, parsed.expiryYmd, parsed.productionYmd, parsed.serial
}

// During development
val debug = Gs1.parseWithDebug(rawScan)
```

## What made this work in practice

**Date-aware boundaries**: Treating `11`/`17` As real boundaries, only with valid YYMMDD suppressed tons of false splits.

**Right-most lot for serial**: When dates were distant, choosing the **right-most** `10` (still valid) gave stable splits between `21` and `10`.

**Dup-block trimming**: Many scanners emit `A + A`. Trimming early avoids cascading misparses.

**Allowing `/`, `-`, `.` in lots**: Small change, big impact.

## Future improvements

- Make `MIN_SERIAL_LEN`, `MAX_VAR_LEN`, and allowed lot characters configurable per site or label family.
- Add support for more AIs (e.g., `240`, `241`, etc.) if your products require them.
- Optional check digit validation for GTIN (`validateCheckDigit = true` Once your dataset is stable.

## Wrap-up

If you’re dealing with scanners that don’t insert FNC1 and labels that aren’t pristine, a heuristic parser beats strict validators. This one has held up across a growing set of hospital-grade samples, and it’s easy to drop into any Android project.

**With love,**  
**Jaswanth**  
**Software Engineer at Sedin Technologies**  
**Happy coding!**

---

### Text transcribed from the original cover illustration

The cover repeats the article title and shows this illustrative medical label:

```text
(01) 12345678901234
(10) LOT2025
(17) 250630
(21) ABC123
```
