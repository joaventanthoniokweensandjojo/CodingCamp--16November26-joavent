# Design — To-Do List Dashboard

## Project Structure

```
project-root/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── .kiro/
    └── specs/
        └── todo-list-dashboard/
            ├── requirements.md
            ├── design.md
            └── tasks.md
```

---

## Architecture

Single-page application with no build step. All logic lives in one HTML file, one CSS file, and one JS file. Data persists entirely through the browser's `localStorage` API.

```
index.html
  └── loads css/style.css
  └── loads js/app.js
        ├── Section 1 · Greeting & Clock
        ├── Section 2 · Focus Timer
        ├── Section 3 · To-Do List
        └── Section 4 · Quick Links
```

---

## Page Layout

Three-column grid on desktop, stacks to single column on mobile.

```
┌─────────────────────────────────────────────┐
│              HEADER (Greeting + Clock)       │
├──────────────┬──────────────────┬────────────┤
│ Focus Timer  │   To-Do List     │ Quick Links│
│  (280px)     │   (flexible)     │  (300px)   │
└──────────────┴──────────────────┴────────────┘
```

**Breakpoints:**
- `> 1100px` — 3-column layout
- `680px – 1100px` — 2-column, To-Do spans full width on top
- `< 680px` — single column, stacked

---

## Color Palette

| Token           | Value     | Usage                            |
|-----------------|-----------|----------------------------------|
| `--bg`          | `#0f1117` | Page background                  |
| `--surface`     | `#1a1d27` | Card background                  |
| `--surface-alt` | `#22263a` | Input / item background          |
| `--border`      | `#2e3350` | Card and input borders           |
| `--accent`      | `#6c63ff` | Primary actions, focus state     |
| `--accent-h`    | `#8a84ff` | Hover state, greeting text       |
| `--success`     | `#3ecf8e` | Completed tasks, timer done      |
| `--danger`      | `#ff5c7c` | Reserved for destructive actions |
| `--text`        | `#e8eaf6` | Primary text                     |
| `--text-muted`  | `#8b90b2` | Labels, placeholders, counts     |

---

## Typography

- **Font:** `Segoe UI`, system-ui, -apple-system, sans-serif
- **Clock:** `clamp(2.8rem, 7vw, 5rem)`, weight 700, tabular-nums
- **Card titles:** `0.75rem`, weight 700, uppercase, letter-spacing 0.12em
- **Body / tasks:** `0.9rem`
- **Labels / counts:** `0.78–0.875rem`, muted color

---

## Component Designs

### Header
- Full-width bar with gradient background
- Greeting line (small, uppercase, accent color)
- Large live clock (tabular-nums, updates every second)
- Date line below clock (muted)

### Card
- Dark surface background
- 1px border, 14px border-radius
- Box shadow for depth
- Section label as small uppercase heading

### Focus Timer
- Large digit display inside a rounded box
- Border turns accent-colored while running, green when done
- Pulsing animation when complete
- Three buttons: Start (primary), Stop (secondary), Reset (ghost)
- Status text below buttons

### To-Do Item
- Checkbox (custom styled, turns green when checked)
- Task text (strikethrough + muted when done)
- Edit and delete icon buttons (visible on hover)
- Slide-in animation on add

### Edit Modal
- Overlay with blur backdrop
- Centered card with input pre-filled with current task text
- Save (primary) and Cancel (ghost) buttons
- Closes on Escape, overlay click, or Enter key

### Quick Link Button
- Full-width anchor tag styled as a button
- Favicon loaded via Google's favicon service (`https://www.google.com/s2/favicons`)
- Delete button appears on hover

---

## Data Models

### Todo (stored in `localStorage` key: `dashboard_todos`)
```json
{
  "id": "string (uid)",
  "text": "string",
  "done": false,
  "created": 1700000000000
}
```

### Link (stored in `localStorage` key: `dashboard_links`)
```json
{
  "id": "string (uid)",
  "name": "string",
  "url": "string (full URL)"
}
```

---

## Security Notes

- All user input rendered through `escapeHtml()` and `escapeAttr()` helpers to prevent XSS
- Quick links open with `rel="noopener noreferrer"`
- URLs without a protocol are automatically prefixed with `https://`
