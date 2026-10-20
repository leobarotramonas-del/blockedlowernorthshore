# Deployment checklist and redirects
Status, 20 October 2026: source code is saved at https://github.com/leobarotramonas-del/blockedlowernorthshore on main. The user requested code storage only. Hosting, Worker name, DNS, TLS and build integration are not configured. The following is reference material for a future hosting request, not an active deployment plan.
The static assets config uses force-trailing-slash and 404-page handling; dist/404.html is Astro's custom error page. Verify missing URLs return HTTP 404 after deployment, rather than a 200 fallback.
At Cloudflare configure one canonical-host redirect for requests where the host is www.blockeddrainslowernorthshore.com.au or the scheme is HTTP. Target HTTPS non-www, preserve the original path, enable query-string preservation and use HTTP 301. Scope it to the two confirmed site hostnames; do not redirect unrelated domains.
Example expression for target URL: concat("https://blockeddrainslowernorthshore.com.au", http.request.uri.path). Preserve query string separately. Configure HTTPS/TLS before switching traffic.
Check /services/cctv-drain-inspections/?source=test on HTTP and www: final host must be canonical, path and query unchanged, no loops. Check slash-normalisation independently.
After launch verify TLS, robots, sitemap, canonical/hreflang, immutable /_astro/ caching, headers, 404 status, phone links and no accidental preview indexing.
Submit representative visible JSON-LD to Schema.org Validator and Google Rich Results testing after launch. Local graph checks do not establish rich-result eligibility; no rating schema is emitted.
Repeat mobile Lighthouse/PageSpeed on homepage, one service and one locality using the real host. INP needs real user interactions/field measurement and is not established by a Lighthouse TBT score.

Configuration references checked 19 October 2026:
- https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/
- https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/

Local Astro preview verifies a missing URL returns the custom page with HTTP 404. The explicit /404/ resource itself returns 200; this is not a soft-404 fallback for missing routes. Recheck actual missing URLs on Cloudflare after launch.

