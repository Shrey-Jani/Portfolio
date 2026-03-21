# Figma Build Guide - Step by Step

## Phase 1: Foundation Setup ✅

### Step 1: Create Design System Colors

- [ ] Create color group "Dark Theme"
  - [ ] Surface colors (bg, surface, card)
  - [ ] Text colors (text, muted)
  - [ ] Brand colors (primary, secondary)
  - [ ] System colors (border, ring)
- [ ] Create color group "Light Theme" (duplicate and adjust values)
- [ ] Create gradient styles for primary and hover states

### Step 2: Create Typography Styles

- [ ] **Heading 1**: 52px, Plus Jakarta Sans, 800 weight
- [ ] **Heading 2**: 28px, Plus Jakarta Sans, 700 weight
- [ ] **Heading 3**: 18px, Plus Jakarta Sans, 600 weight
- [ ] **Body**: 16px, Plus Jakarta Sans, 400 weight
- [ ] **Body Lead**: 18px, Plus Jakarta Sans, 400 weight, color: muted
- [ ] **Small**: 14px, Plus Jakarta Sans, 400 weight

### Step 3: Create Effect Styles

- [ ] **Shadow - Light**: 0 8px 24px rgba(0,0,0,0.25)
- [ ] **Shadow - Large**: 0 12px 28px
- [ ] **Blur - Header**: Backdrop filter blur(10px)
- [ ] **Blur - Card**: Backdrop filter blur(10px)
- [ ] **Ring - Focus**: 0 0 0 3px rgba(106,13,173,0.25)

---

## Phase 2: Component Library 🧩

### Step 4: Create Button Component

**Main Button Variant**

- Padding: 10px 14px
- Border: 1px solid border color
- Border radius: 12px
- Background: Surface color
- Shadow: Default shadow

**Variants to create:**

- [ ] Default (secondary button)
- [ ] Primary (gradient background)
- [ ] Hover state (for each)
- [ ] Active state (for each)
- [ ] Focus state (with ring)
- [ ] Mobile size variant

### Step 5: Create Card Component

- [ ] Base card
  - Background: Card color
  - Border: 1px solid border
  - Border radius: 16px
  - Padding: 24px
  - Shadow: Default
  - Backdrop: Blur filter
- [ ] Create variants: Default, Desktop, Tablet, Mobile

### Step 6: Create Badge/Tag Component

- [ ] Pill-shaped tag
  - Background: Semi-transparent brand
  - Border: 1px solid border
  - Border radius: 999px
  - Padding: 4px 10px
  - Text: 12px, letter-spacing 0.3px
- [ ] Variants: Default, Code Button, Certificate Link, Live Button

### Step 7: Create Profile Card Component

- [ ] Background: Card color
- [ ] Top gradient bar (4px height)
- [ ] Avatar: 90px circular with border
- [ ] Status indicator: 20px circle (absolute positioned)
- [ ] Content sections: Name, Title, Handle, Status
- [ ] Create nested components for avatar and status
- [ ] Variants: Desktop (320px), Tablet (280px), Mobile (260px)

### Step 8: Create Project Card Component

- [ ] Cover area (16:9 aspect ratio)
  - Gradient overlay
  - Animation area (center, positioned)
- [ ] Meta section (below cover)
  - Title (h3)
  - Description
  - Tags
- [ ] Hover state: Border color change, shadow increase
- [ ] Variants: Desktop (aspect 16/9), Tablet (16/10), Mobile (16/12)

### Step 9: Create Badge/Avatar Component

- [ ] Size: 28px x 28px
- [ ] Gradient background
- [ ] Border radius: 8px
- [ ] Shadow: Default

### Step 10: Create Navigation Component

- [ ] Horizontal layout
- [ ] Logo/Badge (left)
- [ ] Nav links (center)
- [ ] CTA Button (right)
- [ ] Mobile variant: Stacked layout

---

## Phase 3: Layout Frames 📐

### Step 11: Create Responsive Breakpoint Frames

- [ ] Desktop (1440px wide)
- [ ] Tablet (768px wide)
- [ ] Mobile L (480px wide)
- [ ] Mobile S (360px wide)

