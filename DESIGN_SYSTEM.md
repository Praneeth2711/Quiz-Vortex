# 🎨 UI/UX DESIGN GUIDE

## 🌈 Color Palette

### Primary Colors

```
Indigo:   #6366F1  (rgb(99, 102, 241))
Purple:   #A855F7  (rgb(168, 85, 247))
Pink:     #EC4899  (rgb(236, 72, 153))
Red:      #EF4444  (rgb(239, 68, 68))
```

### Secondary Colors

```
Yellow:   #FBBF24  (rgb(251, 191, 36))
Orange:   #FB923C  (rgb(251, 146, 60))
Green:    #10B981  (rgb(16, 185, 129))
Cyan:     #06B6D4  (rgb(6, 182, 212))
```

### Background

```
Dark:     #020617  (rgb(2, 6, 23))
Slate:    #1E293B  (rgb(30, 41, 59))
```

### Used In:

- **Login**: Indigo → Purple gradient
- **Signup**: Purple → Pink gradient
- **Stats**: Multiple colors (Blue, Yellow, Green, Red)
- **Coins**: Yellow → Orange gradient
- **Buttons**: Indigo → Purple gradient

---

## 🎯 Component Breakdown

### Login Page Layout

```
┌─────────────────────────────────┐
│        VORTEX HEADER             │
├─────────────────────────────────┤
│    Welcome Back, Warrior         │
├─────────────────────────────────┤
│  ┌─────────────────────────────┐ │
│  │  Email Address Input        │ │
│  │  [_____________________]    │ │
│  └─────────────────────────────┘ │
│  ┌─────────────────────────────┐ │
│  │  Password Input             │ │
│  │  [_____________________] 👁️ │ │
│  └─────────────────────────────┘ │
│  □ Remember me   [Forgot Password]│
│  ┌─────────────────────────────┐ │
│  │  [ENTER THE VORTEX] ⚡     │ │
│  └─────────────────────────────┘ │
│  ───────────────────────────────  │
│     New to Vortex?                │
│  ┌─────────────────────────────┐ │
│  │  [CREATE ACCOUNT]           │ │
│  └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### Signup Page Layout

```
┌─────────────────────────────────┐
│        VORTEX HEADER             │
│    Join the Arena                │
├─────────────────────────────────┤
│  Progress: █████░░░░  50%        │
├─────────────────────────────────┤
│  STEP 1: ACCOUNT INFO            │
│  ┌─────────────────────────────┐ │
│  │  Email Address Input        │ │
│  │  [_____________________]    │ │
│  └─────────────────────────────┘ │
│  ┌─────────────────────────────┐ │
│  │  Battle Name Input          │ │
│  │  [_____________________]    │ │
│  │  ✓ Perfect! (validation)    │ │
│  └─────────────────────────────┘ │
│  ┌─────────────────────────────┐ │
│  │      [CONTINUE]             │ │
│  └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### Profile View Mode

```
┌─────────────────────────────────┐
│  ┌───────┐                       │
│  │ Avatar│  @username             │
│  │       │  Bio text here         │
│  └───────┘  🏆 Top Player         │
│             ⭐ Gold Member        │
│             🔥 24 Vortex Mage     │
│             [✎ EDIT PROFILE]     │
├─────────────────────────────────┤
│  STATS (4 columns)               │
│  ┌──────┬──────┬──────┬──────┐  │
│  │🎮    │🏆    │⚡    │🔥    │  │
│  │42    │15    │1.8s  │12    │  │
│  │Games │Wins  │Speed │Streak│  │
│  └──────┴──────┴──────┴──────┘  │
├─────────────────────────────────┤
│  ACHIEVEMENTS                    │
│  ┌──────┬──────┬──────┬──────┐  │
│  │🩸    │💯    │🌩️    │🦋    │  │
│  │First │100%  │Speed │Social│  │
│  │Blood │Club  │Demon │Butterfly
│  └──────┴──────┴──────┴──────┘  │
├─────────────────────────────────┤
│  💰 TOTAL COINS: 1,500          │
└─────────────────────────────────┘
```

### Profile Edit Mode

```
┌─────────────────────────────────┐
│  Edit Your Profile               │
├─────────────────────────────────┤
│  👤 CHOOSE AVATAR                │
│  ┌──┬──┬──┬──┐                   │
│  │🧑│👨│👩│🧔│ (8 options)      │
│  │  │  │  │  │                   │
│  └──┴──┴──┴──┘                   │
│     Preview: [Avatar in center]  │
├─────────────────────────────────┤
│  Battle Name                     │
│  [___________________] 12/20      │
├─────────────────────────────────┤
│  Bio / Tagline                   │
│  [________________________]       │
│  [________________________] 45/150 │
├─────────────────────────────────┤
│  [CANCEL]  [💾 SAVE CHANGES]    │
└─────────────────────────────────┘
```

### Navbar Layout

```
┌──────────────────────────────────────┐
│  V VORTEX  │ Explore Rank Profile  │ 💰 500 │ 👤
│            │ (when logged in)     │
└──────────────────────────────────────┘
  └─ Dropdown Menu (on avatar click)
     ├─ User Name
     ├─ user@email.com
     ├─ ────────────
     ├─ 👤 Edit Profile
     ├─ 🏆 Leaderboard
     ├─ 🎮 Play
     ├─ ────────────
     └─ 🚪 Logout
```

