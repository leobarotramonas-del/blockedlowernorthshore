# Antons Blocked Drains Lower North Shore
Local source project for the supplied domain https://blockeddrainslowernorthshore.com.au. The source has a dedicated local Git repository. A remote repository and Cloudflare deployment destination are awaiting confirmation; the site is not published. The Hills District reference was read and copied selectively, never edited.

## Runtime and installation
Use Node 24 LTS (tested 24.18.0) and npm. Astro 7.4 static output is a documented security exception to the requested Astro 5 baseline; see docs/architecture-decision.md.
Run:
```powershell
npm ci
npm run images
npm run build
npm run preview -- --host 127.0.0.1 --port 4323
```
Build output: dist. The image task inventories original assets; Astro generates hashed responsive WebP derivatives. Fonts are local. No analytics or third-party runtime scripts.

## Pages
35 intended indexable pages plus a noindex 404: homepage; two hubs; eight service guides; twenty locality guides; About, Contact, Privacy and Terms. sitemap.xml includes only the 35 canonical pages. Native disclosures provide menu and FAQ interaction.

## Indexing environments
Builds default to noindex,nofollow, with robots.txt disallowing all crawling. The production domain is always used for canonical URLs.
For a deliberate production build only:
```powershell
$env:PUBLIC_ALLOW_INDEXING='true'
npm run build
Remove-Item Env:PUBLIC_ALLOW_INDEXING
```
This emits indexable metadata and production robots with the sitemap URL. Preview builds must leave the variable unset or false. Do not enable indexing on a preview host.

## Validation
npm run build runs Astro diagnostics, static generation, canonical/schema/sitemap checks, internal-link coverage, image/performance budgets and content checks.
npm run check:responsive checks eight representative routes at 320, 375, 768, 1024 and 1440px, opens menus/FAQs, checks focus and phone links, runs axe, and saves 16 desktop/mobile captures.
node scripts/lighthouse.mjs audits homepage, CCTV service and McMahons Point in simulated mobile conditions. Start preview on 4323 first. Chrome path in these two scripts is the standard Windows installation; adapt for another machine.
Reports and screenshots are local under qa/ (gitignored). QA-REPORT.md records final results and limitations.

## Maintainable content
src/data/site.ts: business details, core service data, homepage FAQs and verified review wording.
src/data/areas.json: twenty independently authored locality guides, six FAQs each, relevant methods and adjacent localities.
src/data/service-guidance.json: service-specific safety, limits, access, related links and FAQs.
src/data/schema.ts: one coherent graph per page with stable IDs and provider reference.
src/components/ResponsiveImage.astro: no upscaling, responsive candidates, explicit dimensions.
docs/asset-provenance.md and docs/local-reference-sources.md: evidence and orientation sources.
Keep the provider identity natural; do not invent prices, response times, local jobs, reviews or ratings.

## GitHub and Cloudflare launch preparation
Repository and Worker name remain unconfirmed. wrangler.jsonc deliberately contains REPLACE_WITH_CONFIRMED_WORKER_NAME. This is the only deployment placeholder and must be replaced before deployment. It intentionally remains unresolved in the local source commit until the destination is confirmed. No public-facing content placeholders remain.
1. Confirm repository and exact Worker name. Replace the placeholder. Resolve any remaining QA or business-policy review items.
2. Create/review a clean repository excluding .env, node_modules, dist, .astro, .wrangler and qa.
3. Connect that repository to Cloudflare Workers Builds, with main as production branch and this project as root.
4. Configure install npm ci, build npm run build, deploy npx wrangler deploy; static assets directory dist. Set PUBLIC_ALLOW_INDEXING=true only for the production environment.
5. Add the confirmed custom domain in Cloudflare and configure TLS. Worker and custom domain setup have not been performed.
6. Follow docs/deployment.md for canonical redirects and post-launch checks. A push is not an automatic deployment until integration and permissions are configured and a successful build/deployment is verified.

Production deployment URL: none. Intended domain: https://blockeddrainslowernorthshore.com.au/.

