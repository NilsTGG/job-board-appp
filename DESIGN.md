---
name: Because You Won't™
description: Dark-first Minecraft logistics and marketplace UI with playful operational trust.
colors:
  primary: "#3b82f6"
  accent: "#8b5cf6"
  success: "#10b981"
  warning: "#eab308"
  neutral-bg: "#050505"
  neutral-surface: "#121212"
  neutral-panel: "#0a0a0a"
  neutral-border: "#2a2a2a"
  neutral-text: "#ffffff"
  neutral-muted: "#9ca3af"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "#2563eb"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "12px 32px"
  button-secondary:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  card-surface:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input-dark:
    backgroundColor: "#374151"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  badge-status:
    backgroundColor: "#1d4ed833"
    textColor: "{colors.primary}"
    rounded: "{rounded.xl}"
    padding: "6px 12px"
---

# Design System: Because You Won't™

## Overview

**Creative North Star: "Midnight Logistics"**

This system feels like a trusted late-night operations desk for Minecraft players. The interface is dark, focused, and friction-conscious, with blue and violet accents used to signal action, confidence, and controlled momentum. It should feel like a capable service layer rather than a decorative fantasy wrapper.

The personality is confident and tactile. Surfaces feel solid, actions feel deliberate, and playful copy arrives as seasoning rather than spectacle. Brand character lives in the voice, glow, and naming, while the product experience stays legible at moments of commitment such as estimates, forms, cart actions, checkout, and confirmation.

This system explicitly rejects the anti-references in PRODUCT.md: sterile, interchangeable SaaS UI with no subcultural identity; chaotic gamer-shop aesthetics with neon overload, low-trust meme energy, clutter, or juvenile visual noise; and any experience that makes core actions feel gimmicky, confusing, or unserious.

**Key Characteristics:**
- Dark-first interface with layered charcoal surfaces
- Blue and violet accents used for action, not decoration everywhere
- Rounded, tactile controls with strong hover and focus feedback
- Clear operational states for paused, active, success, warning, and disabled flows
- Personality delivered through copy and glow, not through clutter

## Colors

The palette is a controlled night palette: graphite and charcoal do most of the structural work, while blue and violet create the branded edge.

### Primary
- **Courier Blue** (`#3b82f6`): the main action color for primary CTAs, selected states, focus treatments, links, progress signals, and key icons.

### Secondary
- **Nether Violet** (`#8b5cf6`): the support accent for gradients, alternate CTAs, marketplace emphasis, and energy moments that need personality without replacing the primary blue.

### Tertiary
- **Verified Emerald** (`#10b981`): a success/status color used for trust states, completion, positive confirmations, and verified messaging.
- **Pause Amber** (`#eab308`): a warning and paused-operations color used for banners and operational constraints.

### Neutral
- **Void Canvas** (`#050505`): the global page background.
- **Night Panel** (`#0a0a0a`): heavier nav and shell background.
- **Service Surface** (`#121212`): the default card, drawer, and panel surface.
- **Steel Border** (`#2a2a2a`): the main divider and card-edge color.
- **Signal White** (`#ffffff`): primary text and high-importance labels.
- **Muted Quartz** (`#9ca3af`): secondary text, helper content, and low-emphasis metadata.

**The Accent Scarcity Rule.** Blue and violet should feel earned. Most screens should remain predominantly dark and neutral, with accents concentrated around actions, active states, and status cues.

## Typography

**Display Font:** Inter (with system-ui, sans-serif fallback)
**Body Font:** Inter (with system-ui, sans-serif fallback)
**Label/Mono Font:** Inter for labels; no distinct mono system is currently formalized

**Character:** Typography is compact, direct, and operational. It relies on weight, tight tracking, and size jumps rather than ornamental contrast.

### Hierarchy
- **Display** (700, `clamp(3rem, 8vw, 6rem)`, 0.95): used for hero headlines and large identity moments such as the landing-page masthead.
- **Headline** (700, `clamp(1.75rem, 3vw, 2.5rem)`, 1.1): used for section headers, large panels, and major flow headings.
- **Title** (700, `1.25rem`, 1.3): used for cards, modals, and component-level section titles.
- **Body** (400, `1rem`, 1.6): used for explanatory text, FAQs, and form support copy. Maintain readable line length in the 65–75ch range when prose becomes dense.
- **Label** (600, `0.75rem`, 1.2, `0.08em`): used for tabs, badges, pill labels, and compact metadata, often uppercase or tracking-wide.

