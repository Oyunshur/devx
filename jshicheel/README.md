# ⚡ BRUTAL.DO // Neo-Brutalist Task Engine

> **Hyper-focused, unapologetic productivity workstation built with pure Vanilla JavaScript and authentic Neo-Brutalism aesthetics.**

---

## 🎨 Neo-Brutalist Design Features
- **Raw High-Contrast Geometry**: Thick `3px` and `4px` ink borders with stark, unblurred hard drop shadows (`4px 4px 0px`, `6px 6px 0px`, `9px 9px 0px`).
- **Vibrant Neo-Pop Palette**: Electric Canary Yellow (`#FFE600`), Cyber Cyan (`#5CE1E6`), Neon Lime (`#99E834`), Hot Brutal Pink (`#FF6EA7`), and Lilac Lavender (`#C490E4`).
- **Tactile Micro-Interactions**: Buttons and cards physically "press down" on click with responsive translation offsets and shadow changes.
- **Marquee Ticker Banner**: Vintage scrolling productivity ticker with geometric starburst badges (`✦`).
- **Celebratory Confetti Engine**: Zero-dependency, pure HTML5 Canvas confetti bursts when tasks are finished.
- **8-Bit Synthesized Sound Effects**: Web Audio API retro sound generator for clicks, triumph chords, and trash sweeps (with one-click mute toggle).
- **Day & Cyber Dark Themes**: Full support for both classic light paper and high-contrast dark cyberpunk neo-brutalism.

---

## 🚀 Key Functional Capabilities
1. **Dual Views**:
   - **Kanban Board**: Drag-and-drop cards dynamically between **📌 TO DO**, **⚡ IN PROGRESS**, and **✅ COMPLETED** columns with visual drop target highlighting and instant counters.
   - **List View**: Dense, high-information row overview with status badges, deadline countdowns, and quick actions.
2. **Subtasks & Checklists**:
   - Add multiple checklist items per task.
   - Interactive progress bar with automatic percentage calculation.
3. **Smart Filters & Instant Search**:
   - Live query searching with `/` hotkey.
   - Status pills (All, To Do, Doing, Done).
   - Priority filters (High 🔥, Medium ⚡, Low 🌱).
   - Category tags (Dev, Study, Work, Personal, Health, Finance, Other).
   - Sorting by Due Date (Soonest), Priority (Highest), Creation Date, or Alphabetical.
4. **Velocity & Stats Strip**:
   - Real-time task metrics, completion rate, and dynamic motivational status messages.
   - Brutalist striped progress bar.
5. **Persistence & Portability**:
   - Automatic `localStorage` persistence.
   - **JSON Export** to backup your tasks.
   - **JSON Import** to restore or share boards.
   - **Undo Delete** toast notification safeguard.
   - **Demo Data Reset** to restore pre-populated tasks anytime.

---

## ⌨️ Keyboard Shortcuts
| Shortcut | Action |
| :--- | :--- |
| <kbd>N</kbd> | Open New Task modal |
| <kbd>/</kbd> | Focus Search input |
| <kbd>B</kbd> | Toggle between Kanban Board and List View |
| <kbd>Esc</kbd> | Close active modal or drawer |
| <kbd>⌘</kbd> + <kbd>Enter</kbd> / <kbd>Ctrl</kbd> + <kbd>Enter</kbd> | Save & Submit Task in Modal |

---

## 🧱 Architecture (ES6 Classes)
The application is structured into clean, modular ES6 classes:

```
├── Task              // Entity model managing status, subtasks, overdue checks, and dates
├── TaskManager       // State store handling CRUD, filters, sorting, stats, and undo
├── StorageManager    // LocalStorage abstraction, seed demo data, and JSON import/export
├── SoundManager      // Web Audio API synthesis for clicks, completions, and deletions
├── ConfettiEngine    // Canvas particle physics engine for celebration bursts
└── UIRenderer        // DOM rendering, drag-and-drop, modals, events, and shortcuts
```

---

## 🏃 How to Open & Run
Simply open `index.html` in your browser:
```bash
open index.html
```
Or start a local server:
```bash
npx serve .
# or
python3 -m http.server 8000
```
Then visit `http://localhost:8000`!
