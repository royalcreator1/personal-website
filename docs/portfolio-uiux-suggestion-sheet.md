# Portfolio design and QA notes

## Visual direction

A personal engineering studio: graphite black, cool silver, blue-gray paper, clear glass navigation, and precise typography. The car-and-aircraft image connects the mechanical engineering background to a broader interest in how things work. The software portfolio remains the main story.

## Implemented

| Area | Design decision |
| --- | --- |
| Navigation | A fixed translucent glass surface, centered desktop links, a direct contact action, current-section feedback, and a full-screen mobile dialog. |
| Opening | An expressive two-line introduction, concise positioning, and the original image on a contained stage. Both the car and aircraft remain visible. |
| About | A personal explanation of the move from mechanical engineering to software, followed by four concrete capabilities. |
| Selected work | Mediscan opens as a larger feature. The other six projects form balanced pairs on desktop, with a consistent single-column layout on phones. |
| Project visuals | Seven purpose-built interface concepts replace unrelated chrome decorations. Each is clearly labeled as an illustration, not a production screenshot. |
| Case studies | The same interface concepts, readable metadata, semantic section headings, and previous/next project navigation. Existing routes are retained. |
| Experience | A compact chronological record with native accessible disclosures and the current role expanded. |
| Skills | Dark technical cards with consistent padding, icons, legible tags, and a shared grid. |
| Education | One institution link to the requested Amrita IQAC page. |
| Contact | A clear invitation, direct contact channels, and a project-focused form with pending/error feedback and focus management. |
| Motion | Subtle entrances, preview hover movement, and a scroll-progress line where supported. Reduced motion is respected; all project content is visible without JavaScript. |
| Maintainability | Replaced accumulated CSS overrides with one stylesheet and one set of spacing/type tokens. No new UI dependency was needed. |
| Hero delivery | Uses Next Image with responsive source selection, priority loading, and modern image format optimization. |

## Verification

Headless Chromium layout checks covered widths of 320, 390, 560, 768, 800, 1024, 1440, 1920, and 2560 CSS pixels. At those widths the document did not overflow horizontally, seven projects were present, and the measured headings, cards, form, and navigation fit the viewport. Full-page screenshots at 390, 768, and 1440 pixels were inspected.

Mobile interaction checks verified that the dialog fills the viewport, locks background scrolling, restores focus when closed, and that an empty contact submission displays three field errors and focuses the name field. No real message was sent.

All seven case-study routes returned HTTP 200. The removed Sattva route returned 404. A mobile Sales Tool detail page fit the viewport. Reduced-motion checks showed visible content with smooth scrolling disabled. With JavaScript disabled, all seven projects remained visible. No browser runtime exceptions were reported.

These checks use Chromium. Safari, Firefox, physical-device testing, and successful live message delivery were not verified in this pass.

## Highest-value future additions

1. Replace interface concepts with approved product screenshots or recordings as permission becomes available. Keep confidential information out of public examples.
2. Add verified outcomes to case studies: what changed for a user, the engineering decision behind it, and any documented result. Keep numerical claims grounded in evidence.
3. Add a current professional portrait if desired; the existing image has not been repurposed without review.
4. Review contact delivery in the deployed environment with the existing Telegram configuration and a deliberately authorized test message.
