# Hero tab artwork

Generated with the built-in `image_gen` tool. Still images were selected for a quiet transition and predictable mobile loading. No video or external asset host is needed.

## Preserved Delivery artwork

The original `public/engineering-royal.png` is the Delivery image and was used only as the visual reference for the new companion images. It was not edited, replaced, regenerated, or re-encoded.

SHA-256: `7ae7ef4227673c2e7142e844ba9f718ff7a0372ffc0bcf587d4f2a5248fc7f80`.

## Interfaces

Final asset: `public/hero-interfaces.png` (1672 × 941 PNG).

Reference: `public/engineering-royal.png`, subject/composition/palette/atmosphere reference only.

Final prompt:

```text
Use case: stylized-concept.
Asset type: new landscape hero artwork for the Interfaces tab of a professional software engineer portfolio.
Primary request: show the planning and interface-design stage behind the engineering marvels in the reference image. Generate a NEW companion image; the supplied reference image is a subject, composition, palette and atmosphere reference ONLY, never an edit target.
Input image 1 role: reference image of a black luxury sports sedan below a full white twin-engine charter jet. Keep those same recognizable sedan and aircraft forms, scale relationship and three-quarter viewing directions.
Scene/backdrop: a sophisticated, near-black architectural design studio merging into a dark charcoal hangar, with a reflective black drafting surface.
Subject: a precise, elegant silver wireframe/CAD design study of the full aircraft across the upper half, and the full sedan design study across the lower half, their carefully resolved exterior contours visible. The sedan is a polished charcoal clay/design model overlaid with fine silver construction curves; the aircraft is a pale silver translucent design maquette with fine geometric planning lines. A few restrained, almost invisible glass drafting planes and technical guide lines suggest thoughtful design iteration. The composition should be about designing these two objects, not a collage, dashboard, or generic laptop.
Style/medium: premium cinematic industrial design visualization with photorealistic materials and exceptionally clean, crisp draftsmanship. Restrained, royal and professional; beautiful engineering, no science-fiction effects.
Composition/framing: landscape 16:9, matching the reference's silhouette arrangement: aircraft above, sedan below, both entirely inside frame. Wider framing with at least 7 percent safe margin around all wings, tail, nose and car wheels. Main subjects fully visible inside a central 86 percent safe area. No cropping, no text space required, no outer borders. Dark low-detail edges to blend into a black website.
Lighting/mood: cool soft studio rim light, dark graphite atmosphere, silver reflections and subtle warm horizon remnants, refined depth without excessive bloom.
Color palette: black, charcoal, cool silver and off-white only, matching the reference, with no saturated blue or neon.
Text: none.
Constraints: no people, no captions, no labels, no watermarks, no logos added, no logos enlarged, no busy HUD, no floating code, no neon, no cartoon look, no excessive fragmented explosion, no rendered website frame. Do not reproduce the finished Delivery photograph; convey the earlier planning/design stage.
```

## Systems

Final asset: `public/hero-systems-v2.png` (1672 × 941 PNG). The Systems tab uses this versioned URL so an optimized-image cache cannot reuse the previous draft.

Reference: `public/engineering-royal.png`, subject, palette, materials, and atmosphere only. The replacement uses a grounded composition instead of the reference's airborne arrangement.

Final prompt:

```text
Use case: photorealistic-natural.
Asset type: replacement landscape artwork for the Systems tab of an engineering portfolio.
Primary request: a physically credible premium automotive and aircraft assembly/maintenance hangar scene. The previous version was rejected because the aircraft appeared to be built while floating above the car. Solve that problem completely.
Input image 1: VISUAL STYLE AND SUBJECT REFERENCE ONLY. Use its black luxury sedan, full white twin-engine jet, black/graphite palette, cool silver reflections and restrained warm architectural lights. Do NOT preserve the reference's airborne aircraft or stacked composition. The reference file itself must remain untouched.
Scene: a real, large, immaculate charcoal aircraft assembly hangar. ONE continuous dark concrete floor extends from the foreground all the way beneath the aircraft in the background. Visible floor perspective lines, grounded shadows and restrained reflections establish the shared floor. This is one coherent photograph, never a composite, diorama, cross-section collage or exploded-view diagram.
Foreground subject: a black BMW-style luxury sedan in the front left, full vehicle inside the frame, at a believable scale. All four wheels remain attached; the visible tires rest directly on the hangar floor. Its hood is raised on clearly attached hinges to reveal a convincing engine bay with neatly integrated metallic components. One attached service panel may expose structural connections, but the car remains an intact vehicle. No detached hovering hood, loose body shells, floating wheels or scattered pieces.
Background subject: a full white twin-engine charter jet farther back and slightly right in its own open hangar work bay, physically behind the sedan and not above its roof. It is parked at NORMAL GROUND HEIGHT on extended nose and main landing gear. The tires and contact shadows of the nose gear and visible main gear must be clearly seen touching THE SAME FLOOR; keep them away from the car silhouette so the supports cannot be hidden. The aircraft body may sit higher than the car because an aircraft is naturally large, but its ground connection must be instantly obvious. Full wings, tail, nose, and both engine nacelles remain contained. One engine cowling is open on attached hinges to reveal engine systems; a small attached fuselage maintenance panel may show wiring/ribs. The remaining white skin is fitted and structurally complete. No levitation, suspended fuselage, crane suspension, tall pedestals, floating assembly, hovering nose, exploded aircraft parts, stacked floor levels or impossible supports.
Composition: wide cinematic 16:9 frame, 1672:941 preferred, low-to-moderate eye-level architectural camera with a realistic three-quarter view and clear depth. Car in foreground left, aircraft behind and right; sufficient empty floor separates them. Full important silhouettes inside safe margins, a clean 6–8 percent dark outer edge for the existing website's image mask. The aircraft's wheels must be readable even when the image is reduced on a webpage. Do not force the original flying-plane-over-car layout.
Style: realistic industrial editorial/product photograph, professional, royal, restrained, exceptional material detail and clean craftsmanship. Show systems being connected and worked on through coherent attached open panels, rather than destruction or fragmented anatomy.
Palette and light: near-black, graphite, silver, white, with subtle warm white hangar strip lighting as in the reference. Low-key controlled lighting but enough silver rim light to read both full subjects and their floor contacts. No neon, saturated blue, fantasy glow, excessive bloom or busy equipment.
Text: none.
Avoid: people, text, captions, added logos, watermarks, UI frames, code, server cubes, robots, clutter, debris, severed structures, toy proportions, open sky behind a hovering jet. Prioritize believable grounded engineering over dramatic floating composition.
```

## Inspection

The selected images were visually inspected. Interfaces depicts the planning/CAD stage. Systems depicts a grounded maintenance and assembly scene: the sedan's tires and the aircraft's visible landing gear contact one continuous hangar floor; the hood and access panels remain attached. The images share the black, graphite, cool silver, and white palette with restrained warm hangar lighting. Both are generated illustrations, not production or documentary photographs. The original Delivery artwork remains untouched.

The replacement Systems asset was checked in the live hero frame at 390 and 1440 CSS pixels. The selected tab loaded the new asset URL, the 1672:941 frame stayed unchanged, and no page overflow or runtime errors were observed. Interfaces, Delivery, and the JC. favicon retained their prior checksums.
