const express = require('express');
const path = require('path');
const fs = require('fs');

// Resolve slides directory: CLI arg > env var > slides/ subfolder next to server.js
const slidesDir = path.resolve(process.argv[2] || process.env.SLIDES_DIR || path.join(__dirname, 'slides'));
const PORT = process.env.PORT || 3000;

// Verify the slides directory exists
if (!fs.existsSync(slidesDir)) {
    console.error(`[error] Slides directory not found: ${slidesDir}`);
    process.exit(1);
}

// Verify config.json exists in the slides directory
const configPath = path.join(slidesDir, 'config.json');
if (!fs.existsSync(configPath)) {
    console.error(`[error] config.json not found in: ${slidesDir}`);
    process.exit(1);
}

const app = express();

// ── API: return the parsed config.json ───────────────────────────────────────
app.get('/api/config', (req, res) => {
    try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        res.json(config);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read config.json', detail: err.message });
    }
});

// ── Presenter UI ──────────────────────────────────────────────────────────────
// The presenter.html lives alongside server.js (in this directory).
// We serve it explicitly so it is always found, regardless of slidesDir.
const presenterHtml = path.join(__dirname, 'presenter.html');

app.get('/', (req, res) => {
    if (fs.existsSync(presenterHtml)) {
        res.sendFile(presenterHtml);
    } else {
        res.status(404).send('presenter.html not found next to server.js');
    }
});

// ── Static: serve all slide HTML + assets from slidesDir ─────────────────────
app.use(express.static(slidesDir));

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log('');
    console.log('  🚀  Copilot Presentation Server');
    console.log(`  📂  Slides dir : ${slidesDir}`);
    console.log(`  🌐  Open       : http://localhost:${PORT}`);
    console.log('');
    console.log('  Navigation inside the presenter:');
    console.log('    ←  /  →   Previous / Next slide');
    console.log('    G         Toggle slide overview grid');
    console.log('    F         Toggle fullscreen');
    console.log('    Esc       Close overview');
    console.log('');
});
