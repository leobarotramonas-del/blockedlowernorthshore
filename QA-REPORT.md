# Local build report
Date: 19 October 2026 (Asia/Taipei).
Project: Antons Blocked Drains Lower North Shore.
Reference: Hills District project, left unchanged. No commit, repository creation or deployment performed.

## Delivered
36 HTML pages: homepage, eight service pages, twenty locality pages, service and locality hubs, About, Contact, Privacy, Terms and 404. Also sitemap.xml and environment-controlled robots.txt.
120 locality FAQs, service-specific FAQs, contextual links and neighbouring locality navigation. Real source photographs, locally bundled fonts, responsive WebP images and one coherent JSON-LD graph per page.
The full route list is in the generated sitemap and src/data/areas.json / site.ts.

## Build and security
- Final lockfile npm ci: passed; 367 packages installed, zero reported vulnerabilities.
- Astro 7.4.0 static output, sharp 0.35.5. Security exception to Astro 5 documented in docs/architecture-decision.md.
- Astro check: zero errors, warnings or hints on the tested implementation.
- Production-like build: passed all metadata, H1, canonical, hreflang, sitemap, JSON-LD, visible FAQ, internal-link, image and content checks.
- 35 canonical sitemap pages reachable; at least three contextual incoming pages per commercial route.
- Twenty unique locality introductions, six visible FAQs per locality, no prohibited operator name, inherited region names, invented experience duration or em dash in output.
- Impeccable mechanical detector: no findings.
- Mobile homepage image candidates: 360px = 28,738 bytes; 480px = 43,082 bytes; 672px = 70,188 bytes. All below 100 KB.
- No external client JavaScript asset; only small inline menu behaviour. No analytics or third-party runtime scripts.
- Local build is restored to noindex,nofollow with robots Disallow: / before handoff.

## Browser verification
Eight page types at 320, 375, 768, 1024 and 1440px; 16 desktop/mobile screenshots.
No horizontal overflow, broken images or axe WCAG 2/2.1/2.2 A/AA findings on tested surfaces. Menu opening/closing, Escape, native FAQs, keyboard focus and phone href verified.
Local observed menu/FAQ event durations: 24–72 ms. These are local interaction samples, not a field INP result.
Screenshots inspected for homepage, hubs, CCTV service, McMahons Point locality, About, Contact and 404. Long headings wrap without clipping, panels retain readable contrast, fixed-call space remains available at the page end.
The explicit static /404/ resource returns 200 in Astro preview. A genuinely missing URL returns HTTP 404 with the custom content. The original automated expectation was corrected and independently checked; see qa/http-results.json.

## Final mobile Lighthouse
Local production-like static build, indexing enabled temporarily for the SEO test. Mobile simulation; these are lab results, not deployed-host or field measurements.

| Page | Performance | Accessibility | SEO | LCP | FCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| home | 99 | 100 | 100 | 1.97 s | 1.07 s | 0.0000 | 50 ms |
| service | 99 | 100 | 100 | 1.82 s | 1.07 s | 0.0009 | 0 ms |
| locality | 98 | 100 | 100 | 2.27 s | 1.07 s | 0.0009 | 61 ms |

Best practices: 100 on all three. Remaining suggestions concern small image savings, font/network dependency chains and potential main-thread delay under simulation. Measured LCP, FCP and CLS meet the brief's lab targets. INP must be checked with real interactions after deployment.

## Evidence
qa/lighthouse-summary.json and individual JSON reports; qa/responsive-results.json; qa/http-results.json; qa/build-final.log; qa/*-375.png and qa/*-1440.png.
docs/asset-inventory.json, asset-provenance.md and local-reference-sources.md record assets and public orientation references.

## Launch-only outstanding items
- GitHub repository and Cloudflare Worker name have not been supplied. wrangler.jsonc retains the obvious deployment-only name placeholder; replace before committing or deploying.
- No public-content placeholders remain.
- Cloudflare Git integration, production environment, domain binding, DNS, TLS, canonical redirects and deployed cache headers are not configured or verified.
- Validate representative graphs with Schema.org Validator and Google Rich Results on deployment; local checks establish syntax and graph consistency, not eligibility.
- Repeat PageSpeed/Lighthouse on the real host and collect field INP.
- Review provider privacy/business practices against the published policy before launch.

Production deployment URL: none. Intended production domain: https://blockeddrainslowernorthshore.com.au/.
Local preview: http://127.0.0.1:4323/.

## Photo refresh, 19 October 2026

Imported twelve supplied photos as responsive WebP assets. All twenty suburb pages now use different hero photographs; six service heroes plus Contact and the About gallery were refreshed. Portrait images use bounded hero containers and explicit focal points.

Validation: full production build and all included static checks passed. Sixty browser checks covered twenty suburb pages, eight services, About and Contact at 375px and 1440px: no failed responses, broken hero images or horizontal overflow. Desktop and mobile crop contact sheets were visually inspected (`qa/photo-refresh-375.png`, `qa/photo-refresh-1440.png`). Lighthouse numbers above belong to the earlier build and were not rerun for this photo-only refresh. Changes remain local, with indexing disabled.

## Naremburn underground explorer

Added a standalone cutaway with four selectable drainage explanations and supplied job photography. Hover previews, click/tap pins, Escape unpins, and keyboard focus/Enter support exploration. A low-section diagram distinguishes illustrative deposits from real job photography. Access planning now follows as a separate section. Other locality pages keep their existing content.

Initial browser checks at 375, 1024 and 1440 pixels passed keyboard, pinning, touch, reduced-motion and scoped axe WCAG A/AA checks with no horizontal overflow. A final layout refinement reserves the tallest explanation to prevent topic-switch height changes. QA script: scripts/check-underground.mjs; evidence: qa/underground-results.json and matching screenshots.

## Homepage interactive cause guide

Replaced the static cause register with four selectable pipe diagrams for roots, grease/residue, wipes/objects and broken pipework. Each has supplied photography, a cause explanation, the professional approach, why assessment matters and a working service link. Hover/focus previews and click/tap selects; inactive panels are inert and hidden from assistive technology. Without JavaScript the explanations remain readable in sequence.

Full build and static checks passed. Browser checks at 375, 768 and 1440 pixels passed hover, keyboard, touch, service-link responses, reduced motion and scoped axe WCAG A/AA checks. No horizontal overflow; panel height remains identical across all four causes at each tested width. Screenshots were visually reviewed. Evidence: qa/home-causes-results.json and qa/home-causes-*.png. Local preview only.


## 20 October 2026: Content and Expertise Sections

- `npm run build` passes: Astro reports no errors, warnings or hints; all 36 pages build. Site, internal-link, performance and content checks pass.
- Verified new inspection/aftercare sections on all eight service detail pages and planning/evidence sections on all twenty locality pages, including their in-page navigation destinations.
- Responsive browser check passes across eight representative routes at 320, 375, 768, 1024 and 1440px, with no overflow or failed image decodes. Desktop/mobile axe checks report no violations. The check now explicitly decodes hidden lazy images in explorer panels before judging image availability.
- Both interactive guides pass keyboard, touch, reduced-motion, stable-panel-height and accessibility checks at their three tested widths.
- Visually reviewed the new photo essay, property guide and work standards layouts at 375 and 1440px. Existing phone contact and FAQ interactions remain functional.
- Local preview builds retain noindex defaults. Production indexing was enabled separately in Cloudflare with user approval; the live 35-page sitemap and index/follow metadata were verified before this release. This revision is approved for GitHub commit and production deployment.
