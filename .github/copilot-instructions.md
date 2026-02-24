# Copilot Presentation Viewer — AI Coding Agent Instructions

## Project Overview
This is a **slide deck presentation viewer** built with Express.js and vanilla JavaScript. It displays HTML slides in an iframe from a configurable slides directory, with a presenter UI featuring keyboard navigation, slide overview grid, and fullscreen support.

**Key Goal:** Enable presenters to deliver slide decks over HTTP with rich navigation controls.

## Architecture

### Server (`server.js`)
- **Express.js** on Node.js running on `PORT` (default 3000)
- **Single API endpoint:** `GET /api/config` → returns parsed `slides/config.json`
- **Directory resolution:** Slides dir from CLI arg → env var `SLIDES_DIR` → default `./slides/`
- **Static serving:** All slide HTML files and assets served from `slidesDir`
- **Presenter UI:** `presenter.html` always served from root directory (colocated with server.js)

### Config (`slides/config.json`)
Defines slide metadata for initialization:
```json
{
  "title": "Presentation Title",
  "author": "Author Name",
  "slides": [{ "file": "Index.html", "title": "Slide Title" }, ...]
}
```

### Presenter UI (`presenter.html`)
Client-side single-page app (IIFE) managing presentation state and UI:

**DOM Structure:**
- `#stage` — viewport container (fills available space minus 52px bar)
- `#slide-host` — 1280×720 slide container, CSS-scaled to fit viewport
- `#slide-frame` — iframe loading slide HTML files
- `#bar` — bottom control bar (52px height) with title, counter, progress, nav buttons, overview/fullscreen toggles
- `#overview` — modal grid overlay with thumbnail iframes for each slide

**Key State Variables:**
- `slides[]` — array of {file, title} from config
- `current` — 0-based slide index
- `overview` — boolean for modal state
- `thumbsLoaded` — lazy-loaded thumbnail iframes

**Core Navigation Logic:**
- `goTo(idx, opts)` — primary navigation function:
  - Validates index bounds
  - Adds slide transition flash (120ms) unless `opts.instant=true`
  - Sets `slideFrame.src = '/' + slides[idx].file`
  - Updates bar UI and overview active state
- Arrow/PageUp/PageDown/Space advance; Home/End jump to first/last
- `G` toggles overview grid; `F` toggles fullscreen; `?` shows keyboard help

**Responsive Scaling:**
- Uses ResizeObserver on `#stage` to trigger `scaleSlide()`
- Calculates CSS scale to fit 1280×720 slide within viewport with 16px padding
- Maintains aspect ratio; centers horizontally and vertically

**Design Tokens (CSS custom properties):**
- `--bg: #0d1117` — GitHub Dark Dim background
- `--surface: #161b22` — UI surface
- `--blue: #58a6ff` — accent color for buttons and progress
- `--slide-w/h: 1280/720` — fixed slide dimensions (also hardcoded in JS)

## Developer Workflows

### Starting the Server
```bash
npm start
# Starts server on http://localhost:3000
# Uses ./slides/ as default slide source
# Or: node server.js /path/to/custom/slides
```

### Adding Slides
1. Create `.html` file in `slides/` directory (1280×720 canvas)
2. Add entry to `slides/config.json` in order
3. Slide title used in bar and overview; file is relative to slidesDir root

### Slide HTML Structure
All slide files use a consistent baseline structure (see [slides/Index.html](slides/Index.html)):
- Viewport meta tag + dark theme CSS variables
- `.slide-container` wrapper (1280×720, flex column)
- Tailwind CSS + FontAwesome + custom fonts (Inter, JetBrains Mono)
- Decorative blur orb elements for visual polish
- Content layers with z-index management

### Testing
No automated tests. Manual testing only:
- Start server, navigate to http://localhost:3000
- Verify slide loads in iframe without CORS/404 errors
- Test keyboard navigation (arrow keys, G, F, ?) 
- Validate fullscreen and overview grid functionality

## Critical Patterns & Conventions

### Configuration-Driven Design
- Slides list defined in JSON config; not hardcoded
- Slide directory is pluggable via CLI arg or environment variable
- This enables reuse across multiple slide decks without code changes

### Presentation State as Single Source of Truth
- All UI (bar, overview, iframe src) derives from `current` index
- `goTo(idx)` is the single entry point for all navigation
- Keyboard handlers, buttons, and click-to-jump all call `goTo()` → ensures consistency

### Lazy-Loaded Thumbnails
- Overview thumbnails NOT built on page load; only when user opens overview via `G` key
- Prevents iframe waterfall; improves initial load performance  
- `thumbsLoaded` flag prevents rebuild; `updateOverviewActive()` marks current slide

### Iframe Sandboxing
- Slides load in iframe with `src` set dynamically; no sandbox attribute used
- Allows slide HTML full access (required for custom JS/styling)
- Consider adding `sandbox` attribute if slides from untrusted sources

### Slide Transition Flash
- `.transitioning` class triggers white flash (::after pseudo-element) for visual feedback
- 120ms delay between adding class and loading new iframe prevents jarring flash-load-flash sequence
- Does NOT fire on first load (`instant` flag)

### Viewport Centering Algorithm
```javascript
const scale = Math.min((W - padding * 2) / 1280, (H - padding * 2) / 720);
const offsetX = (W - 1280 * scale) / 2;
const offsetY = (H - 720 * scale) / 2;
```
Maintains 1:1 aspect ratio; padding prevents edge-to-edge touch; applies translate + scale.

## Integration Points & External Dependencies

- **Express.js 4.18.2** — HTTP server; no custom middleware needed
- **Tailwind CSS 2.2.19** (CDN in slide templates) — utility CSS framework
- **Font Awesome 6.4.0** (CDN) — icon library for UI buttons
- No build step or bundler; vanilla JS IIFE pattern
- Session storage (`sessionStorage.copilot-hint-shown`) tracks keyboard hint display once per session

## Cross-Component Communication
- Server ↔ Client: `/api/config` REST call fetches metadata on app init
- Client → Slide iframes: None; slides are passive HTML rendered inside iframe sandbox
- Fullscreen API used to request native fullscreen; browser grants/denies

## Known Limitations & Future Considerations
- Fixed 1280×720 slide aspect ratio; no responsive slide content layout within slide HTML
- Slide HTML must include its own styling (Tailwind via CDN); no CSS injection from presenter
- No slide notes or speaker view; presenter.html IS the speaker view
- Keyboard shortcuts hardcoded; no customization UI
- No slide animations or transitions (only presenter UI blur flash)