---

## 📐 Layout Specifications

### Typography

```
Page Title:    48px, 900 weight, gradient
Section Title: 24px, 700 weight
Body Text:     16px, 400 weight
Small Text:    12px, 500 weight
Labels:        12px, 700 weight, uppercase
```

### Spacing

```
Container padding:  1.5rem (mobile), 3rem (desktop)
Component gap:      1rem (horizontal), 1.5rem (vertical)
Input padding:      1rem
Button padding:     1rem (v), 3rem (h)
Border radius:      1.5rem (buttons), 2rem (cards)
```

### Responsive Widths

```
Mobile (<640px):    95vw max
Tablet (640-1024):  90vw max
Desktop (>1024):    1280px max
```

---

## ✨ Animation Specifications

### Page Transitions

```
Duration:   300ms
Direction:  Fade + Horizontal Slide
Enter:      opacity: 0→1, x: 20→0
Exit:       opacity: 1→0, x: 0→-20
Ease:       easeOut
```

### Button Interactions

```
Hover:  scale: 1→1.05, y: 0→-2px
Click:  scale: 1.05→0.98
Duration: 200ms
```

### Menu Dropdown

```
Enter:  opacity: 0→1, scale: 0.95→1, y: -10→0
Exit:   opacity: 1→0, scale: 1→0.95, y: 0→-10
Duration: 200ms
Ease: easeInOut
```

### Loading Spinner

```
Animation: rotate 360deg
Duration:  2s
Direction: linear, infinite
```

### Form Validation

```
Valid:      color change, checkmark appears
Invalid:    shake, red highlight, error message
Duration:   300ms ease-in-out
```

---

## 🎨 Component States

### Button States

```
Default:   bg-gradient, text-white, border: 2px
Hover:     scale: 1.05, shadow: lg, brightness: 1.1
Active:    scale: 0.98, shadow: md
Disabled:  opacity: 0.5, cursor: not-allowed
Loading:   spinner icon, text: "Loading..."
```

### Input States

```
Default:   bg-slate-900, border-white/10
Focus:     border-indigo-500/50, ring-2: indigo-500/20
Error:     border-red-500, bg-red-500/10
Success:   border-green-500, checkmark icon
Disabled:  bg-slate-900/50, cursor: not-allowed
```

### Card States

```
Default:   glass effect, border-white/5
Hover:     border-indigo-500/50, scale: 1.02
Active:    bg-indigo-600/10
Disabled:  opacity-50, cursor: not-allowed
```

---

## 🌈 Gradient Combinations

### Primary Gradients

```
Login:     from-indigo-600 to-purple-600
Signup:    from-purple-600 to-pink-600
Stats[0]:  from-blue-600 to-cyan-600 (Games)
Stats[1]:  from-yellow-600 to-orange-600 (Wins)
Stats[2]:  from-green-600 to-emerald-600 (Speed)
Stats[3]:  from-red-600 to-pink-600 (Streak)
Coins:     from-yellow-600/20 to-orange-600/20
```

---

## 📱 Mobile Optimizations

### Touch Targets

```
Minimum size: 44x44px
Spacing:      8px between targets
```

### Mobile-specific

```
Font sizes: +2px larger
Padding:    +0.5rem
Gaps:       +0.25rem
```

### Landscape Mode

```
Hide unnecessary elements
Reduce vertical spacing
Optimize button layout
```

---

## 🎯 Accessibility

### Color Contrast

```
Text on bg:     Minimum 4.5:1
Large text:     Minimum 3:1
Interactive:    Minimum 3:1
```

### Focus States

```
Visible outline: 2px, offset 2px
Color:          indigo-500
Applies to:     inputs, buttons, links
```

### Keyboard Navigation

```
Tab order: Logical flow (top to bottom)
Tab focus: Visible on all interactive elements
Escape:    Close modals/dropdowns
Enter:     Submit forms
```

---

## 🎬 Animation Duration Guide

```
Micro interactions:    100-200ms
Form interactions:     200-300ms
Page transitions:      300-400ms
Modal open/close:      300-400ms
Loading spinners:      1500-2000ms
Decorative loops:      10000ms+
```

---

## 🌙 Dark Mode

```
Background:     #020617 (solid dark)
Surface:        #1E293B (cards/containers)
Text Primary:   #F1F5F9 (white)
Text Secondary: #94A3B8 (gray)
Accents:        Indigo, Purple, Pink (vibrant)
```

---

## 💡 Design Principles

1. **Glassmorphism** - Frosted glass effect for depth
2. **Gradients** - Color transitions for visual appeal
3. **Animations** - Smooth, purposeful movements
4. **Contrast** - Clear visual hierarchy
5. **Responsive** - Works on all devices
6. **Accessible** - WCAG compliant
7. **Interactive** - Feedback on every action
8. **Modern** - Current design trends

---

This design system ensures consistency across all pages while maintaining an addictive, engaging user experience! 🎨✨
