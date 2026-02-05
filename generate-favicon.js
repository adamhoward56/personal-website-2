const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Register the installed font
const fontPath = '/Users/adam/Library/Fonts/SedgwickAveDisplay-Regular.ttf';
registerFont(fontPath, { family: 'Sedgwick Ave Display' });

const STATIC_DIR = path.join(__dirname, 'static');

async function generateFavicon() {
  // Ensure static directory exists
  if (!fs.existsSync(STATIC_DIR)) {
    fs.mkdirSync(STATIC_DIR, { recursive: true });
  }

  const sizes = [32, 180, 192, 512];

  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2;

    // Black circle base
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();

    // Multiple irregular gradient blobs (like hero gradient)
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    // Purple blob - upper left
    const g1 = ctx.createRadialGradient(cx * 0.3, cy * 0.4, 0, cx * 0.3, cy * 0.4, r * 0.8);
    g1.addColorStop(0, 'rgba(200, 50, 255, 0.2)');
    g1.addColorStop(1, 'rgba(200, 50, 255, 0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, size, size);

    // Pink/red blob - right side
    const g2 = ctx.createRadialGradient(cx * 1.5, cy * 0.7, 0, cx * 1.5, cy * 0.7, r * 0.7);
    g2.addColorStop(0, 'rgba(255, 50, 100, 0.18)');
    g2.addColorStop(1, 'rgba(255, 50, 100, 0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, size, size);

    // Blue blob - bottom
    const g3 = ctx.createRadialGradient(cx * 0.6, cy * 1.4, 0, cx * 0.6, cy * 1.4, r * 0.6);
    g3.addColorStop(0, 'rgba(60, 80, 255, 0.15)');
    g3.addColorStop(1, 'rgba(60, 80, 255, 0)');
    ctx.fillStyle = g3;
    ctx.fillRect(0, 0, size, size);

    // Orange accent - lower right
    const g4 = ctx.createRadialGradient(cx * 1.3, cy * 1.3, 0, cx * 1.3, cy * 1.3, r * 0.5);
    g4.addColorStop(0, 'rgba(255, 150, 50, 0.12)');
    g4.addColorStop(1, 'rgba(255, 150, 50, 0)');
    ctx.fillStyle = g4;
    ctx.fillRect(0, 0, size, size);

    ctx.restore();

    // Font size proportional to canvas
    const fontSize = size * 0.75;
    ctx.font = `${fontSize}px "Sedgwick Ave Display"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const x = size / 2 - size * 0.015;
    const y = size / 2 + size * 0.05;

    // Glitchy chromatic aberration - horizontal offset only
    const offset = size * 0.04;

    // Red/cyan horizontal glitch
    ctx.fillStyle = 'rgba(255, 30, 70, 0.5)';
    ctx.fillText('A', x + offset, y);

    ctx.fillStyle = 'rgba(0, 100, 255, 0.45)';
    ctx.fillText('A', x - offset, y);

    // Slight vertical glitch fragments
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, y - size * 0.15, size, size * 0.08);
    ctx.clip();
    ctx.fillStyle = 'rgba(255, 30, 70, 0.3)';
    ctx.fillText('A', x + offset * 1.5, y);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, y + size * 0.1, size, size * 0.06);
    ctx.clip();
    ctx.fillStyle = 'rgba(0, 100, 255, 0.3)';
    ctx.fillText('A', x - offset * 1.5, y);
    ctx.restore();

    // Main white letter
    ctx.fillStyle = '#fff';
    ctx.fillText('A', x, y);

    // Save
    const buffer = canvas.toBuffer('image/png');
    const filename = size === 32 ? 'favicon.png' :
                     size === 180 ? 'apple-touch-icon.png' :
                     `favicon-${size}.png`;
    fs.writeFileSync(path.join(STATIC_DIR, filename), buffer);
    console.log(`Generated ${filename}`);
  }

  // Copy 32px as favicon.ico
  fs.copyFileSync(
    path.join(STATIC_DIR, 'favicon.png'),
    path.join(STATIC_DIR, 'favicon.ico')
  );
  console.log('Generated favicon.ico');
}

generateFavicon().catch(console.error);