### Step 12: Create Page Sections

- [ ] **Header**: Sticky, blur background
- [ ] **Hero**: Two-column (desktop), stacked (mobile)
  - Left: Profile card + actions
  - Right: Portrait image + text
- [ ] **About**: Card container
- [ ] **Projects**: Grid of project cards
  - Desktop: auto-fit, minmax(260px)
  - Mobile: Single column
- [ ] **Experience**: Timeline (optional)
- [ ] **Technology**: Grid of tech items
- [ ] **Contact**: Form or CTA section
- [ ] **Footer**: Simple layout with copyright

---

## Phase 4: Animation Documentation 🎬

### Step 13: Document Animation Specs

Create a FigJam board or separate frame documenting:

- [ ] **BlurText Animation**
  - Effect: Gradient text fade in
  - Duration: On scroll reveal
- [ ] **PixelTransition**
  - Effect: Pixel grid fade transition
- [ ] **Logo Loop Animation**
  - Effect: Horizontal scroll (infinite)
  - Duration: Continuous
- [ ] **Button Micro-interactions**
  - Hover: -2px translateY
  - Active: 0px translateY
- [ ] **Card Hover Effects**
  - Border color change
  - Shadow increase
  - -2px translateY

### Step 14: Interaction Prototypes

- [ ] Button hover → color change, shadow
- [ ] Project card hover → lift effect
- [ ] Profile card hover → avatar scale

---

## Phase 5: Polish & Export 🎯

### Step 15: Quality Checklist

- [ ] All colors are consistent
- [ ] Typography hierarchy is clear
- [ ] Spacing is uniform (use spacing scale)
- [ ] Components are properly nested
- [ ] All breakpoints are represented
- [ ] Naming conventions are consistent
- [ ] Design tokens are documented

### Step 16: Create Design Handoff Document

- [ ] Export color palette as .json or .csv
- [ ] Export typography specs
- [ ] Create developer notes
- [ ] Include animation specifications
- [ ] Add responsive breakpoint specs

---

## 📋 Quick Reference Checklist

**Colors to Set Up:**

```
Dark:     #0c0f14, #11151b, #151a22, #e8edf5, #a4afc0, #6a0dad, #8a2be2, #202632
Light:    #f6f8fb, #ffffff, #0c0f14, #5b6270, same brands, #e6eaf2
```

**Dimensions to Remember:**

```
Container Max: 1100px
Card Radius: 16px
Button Radius: 12px
Avatar Size: 90px (desktop), 75px (tablet), 60px (mobile)
Tag Radius: 999px (pill)
```

**Shadows:**

```
Default: 0 8px 24px rgba(0,0,0,0.25)
Lg:      0 12px 28px rgba(16,24,40,0.08)
```

**Gaps/Spacing:**

```
Desktop: 18px
Tablet:  16px
Mobile:  12px
```

---

## 🎬 Animation Effects to Document

| Effect            | Element          | Duration | Easing                         |
| ----------------- | ---------------- | -------- | ------------------------------ |
| Blur Text Reveal  | h1/Hero Name     | 0.5s     | Cubic bezier(0.2, 0.8, 0.2, 1) |
| Button Hover Lift | All buttons      | 0.3s     | ease                           |
| Shadow Expand     | Button on hover  | 0.3s     | ease                           |
| Card Lift         | Projects/Cards   | 0.25s    | ease                           |
| Scale Avatar      | Profile hover    | 0.3s     | ease                           |
| Color Transition  | Text on hover    | 0.3s     | ease                           |
| Logo Loop         | Infinite scroll  | Custom   | linear                         |
| Reveal In         | Scroll animation | 0.5s     | Custom cubic                   |

---

## 📲 Mobile-First Considerations

- [ ] Touch targets minimum 44px
- [ ] Stack layouts at 768px
- [ ] Single column projects at 768px
- [ ] Reduce padding mobile phones
- [ ] Optimize animations for mobile performance
- [ ] Test touch interactions (not just hover)

---

**You're ready to build an amazing Figma design! 🚀**