**The Weight-First Rule.** Hierarchy is created primarily through weight, spacing, and scale jumps. Do not depend on decorative font changes to imply importance.

## Elevation

This system uses tonal layering plus glow. Depth comes more from stacked dark surfaces, subtle border separation, blur, and accent light than from heavy structural shadows. Shadows exist, but they are usually ambient support for active or elevated moments rather than the foundation of the visual hierarchy.

### Shadow Vocabulary
- **Ambient Lift** (`0 10px 25px rgba(0, 0, 0, 0.2)`): used on hover-lift states and some elevated cards.
- **Action Glow** (`0 0 40px -10px rgba(59, 130, 246, 0.5)`): used on hero and primary action moments.
- **Panel Depth** (`0 25px 50px rgba(5, 5, 5, 0.5)`): used for major form containers and some modal-scale panels.

**The Glow-Not-Glass Rule.** Use blur and glow as atmospheric support only. Do not drift into decorative glassmorphism as a default container treatment.

## Components

Components should feel sturdy, responsive, and easy to trust.

### Buttons
- **Shape:** soft-rectangular with medium-to-large rounding (`12px` to `16px`)
- **Primary:** blue background, white text, bold weight, generous horizontal padding, often with supporting shadow or glow
- **Hover / Focus:** hover darkens the fill, often adds scale or glow; focus uses visible rings and offset treatment
- **Secondary / Ghost / Tertiary:** dark-surface buttons with border-defined edges, hover borders toward primary, and occasional violet or gradient variants for personality moments

### Chips
- **Style:** rounded pill badges with tinted backgrounds, compact uppercase or semibold labels, and explicit selected-state contrast
- **State:** selected chips use accent-filled or strongly tinted states; unselected chips rely on dark surfaces plus border contrast

### Cards / Containers
- **Corner Style:** mostly `12px` to `16px`, with some `24px` marketing blocks
- **Background:** dark surfaces, typically `#121212` or adjacent charcoal tones
- **Shadow Strategy:** flat at rest or lightly layered, with stronger glow/lift on interaction or emphasis
- **Border:** almost always present, usually the steel-border neutral token
- **Internal Padding:** typically `24px`, sometimes `32px` on highlight blocks

### Inputs / Fields
- **Style:** two active families currently exist. One is brand-surface-driven with brand-border edges; the other is a legacy gray-field pattern using `bg-gray-700` and `border-gray-600`.
- **Focus:** blue ring or border emphasis is the common thread across both families
- **Error / Disabled:** error states use red-tinted backgrounds and border overlays; disabled states flatten emphasis and reduce opacity

### Navigation
- **Style:** fixed or sticky bars on dark surfaces, with pill-like active controls, strong contrast, and compact label sizing
- **Default / Hover / Active:** inactive items are muted gray; active items gain fill, glow, or gradient treatment; hover increases contrast and often adds subtle scale or border change
- **Mobile Treatment:** stacked layouts, dropdown-like fallbacks, and sticky sub-nav patterns preserve task access on small screens

### Signature Component
- **Operational Banner:** paused-state and trust/status banners are a recurring signature. They use high-contrast tint backgrounds, centered compact copy, and a strong operational tone that immediately communicates whether the user can act.

## Do's and Don'ts

### Do:
- **Do** keep the page shell predominantly on `#050505`, `#0a0a0a`, and `#121212`, with `#2a2a2a` carrying most border structure.
- **Do** use `#3b82f6` as the main action signal for CTAs, active states, focus treatments, and progress language.
- **Do** preserve rounded tactile controls in the `12px` to `16px` range for buttons, cards, drawers, and modals.
- **Do** keep operational states explicit: paused banners in amber, success states in emerald, and disabled states visibly flattened.
- **Do** let humor live in copy while keeping forms, checkout, estimates, and confirmations calm and trustworthy.

### Don't:
- **Don't** build sterile, interchangeable SaaS UI that feels like a generic startup template with no subcultural identity.
- **Don't** drift into chaotic gamer-shop aesthetics with neon overload, low-trust meme energy, clutter, or juvenile visual noise.
- **Don't** make core actions feel gimmicky, confusing, or unserious when users are trying to submit orders, share coordinates, or evaluate trust.
- **Don't** default to glassmorphism as the primary container style.
- **Don't** rely on gradient text, side-stripe accent borders, or endless identical icon-heading-text cards as a substitute for actual hierarchy.
