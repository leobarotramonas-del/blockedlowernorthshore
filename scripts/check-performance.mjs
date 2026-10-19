import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const images = [...home.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag);
for (const image of images) {
  assert.match(image, /\bsrcset="[^"]+"/, 'Homepage images need responsive candidates');
  assert.match(image, /\bsizes="[^"]+"/, 'Homepage images need display sizes');
  for (const match of image.matchAll(/\/_astro\/[^\s",]+\.webp/g)) {
    assert.ok(fs.existsSync(path.join(root, match[0])), `Missing image: ${match[0]}`);
  }
}
const hero = images.find((image) => image.includes('blocked-drains'));
assert.ok(hero, 'Hero drain image must be discoverable in initial HTML');
assert.match(hero, /fetchpriority="high"/);
assert.match(hero, /loading="eager"/);
assert.doesNotMatch(home, /<iframe\b/, 'Homepage must not eagerly load third-party embeds');
assert.doesNotMatch(home, /<link\b[^>]*rel="stylesheet"/, 'Initial styles should be inline');
assert.equal([...home.matchAll(/as="font"/g)].length, 2, 'Only critical body and heading fonts are preloaded');
assert.ok(fs.statSync(path.join(root, 'index.html')).size < 250_000, 'Homepage HTML should remain compact');
console.log('Performance checks passed: responsive images, eager LCP asset, no eager embeds, inline CSS and two font preloads.');

const candidates=[...hero.matchAll(/(\/_astro\/[^\s",]+\.webp)\s+(\d+)w/g)].map(m=>({file:m[1],width:Number(m[2]),bytes:fs.statSync(path.join(root,m[1])).size}));
assert.ok(candidates.some(c=>c.width>=360&&c.width<=480&&c.bytes<100000),'Mobile hero candidate must be under 100 KB');
const jsFiles=fs.readdirSync(path.join(root,'_astro')).filter(f=>f.endsWith('.js'));
const jsBytes=jsFiles.reduce((n,f)=>n+fs.statSync(path.join(root,'_astro',f)).size,0);
assert.ok(jsBytes<20000,'Client JavaScript exceeds 20 KB');
console.log('Hero candidates:',candidates,'Client JS bytes:',jsBytes);
