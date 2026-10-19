import type { APIRoute } from 'astro';
export const GET: APIRoute = () => new Response(import.meta.env.PUBLIC_ALLOW_INDEXING === 'true' ? 'User-agent: *\nAllow: /\nSitemap: https://blockeddrainslowernorthshore.com.au/sitemap.xml\n' : 'User-agent: *\nDisallow: /\n', {headers:{'Content-Type':'text/plain; charset=utf-8'}});
