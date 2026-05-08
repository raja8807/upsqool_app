# Design System Strategy: The Mindful Archivist

## 1. Overview & Creative North Star
This design system is built upon the "Mindful Archivist" North Star. For a parent, tracking child development isn't just about data points; it’s about capturing a legacy. We are moving away from the "utility-only" look of standard health trackers and the "childish" aesthetic of typical parenting apps. 

Instead, we employ an **Editorial Functionalism**—a high-end, sophisticated layout style that uses generous whitespace, intentional asymmetry, and a refined typographic scale. We treat data like a premium magazine feature: authoritative yet deeply human. By breaking the rigid, boxed-in grid and allowing elements to breathe and overlap, we create a sense of calm (Headspace) backed by undeniable precision (Google Fit).

---

## 2. Colors: The Tonal Language
We utilize a sophisticated palette that balances clinical Teal with a warm, empathetic Orange.

- **Primary & Containers:** The core identity is driven by `primary` (#006B58) and its vibrant counterpart `primary_container` (#1ABC9C). These represent growth and stability.
- **Secondary (The Emotional Spark):** Our `secondary_container` (#FC8A40) is used sparingly for high-emotion milestones or "Celebrate" moments. It is an accent, not a foundation.
- **The "No-Line" Rule:** To achieve a premium, seamless feel, **1px solid borders are strictly prohibited** for sectioning. Boundaries must be defined solely through background color shifts. For example, a card (using `surface_container_lowest`) should sit atop a section (using `surface_container_low`) to create a distinction through tone, not lines.
- **Surface Hierarchy & Nesting:** Think of the UI as physical layers.
    - **Base:** `surface` (#F8F9FA)
    - **Sectioning:** `surface_container_low`
    - **Primary Content Cards:** `surface_container_highest` or `surface_container_lowest` for maximum contrast.
- **The "Glass & Gradient" Rule:** Use `primary` to `primary_container` gradients for main CTAs to add "soul." For floating navigation or top bars, use `surface_container_lowest` at 80% opacity with a `backdrop-blur` of 20px to create a modern, "frosted glass" depth.

---

## 3. Typography: The Editorial Voice
Our typography creates a dialogue between architectural structure and human readability.

- **The Display Scale (Plus Jakarta Sans):** Used for headlines and milestones. This typeface provides a modern, geometric clarity that feels expensive and intentional.
    - `display-lg` (3.5rem): Reserved for singular data points (e.g., "Month 6").
    - `headline-md` (1.75rem): Used for section headers to give an editorial "magazine" feel.
- **The Body Scale (Inter):** Used for all functional data and parent-facing guidance. Inter’s neutral x-height ensures readability even in dense tracking logs.
    - `body-lg` (1rem): Standard reading text.
    - `label-sm` (0.6875rem): Used for metadata and timestamps, always in `on_surface_variant` to reduce visual noise.

---

## 4. Elevation & Depth: Tonal Layering
We avoid the "template" look by shunning heavy drop shadows. Depth is an ambient property of light and material.

- **The Layering Principle:** Stack `surface-container` tiers to create hierarchy. A `surface_container_highest` element on a `surface` background provides all the "lift" required for a premium interface.
- **Ambient Shadows:** When a floating effect is necessary (e.g., a FAB or a modal), use a shadow tinted with `on_surface` color, never pure black. 
    - *Specs:* Blur: 32px, Y-Offset: 8px, Opacity: 6%.
- **The "Ghost Border" Fallback:** If a container requires further definition (e.g., in high-glare environments), use the `outline_variant` token at **15% opacity**. This creates a "ghost" edge that defines space without cluttering the eye.
- **Glassmorphism:** Use semi-transparent layers for elements that "float" over content, allowing the Teal and Orange brand colors to bleed through softly, grounding the component in the overall composition.

---

## 5. Components: Precision & Softness
All components share a signature 20px (`DEFAULT`) or 24px (`md`) corner radius to evoke a "friendly but firm" presence.

- **Buttons:** 
    - **Primary:** A subtle gradient from `primary` to `primary_container`. High-gloss, zero border. 
    - **Secondary:** `surface_container_highest` with `on_surface` text. No shadow.
- **Input Fields:** Use `surface_container_low` as the field background. No bottom line or border. Use `primary` for the cursor and `label-md` for floating labels.
- **Cards & Lists:** **Strictly forbid divider lines.** Separate list items using 16px of vertical whitespace or alternating subtle shifts between `surface_container_low` and `surface_container_lowest`.
- **Progress Rings (Signature Component):** Inspired by Google Fit but styled for "Mindful Tracking." Use `primary` for the track and a soft `primary_fixed_dim` for the "empty" state. The center of the ring should display a `display-sm` value.
- **Milestone Nodes:** A custom component for tracking growth. A `secondary_container` (Orange) dot connected by a soft `outline_variant` vertical dashed line. This acts as the visual "thread" of the child's development.

---

## 6. Do's and Don'ts

### Do:
- **Do** use intentional asymmetry. Place a `headline-lg` on the left and leave the right 30% of the screen as white space to create "breathing room."
- **Do** use `primary_fixed` for background accents to create a soft, warm wash of color behind data visualizations.
- **Do** prioritize "Tonal Contrast" over "Line Contrast." If you need to separate two areas, change the background color slightly rather than adding a line.

### Don't:
- **Don't** use 100% black. Always use `on_surface` (#191C1D) for text to keep the vibe "Headspace-soft."
- **Don't** use sharp corners. Everything must adhere to the 20px (`DEFAULT`) radius to maintain the "parent-friendly" promise.
- **Don't** clutter the screen with icons. Let the high-end typography scale (`Plus Jakarta Sans`) do the heavy lifting for hierarchy.
- **Don't** use traditional "Drop Shadows" on cards. Use tonal nesting instead.