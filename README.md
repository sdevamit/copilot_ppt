# Copilot Presentation Viewer

A lightweight HTTP-based slide deck viewer built with Express.js and vanilla JavaScript. Displays HTML slides in an iframe with a presenter UI featuring keyboard navigation, a slide overview grid, and fullscreen support.

## Features

- Keyboard-driven navigation
- Slide overview grid (thumbnail view)
- Fullscreen mode
- Responsive scaling — slides always fit the viewport
- PDF export via Puppeteer
- Configurable slide directory (swap decks without code changes)

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm

## Installation

```bash
npm install
```

## Usage

### Start the presentation server

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Use a custom slides directory

```bash
node server.js /path/to/your/slides
```

The server also respects the `SLIDES_DIR` environment variable:

```bash
SLIDES_DIR=/path/to/your/slides npm start
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` / `PageDown` / `Space` | Next slide |
| `←` / `PageUp` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `G` | Toggle overview grid |
| `F` | Toggle fullscreen |
| `?` | Show keyboard shortcut help |

## Slides Configuration

Slides are defined in `slides/config.json`:

```json
{
  "title": "My Presentation",
  "author": "Author Name",
  "slides": [
    { "file": "Index.html", "title": "Title Slide" },
    { "file": "1.html",     "title": "Introduction" }
  ]
}
```

- **`file`** — HTML filename relative to the slides directory
- **`title`** — displayed in the control bar and overview grid
- Slide order in the array determines navigation order

### Creating a slide

Each slide is a standalone HTML file sized at **1280×720px**. Use the existing slides as a reference. The presenter UI handles scaling to fit the viewport.

## Exporting to PDF

With the server running, export all slides to a PDF:

```bash
npm run export-pdf
```

This starts the server, captures each slide with Puppeteer, merges the pages with `pdf-lib`, and writes `Augmented-Engineering-GitHub-Copilot.pdf`.

To specify a custom output filename:

```bash
node export-pdf.js my-deck.pdf
```

> **Note:** The server must be running on `http://localhost:3000` before running the export script directly.

## Project Structure

```
├── server.js          # Express server — serves slides and /api/config
├── presenter.html     # Presenter UI (single-page app, no build step)
├── export-pdf.js      # Puppeteer-based PDF exporter
├── package.json
└── slides/
    ├── config.json    # Slide metadata and order
    ├── Index.html     # Title slide
    └── *.html         # Individual slide files
```

## Dependencies

| Package | Purpose |
|---------|---------|
| `express` | HTTP server |
| `puppeteer` | Headless Chrome for PDF export |
| `pdf-lib` | Merging captured slide pages into a single PDF |
