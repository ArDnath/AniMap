# Home Components Visual Showcase

This document provides a visual description of each component's appearance and behavior.

## 🎨 HeroSection Component

```
┌────────────────────────────────────────────────────────────┐
│                    [Background Anime Image]                │
│  ┌──────────────────────────────┐                         │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━┓   │  [Gradient Overlays]  │
│  │  ┃  ATTACK ON TITAN     ┃   │  - Dark from bottom   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━┛   │  - Dark from left     │
│  │  (Pastel Pink, Rotated -1°)  │                         │
│  └──────────────────────────────┘                         │
│                                                            │
│  [★ 85%] [TV] [25 Episodes] [2013]  <- Info Pills        │
│                                                            │
│  ┏━━━━━━━━━━━━━┓  ┏━━━━━━━━━┓       <- Action Buttons   │
│  ┃ ▶ WATCH NOW ┃  ┃ ⓘ DETAILS┃                          │
│  ┗━━━━━━━━━━━━━┛  ┗━━━━━━━━━┛                            │
└────────────────────────────────────────────────────────────┘
```

**Key Features:**
- 70vh minimum height
- Full-width background image
- Black borders and brutal shadows on all elements
- Pastel pink title card with slight rotation
- Gradient overlays for text readability

---

## 🎴 AnimeCard Component

```
┌────────────────────┐
│ ┏━━━━━━━━━━━━━━━━┓│  <- Pastel Background
│ ┃ [Cover Image]  ┃│     (Rotating colors)
│ ┃                ┃│
│ ┃    [★ 92%]    ┃│  <- Score Badge
│ ┃                ┃│     (Top-right)
│ ┗━━━━━━━━━━━━━━━━┛│
│                    │
│  MY HERO ACADEMIA  │  <- Title (Bold, Uppercase)
│                    │
│  [TV] [24 EP]      │  <- Type & Episodes
└────────────────────┘
```

**Variations:**
- Card 1: Pink background, -1° rotation
- Card 2: Purple background, +1° rotation
- Card 3: Blue background, -2° rotation
- Card 4: Mint background, 0° rotation
- Pattern repeats...

**Hover Effect:**
- Straightens rotation (0°)
- Image zooms in 110%
- Shadow increases
- Slight scale up

---

## 📚 AnimeSection Component

