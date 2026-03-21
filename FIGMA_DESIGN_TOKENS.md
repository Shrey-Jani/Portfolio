# Figma Design Tokens & Specifications

## 🎨 Color Palette

### Dark Theme (Default)

```
Background (--bg):         #0c0f14
Surface (--surface):       #11151b
Card (--card):            #151a22
Text (--text):            #e8edf5
Muted (--muted):          #a4afc0
Brand Primary:            #6a0dad (Royal Purple)
Brand Secondary:          #8a2be2 (Blue Violet)
Border:                   #202632
Ring/Focus:               0 0 0 3px rgba(106, 13, 173, 0.25)
Shadow:                   0 8px 24px rgba(0, 0, 0, 0.25)
```

### Light Theme

```
Background:               #f6f8fb
Surface:                  #ffffff
Card:                     #ffffff
Text:                     #0c0f14
Muted:                    #5b6270
Brand Primary:            #6a0dad
Brand Secondary:          #8a2be2
Border:                   #e6eaf2
Ring/Focus:               0 0 0 3px rgba(106, 13, 173, 0.2)
Shadow:                   0 12px 28px rgba(16, 24, 40, 0.08)
```

### Gradients

- **Primary Gradient**: 135deg from `#6a0dad` to `#8a2be2`
- **Hover Gradient**: 135deg from `#7b1fa2` to `#9c27b0`
- **Project Cover Gradient**: 180deg multi-layer with brand colors at 16% opacity

---

## 📝 Typography

### Font Family

- **Primary**: Plus Jakarta Sans
- **Fallback**: system-ui, -apple-system, Segoe UI, Roboto, Arial

### Heading Sizes

| Element | Desktop                  | Mobile (768px)         | Mobile (480px)         |
| ------- | ------------------------ | ---------------------- | ---------------------- |
| h1      | clamp(30px, 4.2vw, 52px) | clamp(24px, 6vw, 40px) | clamp(20px, 8vw, 32px) |
| h2      | clamp(22px, 2.6vw, 28px) | clamp(20px, 5vw, 26px) | clamp(18px, 6vw, 22px) |
| h3      | 18px                     | 16px                   | 15px                   |

### Body Text

```
Default:  16px
Lead:     18px (color: var(--muted))
Small:    14px
```

### Font Weights

- Bold: 700
- Semi-bold: 600
- Regular: 400

---

## 🧩 Components

### Button

```
Padding:         10px 14px
Border Radius:   12px
Border:          1px solid var(--border)
Background:      var(--surface)
Shadow:          var(--shadow)
Transition:      all 0.3s ease
```

**Button States:**

- **Hover**: translateY(-2px)
- **Focus**: box-shadow with --ring
- **Active**: translateY(0px)

**Primary Button**

```
Background:      linear-gradient(135deg, #6a0dad, #8a2be2)
Color:           #ffffff
Border:          none
Font Weight:     700
Hover Shadow:    0 12px 28px rgba(106, 13, 173, 0.3)
```

### Card

```
Background:      var(--card)
Border:          1px solid var(--border)
Border Radius:   16px (desktop), 12px (tablet), 10px (mobile)
Padding:         24px (desktop), 20px (tablet), 16px (mobile)
Shadow:          var(--shadow)
Backdrop Filter: blur(10px)
```

### Tags/Badges

```
Padding:         4px 10px
Border Radius:   999px (pill-shaped)
Font Size:       12px
Letter Spacing:  0.3px
Background:      color-mix(in hsl, var(--brand) 16%, var(--surface))
Border:          1px solid var(--border)
Transition:      all 0.3s ease
```

**Special Tags:**

- `.code-btn`, `.certificate-link`, `.live-btn`: Gradient background + white text

### Profile Card

```
Width:           320px max (desktop), 280px (tablet), 260px (mobile)
Background:      var(--card)
Border:          1px solid var(--border)
Border Radius:   16px
Padding:         32px 24px (desktop), 24px 20px (tablet), 20px 16px (mobile)
Shadow:          var(--shadow)
Top Bar:         4px gradient bar (linear-gradient 135deg from brand colors)
Avatar:
  - Size:        90px (desktop), 75px (tablet), 60px (mobile)
  - Border:      3px solid var(--border)
  - Border Radius: 50% (circular)
  - Status Indicator: 20px circle, position: absolute bottom-8 right-8
```

