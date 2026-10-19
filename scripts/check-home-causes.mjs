import fs from 'node:fs/promises';
import {chromium} from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const results=[];
for(const width of [375,768,1440]){
 const context=await browser.newContext({viewport:{width,height:1000}});
 const page=await context.newPage();
 await page.goto('http://127.0.0.1:4323/');
 const section=page.locator('[data-cause-explorer]');
 await section.scrollIntoViewIfNeeded();
 await page.evaluate(()=>document.fonts.ready);
 const heights=[];
 for(const id of ['roots','grease','objects','damage']){
  const button=page.locator(`[data-cause="${id}"]`);
  await button.hover();
  if(!await page.locator(`[data-cause-panel="${id}"]`).isVisible())throw Error('Hover failed '+id);
  await button.focus();await page.keyboard.press('Enter');
  if(await button.getAttribute('aria-pressed')!=='true')throw Error('Keyboard failed '+id);
  await page.locator(`[data-cause-panel="${id}"] img`).evaluate(img=>img.decode());
  const link=page.locator(`[data-cause-panel="${id}"] a`);
  const response=await page.request.get('http://127.0.0.1:4323'+await link.getAttribute('href'));
  if(response.status()!==200)throw Error('Broken service link');
  heights.push((await page.locator('.cause-panels').boundingBox()).height);
 }
 await page.locator('[data-cause="roots"]').click();
 await page.waitForTimeout(200);
 await section.screenshot({path:`qa/home-causes-${width}.png`});
 const audit=await new AxeBuilder({page}).include('[data-cause-explorer]').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 results.push({width,heights,overflow,violations:audit.violations});
 await page.emulateMedia({reducedMotion:'reduce'});
 if(await page.locator('[data-current] .cause-explanation').evaluate(el=>getComputedStyle(el).animationName)!=='none')throw Error('Reduced-motion failure');
 await context.close();
}
const touch=await browser.newContext({viewport:{width:375,height:850},hasTouch:true,isMobile:true});
const page=await touch.newPage();await page.goto('http://127.0.0.1:4323/');
await page.locator('[data-cause="objects"]').tap();
if(!await page.locator('[data-cause-panel="objects"]').isVisible())throw Error('Touch failure');
await browser.close();
await fs.writeFile('qa/home-causes-results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));
if(results.some(r=>r.overflow||r.violations.length||new Set(r.heights).size>1))process.exitCode=1;
