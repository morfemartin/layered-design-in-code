// Uso: node tools/render.mjs <upto> <bg A|B|C> <nombre.png> [scale]
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [upto = "9", bg = "G", name = `L0${upto}.png`, scale = '2'] = process.argv.slice(2);
const guide = process.env.GUIDE ? "&guide=1" : "";
const extra = process.env.Q ? "&"+process.env.Q : "";
const url = `file://${root}/03_layers/cover.html?upto=${upto}&bg=${bg}${guide}${extra}`;
const out = `${root}/04_exports/${name}`;
execFileSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', '--disable-gpu', '--log-level=3', '--hide-scrollbars', '--allow-file-access-from-files',
  `--force-device-scale-factor=${scale}`, '--window-size=1600,1200',
  '--virtual-time-budget=4000', `--screenshot=${out}`, url,
], { stdio: ['ignore','ignore','ignore'], timeout: 60000 });
console.log('OK', out);
