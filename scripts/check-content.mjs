import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const titles=new Set(),descriptions=new Set();
for(const file of walk('dist').filter(f=>f.endsWith('.html'))){
 const html=fs.readFileSync(file,'utf8');
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];
 const description=html.match(/<meta name="description" content="([^"]*)"/)?.[1];
 assert(!titles.has(title),'Duplicate title '+file);titles.add(title);
 assert(!descriptions.has(description),'Duplicate description '+file);descriptions.add(description);
 assert(!/Antons Enterprises|Hills District|25\+|25 years|—|lorem ipsum|REPLACE_WITH/i.test(html),'Unapproved copy '+file);
 const preview=process.env.PUBLIC_ALLOW_INDEXING!=='true';
 if(preview)assert(html.includes('noindex,nofollow'),'Preview indexing '+file);
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)[1])['@graph'];
 const faq=graph.find(n=>n['@type']==='FAQPage');
 const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#39;',"'").replaceAll('&quot;','"').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
 if(faq){const visible=decode(html.replace(/<script[\s\S]*?<\/script>/g,'')); for(const q of faq.mainEntity){assert(visible.includes(decode(q.name)),'Invisible FAQ question '+file);assert(visible.includes(decode(q.acceptedAnswer.text)),'Invisible FAQ answer '+file);}}
 for(const tag of html.matchAll(/<img\b[^>]*>/g)){assert(/width=/.test(tag[0])&&/height=/.test(tag[0]),'Missing image dimensions '+file);}
}
const areas=JSON.parse(fs.readFileSync('src/data/areas.json','utf8'));
assert.equal(areas.length,20);assert.equal(new Set(areas.map(a=>a.intro)).size,20);
assert(areas.every(a=>a.faqs.length>=6&&a.faqs.length<=8));
console.log('Content checks: unique metadata, 20 distinct locality introductions, 120 visible locality FAQs, no prohibited copy, image dimensions and environment indexing rules passed.');
