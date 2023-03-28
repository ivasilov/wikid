// @ts-check

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dir = path.join(__dirname, '..', 'build');
await fs.mkdir(dir);

const fstFrom = path.join(__dirname, '..', '.next', 'standalone', '.next');
const fstTo = path.join(__dirname, '..', 'build', '.next');
await fs.cp(fstFrom, fstTo, { recursive: true });

const sndFrom = path.join(__dirname, '..', 'public');
const sndTo = path.join(__dirname, '..', 'build', 'public');
await fs.cp(sndFrom, sndTo, { recursive: true });

const trdFrom = path.join(__dirname, '..', '.next', 'static');
const trdTo = path.join(__dirname, '..', 'build', '.next', 'static');
await fs.cp(trdFrom, trdTo, { recursive: true });
