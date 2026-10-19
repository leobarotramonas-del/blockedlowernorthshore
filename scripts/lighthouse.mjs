import fs from 'node:fs/promises';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
const chrome=await launch({chromePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',chromeFlags:['--headless','--no-first-run']});
const results=[];
try{
 for(const [name,route] of [['home','/'],['service','/services/cctv-drain-inspections/'],['locality','/service-areas/mcmahons-point/']]){
  const report=await lighthouse('http://127.0.0.1:4323'+route,{port:chrome.port,output:'json',onlyCategories:['performance','accessibility','best-practices','seo'],formFactor:'mobile'});
  await fs.writeFile('qa/lighthouse-'+name+'.json',report.report);
  const l=report.lhr; results.push({page:name,scores:Object.fromEntries(Object.entries(l.categories).map(([k,v])=>[k,Math.round(v.score*100)])),lcp:l.audits['largest-contentful-paint'].numericValue,fcp:l.audits['first-contentful-paint'].numericValue,cls:l.audits['cumulative-layout-shift'].numericValue,tbt:l.audits['total-blocking-time'].numericValue,failures:Object.values(l.audits).filter(a=>a.score!==null&&a.score<.9).map(a=>({id:a.id,title:a.title,display:a.displayValue}))});
 }
}finally{chrome.kill();}
await fs.writeFile('qa/lighthouse-summary.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
