import fs from 'node:fs/promises';
import sharp from 'sharp';
import {chromium} from 'playwright-core';
const areas=JSON.parse(await fs.readFile('src/data/areas.json'));
for(const slug of ['blocked-toilets','blocked-sinks-showers','sewer-drain-blockages','stormwater-drains','high-pressure-water-jetting','cctv-drain-inspections','tree-root-blockages','drain-repairs']) areas.push({slug,route:'/services/'+slug+'/'});
areas.push({slug:'contact',route:'/contact/'},{slug:'about',route:'/about/'});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const errors=[];const results=[];
for(const width of [375,1440]){
 const page=await browser.newPage({viewport:{width,height:1000}});
 const tiles=[];
 for(const [i,a] of areas.entries()){
  const route=a.route||'/service-areas/'+a.slug+'/';
  const response=await page.goto('http://127.0.0.1:4323'+route);
  await page.locator('.page-hero__media>img').evaluate(img=>img.decode());
  await page.evaluate(()=>document.fonts.ready);
  const info=await page.locator('.page-hero__media>img').evaluate(img=>({alt:img.alt,loaded:img.naturalWidth>0,source:img.currentSrc}));
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  if(response.status()!==200||!info.loaded||overflow)errors.push({route,width,info,overflow});
  const shot=await page.locator('.page-hero__media>img').screenshot();
  tiles.push({input:await sharp(shot).resize(200,180,{fit:'contain',background:'#eee'}).extend({bottom:25,background:'white'}).composite([{input:Buffer.from('<svg width="200" height="25"><text x="5" y="18" font-size="13">'+a.slug+'</text></svg>'),top:180,left:0}]).png().toBuffer(),left:i%5*200,top:Math.floor(i/5)*205});
  results.push({route,width,...info,overflow});
 }
 await sharp({create:{width:1000,height:Math.ceil(areas.length/5)*205,channels:3,background:'white'}}).composite(tiles).png().toFile('qa/photo-refresh-'+width+'.png');
 await page.close();
}
await browser.close();
await fs.writeFile('qa/photo-refresh-results.json',JSON.stringify({errors,results},null,2));
console.log(JSON.stringify({checks:results.length,errors}));
if(errors.length)process.exitCode=1;
