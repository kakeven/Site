---
name: Onyx Design System
colors:
  surface: '#0e0e0f'
  surface-dim: '#0e0e0f'
  surface-bright: '#2b2c2f'
  surface-container-lowest: '#000000'
  surface-container-low: '#131314'
  surface-container: '#191a1b'
  surface-container-high: '#1f2021'
  surface-container-highest: '#252628'
  on-surface: '#e6e5e7'
  on-surface-variant: '#ababad'
  inverse-surface: '#fcf8f9'
  inverse-on-surface: '#555555'
  outline: '#757577'
  outline-variant: '#47484a'
  surface-tint: '#a7c8ff'
  primary: '#a7c8ff'
  on-primary: '#0f4077'
  primary-container: '#1a477f'
  on-primary-container: '#b8d1ff'
  inverse-primary: '#376099'
  secondary: '#949dbb'
  on-secondary: '#161f37'
  secondary-container: '#323b54'
  on-secondary-container: '#b6bedd'
  tertiary: '#ececff'
  on-tertiary: '#535771'
  tertiary-container: '#dbdefe'
  on-tertiary-container: '#4a4e69'
  error: '#ee7d77'
  on-error: '#490106'
  error-container: '#7f2927'
  on-error-container: '#ff9993'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#bfd5ff'
  on-primary-fixed: '#0e3f77'
  on-primary-fixed-variant: '#335c95'
  secondary-fixed: '#dae2ff'
  secondary-fixed-dim: '#cbd4f3'
  on-secondary-fixed: '#363f58'
  on-secondary-fixed-variant: '#525b76'
  tertiary-fixed: '#dbdefe'
  tertiary-fixed-dim: '#ccd0ef'
  on-tertiary-fixed: '#383c55'
  on-tertiary-fixed-variant: '#545873'
  primary-dim: '#94baf9'
  secondary-dim: '#949dbb'
  tertiary-dim: '#ccd0ef'
  error-dim: '#bb5551'
  background: '#0e0e0f'
  on-background: '#e6e5e7'
  surface-variant: '#252628'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
---

# Onyx Design System

## Brand & Style
The Onyx Design System is built for professional, high-focus environments. It moves away from the previous high-energy orange palette toward a sophisticated, "Corporate Modern" dark aesthetic. The brand personality is calm, reliable, and precise, utilizing a deep navy and charcoal foundation to reduce visual fatigue during extended use.

The visual style leans into **Minimalism** with a touch of **Tonal Layering**, prioritizing content clarity through deep blues and a neutral dark canvas. It evokes a sense of security and technical competence, making it ideal for enterprise dashboards and analytical tools.

## Colors
The system has transitioned to a native dark mode. The palette is dominated by deep, cool tones that provide excellent contrast without the harshness of pure black.

*   **Primary (#244f87):** A professional, muted blue used for primary actions, active states, and brand presence.
*   **Secondary (#1f2840):** A dark navy used for structural elements like sidebars or secondary containers.
*   **Neutral:** Based on the seed color #1b1c1e, the neutrals provide the background surfaces and container levels, ensuring a cohesive dark environment.
*   **Surface Strategy:** Use slightly lighter shades of the neutral seed to indicate elevation and hierarchy.

## Typography
The typography has been updated to **Inter** across all levels. Inter is chosen for its exceptional legibility on digital screens, particularly in dark mode where "haloing" can be an issue with lesser fonts.

*   **Headlines:** Use Inter with semi-bold weights (600) and tight line-heights.
*   **Body:** Use Inter at 14px or 16px for optimal readability.
*   **Labels:** Use Inter medium (500) at 12px with a 0.02em letter spacing for UI controls.

## Layout & Spacing
The layout follows a 12-column fluid grid system designed for responsiveness. The spacing rhythm is based on a factor of 8px (Spacing 2), creating a consistent and predictable flow between elements.

Padding and margins should default to the 16px unit for standard components, scaling up to 24px or 32px for section separation. This ensures the UI feels breathable despite the dense, dark color palette.

## Elevation & Depth
In this dark mode system, depth is conveyed through **Tonal Layers** rather than heavy shadows. Surfaces "closer" to the user are rendered in lighter shades of the neutral palette.

*   **Level 0 (Background):** The base dark surface (#1b1c1e).
*   **Level 1 (Cards/Content):** A subtle lift using slightly lighter charcoal tones.
*   **Level 2 (Modals/Popovers):** The highest contrast neutral shade.
*   **Outlines:** Use low-contrast, 1px borders to define boundaries between containers of the same tonal level.

## Shapes
The design has moved away from sharp edges to a **Rounded** shape language. This softens the technical feel of the dark theme and makes the UI feel more modern and approachable.

*   **Standard Radius:** 8px (0.5rem) for buttons, inputs, and small cards.
*   **Large Radius:** 16px (1rem) for main containers and larger UI sections.
*   **Pill:** Used exclusively for tags and chips to provide maximum visual distinction.

## Components
Consistent component styling is critical for the Onyx system:

*   **Buttons:** Primary buttons use the #244f87 blue with white text. Secondary buttons should use a subtle outline or a dark navy ghost style.
*   **Inputs:** Input fields use a dark background with a 1px border. On focus, the border transitions to the primary blue.
*   **Cards:** Cards use the Level 1 tonal surface with a subtle 8px corner radius.
*   **Chips/Tags:** Small, pill-shaped elements with a secondary navy background (#1f2840) to highlight metadata without distracting from the primary content.
*   **Progress Indicators:** Use the primary blue for filled states and a muted neutral for background tracks.