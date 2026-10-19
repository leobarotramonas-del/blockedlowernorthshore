import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const results=[];
for(const [route,expected] of [['/404/',200],['/missing-page-verification/',404]]){
 const response=await fetch('http://127.0.0.1:4323'+route);
 const customPage=(await response.text()).includes('We cannot find that page.');
 assert.equal(response.status,expected);assert(customPage);
 results.push({route,status:response.status,customPage});
}
await fs.writeFile('qa/http-results.json',JSON.stringify(results,null,2));
const browser=JSON.parse(await fs.readFile('qa/responsive-results.json','utf8'));
browser.errors=browser.errors.filter(e=>e!=='/404/ unexpected status 200');
browser.httpVerification=results;
browser.testCorrection='Explicit /404/ is a static resource (200). Missing URLs correctly return the custom page with 404. The original assertion expected 404 for the static resource; independently verified and corrected.';
await fs.writeFile('qa/responsive-results.json',JSON.stringify(browser,null,2));
console.log(JSON.stringify({http:results,remainingBrowserErrors:browser.errors},null,2));
