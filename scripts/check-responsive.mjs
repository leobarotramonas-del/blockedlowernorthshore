import fs from 'node:fs/promises';
import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
const base='http://127.0.0.1:4323';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
await fs.mkdir('qa',{recursive:true});
const routes=['/','/services/','/services/cctv-drain-inspections/','/service-areas/','/service-areas/mcmahons-point/','/about/','/contact/','/404/'];
const errors=[];const results=[];const interactions=[];
for(const width of [320,375,768,1024,1440]){
 const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1}); const page=await context.newPage(); await page.addInitScript(()=>{ window.__eventDurations=[];new PerformanceObserver(list=>{for(const e of list.getEntries())if(e.interactionId)window.__eventDurations.push(e.duration);}).observe({type:'event',buffered:true,durationThreshold:16}); });
 for(const route of routes){
  const response=await page.goto(base+route,{waitUntil:'networkidle'});
  if(response.status()!==200)errors.push(route+' unexpected status '+response.status());
  await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,15));}scrollTo(0,0);});
  await page.waitForTimeout(150);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  if(overflow)errors.push(route+' overflow at '+width);
  // Decode hidden lazy images too; inactive explorer panels intentionally defer loading.
  await page.locator('img').evaluateAll(imgs=>Promise.allSettled(imgs.map(img=>{img.loading='eager';return img.decode();})));
  const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));
  if(broken.length)errors.push(route+' broken images: '+broken.join(','));
  if([375,1440].includes(width)){
   const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
   const violations=audit.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));
   if(violations.length)errors.push(route+' axe '+width+': '+violations.map(v=>v.id).join(','));
   results.push({route,width,overflow,violations});
   const name=route==='/'?'home':route.replaceAll('/','-').replace(/^-|-$/g,'');
   await page.screenshot({path:'qa/'+name+'-'+width+'.png',fullPage:true});
  }
  if(width===375){
   const faq=page.locator('main details').first(); if(await faq.count()){await faq.locator('summary').click();if(!await faq.evaluate(e=>e.open))errors.push(route+' FAQ not open');}
   await page.locator('.mobile-menu summary').click();
   if(!await page.locator('.mobile-menu').evaluate(e=>e.open))errors.push(route+' menu not open');
   await page.keyboard.press('Escape');
   if(await page.locator('.mobile-menu').evaluate(e=>e.open))errors.push(route+' Escape failed');
   const phone=await page.locator('.mobile-call-bar').getAttribute('href');
   if(phone!=='tel:+61493824176')errors.push(route+' wrong phone');
   await page.keyboard.press('Tab');
   const focus=await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle);
   if(focus==='none')errors.push(route+' invisible keyboard focus');
   interactions.push({route,maxObservedEventDuration:await page.evaluate(()=>Math.max(0,...window.__eventDurations))});
  }
 }
 await context.close();
}
const missing=await fetch(base+'/missing-page-verification/');
if(missing.status!==404 || !/we cannot find that page\./i.test(await missing.text()))errors.push('Missing URL did not return the custom 404 response');
await browser.close();
await fs.writeFile('qa/responsive-results.json',JSON.stringify({results,interactions,errors},null,2));
console.log(JSON.stringify({viewports:5,routes:routes.length,captures:results.length,interactions,errors},null,2));
if(errors.length)process.exitCode=1;