### Project Card

```
Display:         flex flex-direction column
Gap:             10px
Cursor:          pointer
Transition:      all 0.3s ease
Hover State:     translateY(-2px)

.cover:
  - Aspect Ratio: 16/9 (desktop), 16/10 (tablet), 16/12 (mobile)
  - Border Radius: 12px
  - Border:       1px solid var(--border)
  - Overlay:      Linear gradients at 16% opacity with brand colors
  - Hover State:  Border color changes to brand, shadow increases
```

---

## 🎯 Layout & Spacing

### Container

```
Max Width:       1100px
Padding:         20px (desktop), 16px (tablet), 12px (mobile)
Margin:          0 auto
```

### Grid System

```
Gap:             18px (desktop), 16px (tablet), 12px (mobile)

Two-Column Grid:
- Desktop:       1.15fr 0.85fr
- Tablet/Mobile: 1fr (stacked)

Projects Grid:
- Template:      repeat(auto-fit, minmax(260px, 1fr))
- Mobile:        1fr (single column)
```

### Spacing Scale

```
2px, 4px, 6px, 8px, 10px, 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px, 64px
```

### Common Padding/Margin Values

- Button: 10px 14px / 8px 12px / 6px 10px
- Cards: 24px / 20px / 16px
- Margins: 8px, 12px, 24px, 32px, 48px, 64px

---

## 🎬 Motion & Effects

### Transitions

```
Default:         all 0.3s ease
Reveal:          opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)
Button Hover:    0.3s ease (all properties)
```

### Transforms

```
Button Hover:    translateY(-1px)
Button Active:   translateY(0px)
Project Hover:   translateY(-2px)
Reveal Animation: translateY(12px) → translateY(0)
```

### Blur Effects

```
Header Backdrop: blur(10px), saturate(160%)
Card Backdrop:   blur(10px)
```

### Keyframe Animations

```
@keyframes logoLoop:
  0%:   transform: translateX(0)
  100%: transform: translateX(-50%)
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Name              | Changes                                            |
| ---------- | ----------------- | -------------------------------------------------- |
| 480px      | Small Mobile      | Stack layouts, reduce padding, simplify animations |
| 640px      | Mobile            | Flex direction changes, centered nav               |
| 768px      | Tablet            | Adjust gaps, reduce font sizes                     |
| 900px      | Desktop Threshold | Two-column layouts available                       |
| 1100px+    | Large Desktop     | Full width container                               |

---

## 🎛️ Header

```
Position:        sticky (top: 0)
Z-Index:         50
Height:          72px (desktop), 60px (tablet), auto (mobile)
Background:      color-mix(in hsl, var(--bg) 85%, transparent)
Border Bottom:   1px solid var(--border)
Backdrop Filter: saturate(160%) blur(10px)

Nav Options:
- Desktop:       Horizontal flex
- Tablet:        Flex wrap
- Mobile:        Vertical flex or centered
```

---

## 🖼️ Hero Section

```
Padding:         64px 0 32px (desktop), 32px 0 24px (tablet), 24px 0 16px (mobile)
Layout:          Grid (1.15fr 0.85fr on desktop, 1fr stacked on mobile)
Gap:             18px

.portrait:
  - Aspect Ratio: 1 / 1
  - Border Radius: 14px
  - Border:       1px solid var(--border)
  - Object Fit:   cover
```

---

## 📌 Touch Targets

- Minimum height: 44px (iOS recommended)
- All interactive elements touch-friendly on mobile

---

## 🎨 Figma Setup Instructions

1. **Create Color Styles** for all tokens (use same variable names)
2. **Create Typography Styles** (h1, h2, h3, body, lead)
3. **Create Component Variants** for button states (default, hover, active)
4. **Set up Responsive Frames** for each breakpoint
5. **Use Auto Layout** for components to make them responsive
6. **Document Animations** separately in FigJam (blur effects, transitions)

---

## 🔗 External Animation Components

These require custom implementation (document in Figma):

- BlurText animation for hero name
- PixelTransition effect
- CookieAnimation
- RobotSpeakerAnimation
- Lightning effect
- Plasma effect
- And others in the components folder
