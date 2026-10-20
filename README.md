# Antons Blocked Drains Lower North Shore
Local source project for the supplied domain https://blockeddrainslowernorthshore.com.au. The source is saved on the main branch of https://github.com/leobarotramonas-del/blockedlowernorthshore. Cloudflare Workers Builds is now connected to this repository. The confirmed Worker name is blockedlowernorthshore. Deployment success and the live domain must be verified in Cloudflare. The Hills District reference was read and copied selectively, never edited.

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

## Cloudflare Workers Builds
Repository: https://github.com/leobarotramonas-del/blockedlowernorthshore, branch main.
Worker name: blockedlowernorthshore. Root directory: /.
Build command: npm run build. Deploy command: npx wrangler deploy.

The 20 October 2026 build passed, but deployment failed because the Worker name was still a placeholder. wrangler.jsonc now uses the confirmed Worker name. Verify the next Cloudflare build and deployment before treating the website as live.

Builds remain non-indexable by default. Set PUBLIC_ALLOW_INDEXING=true only when deliberately launching on the intended production domain, https://blockeddrainslowernorthshore.com.au/. Domain routing, TLS and redirects still require verification. See docs/deployment.md for post-launch checks.
