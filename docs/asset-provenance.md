# Asset inventory and evidence
The original photographs were copied from the supplied Hills District project, without editing that project. On 19 October 2026, twelve additional user-supplied photographs were imported from Downloads. docs/asset-inventory.json records dimensions and byte sizes.
- blocked-drains.webp: outdoor drain-clearing equipment and operator; homepage evidence.
- drain-camera-inspection.webp: CCTV equipment, monitor and pipe access; diagnostic content.
- blocked-drain-excavation.webp and drainage-excavation-team.webp: exposed pipework and excavation; repair guidance.
- bathroom-drain-repair.webp: bathroom work; toilet service context.
- west-ryde-drainage-trench.webp and ryde-emergency-plumber-drain.webp: supplied filenames retained as provenance, never attributed to a Lower North Shore job.
- team.webp: provider team image; About and business identity.
No photograph is claimed to have been taken in a requested locality. ResponsiveImage clamps candidates to source width, produces WebP derivatives and emits sizes, srcset and explicit dimensions.
Review wording: Kristen P., Warren E. and Pawan S. retained verbatim from the reference src/data/site.ts. Only homepage placement, explicitly provider-wide; no relocation, review schema, rating or numerical badge.

## Supplied photo refresh, 19 October 2026

`src/data/supplied-photos.json` records each original filename, output path, visible-subject description and hero focal point. `scripts/import-supplied-photos.mjs` is an optional one-time import utility; normal builds use the self-contained WebP files in `public/images` and never require access to Downloads. Original files are untouched. Images are resized within 1400 x 1600 pixels, encoded as WebP, and further sized by Astro for the actual viewport.

Photos are selected by visible drainage work and access context, without attributing jobs to a suburb. Six service hero photographs, the Contact hero and an About gallery photograph were refreshed. Suburb hero choices are individually assigned in `src/data/areas.json`. Videos, the upside-down excavation photo and text-heavy social collages were not needed for this photo update.
