import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// One-time import. Published assets are self-contained; builds do not need Downloads.
const sourceDirectory = process.argv[2];
if (!sourceDirectory) throw new Error('Pass the directory containing the supplied photographs.');
const photos = [
  ['WhatsApp Image 2026-09-30 at 2.58.17 PM.jpeg', 'roots-removed-technician', 'Antons technician holding a long root mass removed from drainage', '50% 38%'],
  ['WhatsApp Image 2026-09-30 at 2.58.18 PM (1).jpeg', 'garden-drain-bedding', 'White drainage pipe laid on gravel bedding in an open garden trench', '50% 50%'],
  ['WhatsApp Image 2026-09-30 at 2.58.18 PM (2).jpeg', 'garden-drain-junction', 'Replacement drainage junction and access pipe in an excavated garden trench', '50% 60%'],
  ['WhatsApp Image 2026-09-30 at 2.58.18 PM.jpeg', 'wall-side-pipe-repair', 'New drainage pipework and junctions laid beside a house wall', '50% 40%'],
  ['WhatsApp Image 2026-10-01 at 6.48.47 AM (1).jpeg', 'garden-drain-clearing', 'Antons plumber with a drain hose in a garden beside the service vehicle', '50% 68%'],
  ['WhatsApp Image 2026-08-06 at 4.24.45 PM (1).jpeg', 'stormwater-pit-installation', 'Stormwater pit and connecting pipe being installed beside a house', '50% 38%'],
  ['WhatsApp Image 2026-08-06 at 4.24.45 PM.jpeg', 'narrow-side-drain-excavation', 'Antons plumber excavating a narrow passage between a house and fence', '50% 60%'],
  ['571575597_1309612891178145_7166122578590824463_n (1).jpg', 'subfloor-access-technician', 'Technician with a headlamp and tool bag beside a subfloor access opening', '65% 45%'],
  ['519698131_1219092843563484_369548387674640210_n (1).jpg', 'root-removal-excavation', 'Antons technician showing removed roots with the drainage excavation behind him', '60% 20%'],
  ['Antons Plumbing-054 (1).jpg', 'service-vehicle-equipment', 'Antons plumber retrieving a fittings case from a stocked service vehicle', '45% 50%'],
  ['2 (1).jpg', 'residential-drain-clearing', 'Antons plumber feeding a drain hose into a garden access point beside service vehicles', '45% 65%'],
  ['Antons Plumbing-039 (1).jpg', 'drain-inspection-overhead', 'Overhead view of an Antons plumber feeding a line into a drain opening', '50% 50%'],
];
const records = [];
for (const [source, name, alt, focalPoint] of photos) {
  const output = `/images/${name}.webp`;
  await sharp(path.join(sourceDirectory, source)).rotate().resize({ width: 1400, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(`public${output}`);
  records.push({ source, image: output, alt, focalPoint });
}
await fs.writeFile('src/data/supplied-photos.json', JSON.stringify(records, null, 2) + '\n');
console.log(`Imported ${records.length} supplied photos as optimised WebP assets.`);