```
┌─────────────────────────────────────────────────────────────┐
│  ┏━━━━━━━━━━━━━━━━━━━┓                    ┏━━━━━━━━━━┓    │
│  ┃ 🔥 TRENDING NOW   ┃                    ┃ VIEW ALL ➜┃    │
│  ┗━━━━━━━━━━━━━━━━━━━┛                    ┗━━━━━━━━━━┛    │
│  (Pastel Purple, -1°)                     (White button)   │
│                                                              │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐   │
│  │Card │  │Card │  │Card │  │Card │  │Card │  │Card │   │
│  │  1  │  │  2  │  │  3  │  │  4  │  │  5  │  │  6  │   │
│  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘   │
│                                                              │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐   │
│  │Card │  │Card │  │Card │  │Card │  │Card │  │Card │   │
│  │  7  │  │  8  │  │  9  │  │ 10  │  │ 11  │  │ 12  │   │
│  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Responsive Grid:**
```
Mobile (< 640px):     2 columns
Tablet (640-1024px):  3-4 columns  
Desktop (> 1024px):   5-6 columns
```

---

## 🏠 Complete Home Page Layout

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                      HERO SECTION                          ┃
┃               [Featured Anime Background]                  ┃
┃                    [Title Card]                            ┃
┃                 [Info Pills & Buttons]                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ┏━━━━━━━━━━━━━━━━━━━┓              ┏━━━━━━━━━━━┓        │
│  ┃ 🔥 TRENDING NOW   ┃              ┃ VIEW ALL ➜ ┃        │
│  ┗━━━━━━━━━━━━━━━━━━━┛              ┗━━━━━━━━━━━┛        │
│                                                            │
│  [Grid of 11 Anime Cards]                                 │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━┓        ┏━━━━━━━━━━━┓        │
│  ┃ ⭐ POPULAR THIS SEASON  ┃        ┃ VIEW ALL ➜ ┃        │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━┛        ┗━━━━━━━━━━━┛        │
│                                                            │
│  [Grid of 12 Anime Cards]                                 │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ┏━━━━━━━━━━━━━━━━┓                 ┏━━━━━━━━━━━┓        │
│  ┃ 🏆 TOP RATED   ┃                 ┃ VIEW ALL ➜ ┃        │
│  ┗━━━━━━━━━━━━━━━━┛                 ┗━━━━━━━━━━━┛        │
│                                                            │
│  [Grid of 12 Anime Cards]                                 │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━┓          ┏━━━━━━━━━━━┓        │
│  ┃ 💎 ALL TIME POPULAR   ┃          ┃ VIEW ALL ➜ ┃        │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━┛          ┗━━━━━━━━━━━┛        │
│                                                            │
│  [Grid of 12 Anime Cards]                                 │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🎭 Loading States

### Hero Skeleton
```
┌────────────────────────────────────────┐
│  [Gray Pulsing Background]            │
│                                        │
│  ████████████████      <- Title       │
│  ████  ████  ████      <- Pills       │
│  ██████  ████          <- Buttons     │
└────────────────────────────────────────┘
```

### Card Skeleton
```
┌──────────┐
│ ████████ │  <- Image
│ ████████ │
│ ████████ │
│          │
│ ██████   │  <- Title
│ ███ ████ │  <- Badges
└──────────┘
```

---

## 🎨 Color Examples

### Pastel Palette in Use
```
Hero Title:      ███████  <- Pink (#FFB3D9)
Section Header:  ███████  <- Purple (#D4B3FF)
Card 1 BG:       ███████  <- Pink
Card 2 BG:       ███████  <- Purple
Card 3 BG:       ███████  <- Blue (#B3D9FF)
Card 4 BG:       ███████  <- Mint (#B3FFD9)
Card 5 BG:       ███████  <- Yellow (#FFFFB3)
Card 6 BG:       ███████  <- Peach (#FFD9B3)
Score Badge:     ███████  <- Yellow
View All Button: ███████  <- White
```

---

## 🎬 Animations

### On Page Load
1. Hero section slides up (0s delay)
2. Cards slide in from left (staggered 50ms each)
3. Section headers fade in (0s delay)

### On Hover
- **Cards**: Straighten rotation, zoom image, lift shadow
- **Buttons**: Translate right & down, increase shadow
- **Links**: Arrow slides right

---

## 📱 Responsive Behavior

### Mobile (< 640px)
- Hero: Single column, smaller text
- Cards: 2 columns
- Buttons: Stack vertically
- Smaller padding/margins

### Tablet (640-1024px)
- Hero: Larger text
- Cards: 3-4 columns
- Buttons: Horizontal
- Medium spacing

### Desktop (> 1024px)
- Hero: Full size
- Cards: 5-6 columns
- Maximum width container (7xl)
- Large spacing

---

## 🎯 Interactive Elements

### Clickable Areas
1. **Hero Buttons**: Navigate to anime detail page
2. **Anime Cards**: Navigate to anime detail page
3. **View All Links**: Navigate to category page
4. **Score Badges**: Display-only (no action)

### Hover States
- All buttons: Shadow lift + translate
- All cards: Straighten + zoom
- All links: Underline or arrow movement

---

## 💡 Design Philosophy

**Brutalism:**
- Heavy black borders
- Bold, offset shadows
- Strong typography
- Geometric shapes

**Pastel Softness:**
- Soft, friendly colors
- Light backgrounds
- Welcoming aesthetic

**Combined Result:**
- Unique, memorable design
- Eye-catching but not aggressive
- Playful yet professional
- Modern with retro influences
