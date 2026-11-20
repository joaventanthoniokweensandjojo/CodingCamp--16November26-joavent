# Tasks — To-Do List Dashboard

- [x] 1. Project Scaffolding
  - **Task Start:** November 20, 2026
  - Create `index.html`, `css/style.css`, and `js/app.js`
  - Link stylesheet and script inside `index.html`
  - Verify folder structure: only 1 CSS file in `css/`, only 1 JS file in `js/`
  - _Requirements: 5.2_

- [x] 2. HTML Structure
  - **Task Start:** November 20, 2026
  - Write header section with elements for greeting, clock, and date
  - Write Focus Timer card with display, Start/Stop/Reset buttons, and status text
  - Write To-Do List card with input form, task list, and footer
  - Write Quick Links card with name/URL form and links grid
  - Write Edit Task modal with overlay, input, Save, and Cancel buttons
  - _Requirements: 1.1, 2.1, 3.1, 4.1_

- [x] 3. CSS Styling
  - **Task Start:** November 20, 2026
  - Define CSS custom properties for colors, spacing, and fonts
  - Style header, clock, greeting, and date display
  - Implement 3-column responsive grid with breakpoints at 1100px and 680px
  - Style card component, all button variants, and form inputs
  - Style Focus Timer display with running and done visual states
  - Style custom checkbox, to-do items, hover actions, and slide-in animation
  - Style edit modal overlay with scale-in animation
  - Style quick link buttons with favicon and scrollbar
  - _Requirements: 5.1, 5.3_

- [x] 4. Greeting & Clock
  - **Task Start:** November 20, 2026
  - Implement `updateClock()` that runs every second via `setInterval`
  - Display HH:MM:SS time, full date string, and time-based greeting
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 5. Focus Timer
  - **Task Start:** November 20, 2026
  - Implement 25-minute countdown using `setInterval`
  - Wire Start, Stop, and Reset buttons with correct state management
  - Apply visual state classes (running, done) and update status text
  - Trigger browser notification on completion and request permission on load
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 6. To-Do List
  - **Task Start:** November 20, 2026
  - Implement add task via form submit and Enter key
  - Implement toggle done, delete, and clear-done via event delegation
  - Implement edit modal: open with pre-filled text, save, cancel, keyboard shortcuts
  - Render task count (remaining / total) and empty state message
  - Load from and save to `localStorage` on every change
  - Sanitize all output with `escapeHtml()`
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9_

- [x] 7. Quick Links
  - **Task Start:** November 20, 2026
  - Implement add link form with auto `https://` prefix
  - Render link buttons with favicon via Google Favicon API, opening in new tab
  - Implement delete link via event delegation
  - Pre-load 4 default links on first run
  - Load from and save to `localStorage` on every change
  - Sanitize output with `escapeHtml()` and `escapeAttr()`
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 8. Utilities
  - **Task Start:** November 20, 2026
  - Implement `uid()` for unique ID generation
  - Implement `escapeHtml()` for safe DOM insertion
  - Implement `escapeAttr()` for safe HTML attribute values
  - _Requirements: 5.1_
