# Astro security exception
The brief requests Astro 5 static output unless there is a documented reason to change stack.
The inherited lockfile installed Astro 5.18.2. npm audit on 19 October 2026 reported critical/high Astro and image-processing advisories, including GHSA-26w7-cxv4-gfx2, with remediation requiring a major Astro upgrade. Compatible audit fixes alone left three affected packages.
This project therefore upgrades to patched Astro 7.4.0 and sharp 0.35.5, retaining static output, TypeScript, local fonts, responsive images, the data-driven routes and near-zero client JavaScript. There is no SSR or runtime image endpoint. The reference project is unchanged.
The exception is for security, not a visual or framework redesign. The upgraded project must pass install, image optimisation, type checking, full build and browser audits before delivery.
