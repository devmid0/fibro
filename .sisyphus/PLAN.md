# مساعدتي اليومية - Teacher Fibromyalgia Support Site

## Concept & Vision
A serene, supportive digital sanctuary for a teacher managing fibromyalgia. The site embodies calm and encouragement, using soft pastel blues and mints with RTL Arabic design. Every interaction feels like a gentle embrace—never clinical or overwhelming.

## Design Language

### Aesthetic Direction
Soft, nurturing minimalism inspired by wellness apps and mindfulness spaces. Think morning light through sheer curtains.

### Color Palette
- **Primary**: `#A8D5E5` (Soft Sky Blue)
- **Secondary**: `#B8E6D4` (Mint Cream)
- **Accent**: `#7FCDCD` (Medium Turquoise)
- **Background Light**: `#F0F9FB` (Alice Blue)
- **Background Dark**: `#1A2A35` (Deep Teal)
- **Text Light**: `#3A4A5A` (Slate)
- **Text Dark**: `#E8F4F8` (Ice White)
- **Surface Light**: `#FFFFFF`
- **Surface Dark**: `#243444`

### Typography
- **Font**: Tajawal (Google Fonts) - weights 300, 400, 500, 700
- **Base size**: 18px for readability
- **Headings**: 700 weight, 1.5em-2em

### Spatial System
- Base unit: 8px
- Generous padding: 24px-48px
- Card radius: 16px
- Comfortable touch targets: 48px minimum

### Motion Philosophy
- Gentle, slow animations (400-800ms)
- Breathing bubble: continuous, organic expansion/contraction
- Page transitions: soft fade
- Hover states: subtle lift with shadow

### Visual Assets
- Emoji icons for warmth
- Soft shadows and gradients
- Breathing animation as focal point

## Layout & Structure

### Navigation
- Sidebar (right for RTL) with logo, nav links, dark toggle
- Single-page app with JS routing

### Pages
1. **Dashboard** - Welcome, breathing exercise, daily stats, motivational quote
2. **Articles** - Card grid with helpful tips (expandable)
3. **Tracker** - Pain log form with slider, notes, history

## Features & Interactions

### Breathing Bubble Animation
- CSS-only implementation
- Three concentric bubbles expanding/contracting
- Manual breathing button with guided steps

### Dark Mode Toggle
- Smooth transition between themes
- Persisted in localStorage
- Respects system preference initially

### Pain Tracker
- Range slider 1-10 with Arabic numerals
- Optional notes textarea
- LocalStorage persistence
- History view with delete option

### Articles
- Expandable cards showing full content
- Categories: relaxation, self-care, pain management, sleep

## Component Inventory

### Navigation Item
- Default: subtle background
- Hover: slight lift, accent color
- Active: filled background, bold text

### Stat Card
- Icon + label + value
- Soft shadow, rounded corners
- Hover: gentle elevation

### Article Card
- Icon header
- Title and summary
- Expandable content section

### Pain Slider
- Custom styled range input
- Scale labels below
- Emoji indicator above

### Toast Notification
- Success: mint background
- Slide in from bottom
- Auto-dismiss after 3s

## Technical Approach
- Vanilla HTML/CSS/JS
- Single-page with hash routing
- localStorage for pain logs and theme preference
- No external dependencies except Google Fonts
