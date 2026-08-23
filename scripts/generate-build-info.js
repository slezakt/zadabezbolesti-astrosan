import fs from 'node:fs';
import path from 'node:path';

const output = path.resolve('dist/build-info.json');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify({ commit: process.env.GITHUB_SHA || 'local-dev', builtAt: new Date().toISOString() }, null, 2));
console.log(`[build-info] ${output}`);
