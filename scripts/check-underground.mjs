import fs from 'node:fs/promises';
import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const results=[];
for (const width of [375, 1024, 1440]) {
 const context=await browser.newContext({viewport:{width,height:1000}});
 const page=await context.newPage();
 await page.goto('http://127.0.0.1:4323/service-areas/naremburn/');
 const scene=page.locator('[data-explorer]');
 await scene.scrollIntoViewIfNeeded();
 await page.evaluate(()=>document.fonts.ready);
 const selected=async()=>page.locator('[data-detail]:visible').getAttribute('data-detail');
 const heights=[];
 for (const id of ['roots','joint','low','backup']) {
  await page.locator(`[data-topic="${id}"]`).focus();
  if(await selected()!==id)throw Error('Keyboard focus failed '+id);
  heights.push((await page.locator('.underground__layout').boundingBox()).height);
 }
 await page.locator('[data-topic="joint"]').click();
 await page.locator('[data-topic="low"]').hover();
 if(await selected()!=='joint')throw Error('Pinned topic changed on hover');
 await page.keyboard.press('Escape');
 await page.locator('[data-topic="low"]').focus();
 await page.keyboard.press('Enter');
 if(await selected()!=='low')throw Error('Keyboard selection failed');
 await page.locator('[data-unpin]').click();
 await page.locator('[data-topic="roots"]').focus();
 await page.locator('[data-detail="roots"] img').evaluate(img=>img.decode());
 await scene.screenshot({path:`qa/underground-${width}.png`});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 const axe=await new AxeBuilder({page}).include('[data-explorer]').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 results.push({width,overflow,heights,violations:axe.violations});
 await page.emulateMedia({reducedMotion:'reduce'});
 if(await page.locator('.flow-line').evaluate(el=>getComputedStyle(el).animationName)!=='none')throw Error('Reduced motion failed');
 await page.close();
}
const mobile=await browser.newPage({viewport:{width:375,height:850},hasTouch:true,isMobile:true});
await mobile.goto('http://127.0.0.1:4323/service-areas/naremburn/');
await mobile.locator('[data-topic="low"]').tap();
if(!await mobile.locator('[data-detail="low"]').isVisible())throw Error('Touch selection failed');
await browser.close();
await fs.writeFile('qa/underground-results.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results));
if(results.some(r=>r.overflow||r.violations.length))process.exitCode=1;
