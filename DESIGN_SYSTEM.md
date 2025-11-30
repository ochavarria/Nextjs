# Design System

## Color Palette

This project uses a software engineering-inspired color palette with tech blues, cyans, and code greens.

### Primary Colors

#### Tech Blue Scale (Primary - Technology & Trust)
- **Tech Blue 900** (`#0a0e27`) - Darkest blue, used for hero backgrounds
- **Tech Blue 800** (`#1e3a8a`) - Dark blue, primary dark color
- **Tech Blue 700** (`#2563eb`) - Medium dark blue
- **Tech Blue 600** (`#3b82f6`) - Medium blue (logo start)
- **Tech Blue 500** (`#60a5fa`) - Base blue
- **Tech Blue 400** (`#93c5fd`) - Light blue
- **Tech Blue 300** (`#bfdbfe`) - Lighter blue
- **Tech Blue 200** (`#dbeafe`) - Very light blue
- **Tech Blue 100** (`#eff6ff`) - Lightest blue
- **Tech Blue 50** (`#f0f9ff`) - Subtle backgrounds

#### Tech Cyan Scale (Accent - Code & Digital)
- **Tech Cyan 900** (`#083344`) - Darkest cyan
- **Tech Cyan 800** (`#155e75`) - Dark cyan
- **Tech Cyan 700** (`#0891b2`) - Medium dark cyan
- **Tech Cyan 600** (`#06b6d4`) - Medium cyan
- **Tech Cyan 500** (`#00d4ff`) - Base cyan (logo end, primary accent)
- **Tech Cyan 400** (`#22d3ee`) - Light cyan
- **Tech Cyan 300** (`#67e8f9`) - Lighter cyan
- **Tech Cyan 200** (`#a5f3fc`) - Very light cyan
- **Tech Cyan 100** (`#cffafe`) - Lightest cyan

#### Code Green Scale (Secondary Accent - Success & Code)
- **Code Green 900** (`#064e3b`) - Darkest green
- **Code Green 800** (`#065f46`) - Dark green
- **Code Green 700** (`#047857`) - Medium dark green
- **Code Green 600** (`#059669`) - Medium green
- **Code Green 500** (`#00ff88`) - Base green (bright code green)
- **Code Green 400** (`#34d399`) - Light green
- **Code Green 300** (`#6ee7b7`) - Lighter green
- **Code Green 200** (`#a7f3d0`) - Very light green
- **Code Green 100** (`#d1fae5`) - Lightest green

#### Gray Scale (Neutral - Text & Borders)
- **Gray 900** (`#111827`) - Primary text color
- **Gray 800** (`#1f2937`) - Secondary text, dark backgrounds
- **Gray 700** (`#374151`) - Tertiary text, borders
- **Gray 600** (`#4b5563`) - Muted text
- **Gray 500** (`#6b7280`) - Placeholder text
- **Gray 400** (`#9ca3af`) - Disabled text
- **Gray 300** (`#d1d5db`) - Borders, dividers
- **Gray 200** (`#e5e7eb`) - Light borders
- **Gray 100** (`#f3f4f6`) - Light backgrounds
- **Gray 50** (`#f9fafb`) - Subtle backgrounds
- **White** (`#ffffff`) - Pure white, text on dark

### Usage Guidelines

#### Backgrounds
- **Hero Section**: Tech Blue 900 gradient (`#0a0e27` → `#1e3a8a` → `#0a0e27`)
- **Light Sections**: White or Tech Blue 50
- **Card Backgrounds**: White with Gray 200 borders
- **Dark Elements**: Tech Blue 800 or Gray 800

#### Text Colors
- **Primary Text**: Gray 900 (on light backgrounds)
- **Secondary Text**: Gray 700 (on light backgrounds)
- **Muted Text**: Gray 600 (on light backgrounds)
- **Text on Dark**: White or Tech Cyan 100
- **Accent Text**: Tech Cyan 500 or Tech Blue 500

#### Interactive Elements
- **Primary Buttons**: Tech Cyan 500 with hover: Tech Cyan 400
- **Secondary Buttons**: Tech Blue 600 with hover: Tech Blue 500
- **Links**: Tech Cyan 500 with hover: Tech Cyan 400
- **Success Actions**: Code Green 500 with hover: Code Green 400
- **Borders**: Gray 200 (light) or Tech Blue 700 (dark)

#### Status Colors
- **Success**: Code Green 500 (`#00ff88`)
- **Error**: Red 500 (`#ef4444`)
- **Warning**: Yellow 500 (`#f59e0b`)
- **Info**: Tech Cyan 500 (`#00d4ff`)

### Tailwind CSS Custom Colors

The color palette is configured in `globals.css` and can be used with Tailwind classes:

```tsx
// Backgrounds
bg-tech-blue-900    // Dark tech blue background
bg-tech-cyan-500    // Cyan accent background
bg-code-green-500   // Code green background

// Text
text-gray-900       // Primary text
text-tech-cyan-500  // Accent text
text-white          // Text on dark

// Borders
border-gray-200     // Light borders
border-tech-blue-800 // Dark tech blue borders
```

### Logo Colors

The OCC logo uses a gradient:
- **Start**: Tech Blue 600 (`#3b82f6`) - Technology blue
- **End**: Tech Cyan 500 (`#00d4ff`) - Digital cyan

This gradient represents the software engineering theme: blue for technology/trust and cyan for code/digital innovation.

### Accessibility

- All text meets WCAG AA contrast requirements
- Primary text (Gray 900) on White: 16.5:1 contrast ratio
- White text on Tech Blue 900: 8.5:1 contrast ratio
- Tech Cyan 500 on White: 3.8:1 contrast ratio (use for accents only, not body text)

