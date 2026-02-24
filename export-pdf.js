#!/usr/bin/env node
/**
 * Export slides to PDF using config.json slide order.
 * Usage: node export-pdf.js [output.pdf]
 * Requires the presentation server to be running on localhost:3000.
 */

const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const config = require('./slides/config.json');
const OUTPUT = process.argv[2] || 'Augmented-Engineering-GitHub-Copilot.pdf';
const BASE_URL = 'http://localhost:3000';
const SLIDE_W = 1280;
const SLIDE_H = 720;

(async () => {
    console.log(`\nExporting "${config.title}" — ${config.slides.length} slides`);
    console.log(`Output: ${OUTPUT}\n`);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: SLIDE_W, height: SLIDE_H, deviceScaleFactor: 1 });

    const mergedPdf = await PDFDocument.create();

    for (let i = 0; i < config.slides.length; i++) {
        const slide = config.slides[i];
        const url = `${BASE_URL}/${slide.file}`;

        process.stdout.write(`  [${String(i + 1).padStart(2, '0')}/${config.slides.length}] ${slide.title.padEnd(55)} `);

        try {
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
            // Extra wait for any CSS animations / web fonts
            await new Promise(r => setTimeout(r, 600));

            const pdfBytes = await page.pdf({
                width: `${SLIDE_W}px`,
                height: `${SLIDE_H}px`,
                printBackground: true,
                margin: { top: 0, right: 0, bottom: 0, left: 0 },
            });

            const slidePdf = await PDFDocument.load(pdfBytes);
            const [pdfPage] = await mergedPdf.copyPages(slidePdf, [0]);
            mergedPdf.addPage(pdfPage);

            console.log('✓');
        } catch (err) {
            console.log(`✗  (${err.message})`);
        }
    }

    await browser.close();

    const finalBytes = await mergedPdf.save();
    fs.writeFileSync(OUTPUT, finalBytes);

    const sizeMB = (finalBytes.length / 1024 / 1024).toFixed(2);
    console.log(`\nDone! ${OUTPUT} (${sizeMB} MB, ${config.slides.length} pages)\n`);
})();
