import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

mkdirSync('qa-artifacts', {recursive:true});
const browser = await chromium.launch({headless:true, args:['--no-sandbox']});
const failures = [];
const assertions = [];
const check = (name, ok, detail='') => {
  assertions.push({name, passed:!!ok, detail});
  if(!ok) failures.push(name+': '+detail);
};
const base='http://127.0.0.1:4173';
for(const [label,width,height] of [['mobile',390,844],['tablet',768,1024],['desktop',1440,900]]) {
  const page=await browser.newPage({viewport:{width,height}, deviceScaleFactor:1});
  page.on('pageerror',error=>failures.push(label+' runtime: '+error.message));
  await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  await page.locator('#player-dock-toggle').waitFor({timeout:20000});
  await page.waitForTimeout(300);
  let before=await page.evaluate(()=>({
    brand: getComputedStyle(document.querySelector('.site-header .brand')).visibility,
    hidden: document.querySelector('.player-wrap').classList.contains('is-offscreen'),
    audio: document.querySelector('#audio-engine')?.outerHTML
  }));
  check(label+' initial player hidden on hero',before.hidden);
  check(label+' header brand visible',before.brand==='visible',before.brand);
  await page.screenshot({path:'qa-artifacts/'+label+'-home.png'});
  await page.locator('#lanzamientos').scrollIntoViewIfNeeded();
  await page.waitForTimeout(450);
  let reveal=await page.evaluate(()=>!document.querySelector('.player-wrap').classList.contains('is-offscreen'));
  check(label+' player appears near releases',reveal);
  await page.locator('#player-dock-toggle').click();
  const inline=await page.evaluate(()=>document.querySelector('.player-wrap').classList.contains('is-inline'));
  check(label+' dock switches inline',inline);
  await page.locator('#player-dock-toggle').click();
  const floating=await page.evaluate(()=>({
    inline:document.querySelector('.player-wrap').classList.contains('is-inline'),
    parent:document.querySelector('.player-wrap').parentElement?.id,
    position:getComputedStyle(document.querySelector('.player-wrap')).position
  }));
  check(label+' undock returns to fixed root',!floating.inline&&floating.parent==='app'&&floating.position==='fixed',JSON.stringify(floating));
  await page.screenshot({path:'qa-artifacts/'+label+'-player.png'});
  await page.locator('.booking-cta').scrollIntoViewIfNeeded();
  await page.screenshot({path:'qa-artifacts/'+label+'-bookings.png'});
  if(label==='mobile') {
    const b=await page.evaluate(()=>{
      const c=document.querySelector('.booking-cta').getBoundingClientRect();
      const btn=document.querySelector('.booking-whatsapp').getBoundingClientRect();
      return {card:c.toJSON(),button:btn.toJSON(),buttonInside:btn.bottom<=c.bottom+2&&btn.left>=c.left-2};
    });
    check('mobile booking CTA inside card',b.buttonInside,JSON.stringify(b));
  }
  await page.locator('.site-footer').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const footer=await page.evaluate(()=>({
    pad:getComputedStyle(document.querySelector('.site-footer')).paddingBottom,
    visible:document.querySelector('.player-wrap').classList.contains('is-offscreen')
  }));
  check(label+' footer has no artificial padding',footer.pad==='0px',JSON.stringify(footer));
  await page.screenshot({path:'qa-artifacts/'+label+'-footer.png'});
  await page.goto(base+'/musica/',{waitUntil:'domcontentloaded'});
  await page.locator('#music-search-input').waitFor({timeout:20000});
  check(label+' remixes search available',await page.locator('#collab-search-input').count()===1);
  check(label+' latest releases absent from music',await page.locator('.inner-releases').count()===0);
  await page.screenshot({path:'qa-artifacts/'+label+'-music.png'});
  if(label==='desktop'){
    const volume=await page.evaluate(()=>({
      value:document.querySelector('#volume-range')?.value,
      visible:getComputedStyle(document.querySelector('.player-volume')).display
    }));
    check('desktop volume starts at 100%',volume.value==='1',JSON.stringify(volume));
    check('desktop volume slider visible',volume.visible!=='none',JSON.stringify(volume));
  }
  if(label==='mobile'||label==='tablet') {
    const hidden=await page.evaluate(()=>getComputedStyle(document.querySelector('.player-volume')).display==='none');
    check(label+' volume slider hidden',hidden);
  }
  await page.close();
}
await browser.close();
writeFileSync('qa-artifacts/results.json',JSON.stringify({assertions,failures},null,2));
console.log(JSON.stringify({assertions,failures},null,2));
if(failures.length)process.exitCode=1;
