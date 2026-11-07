import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync,existsSync,mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=process.cwd();
const routes=['/','/musica/','/proyectos/','/tienda/'];
const read=route=>readFileSync(join(root,'out',route,'index.html'),'utf8');
const pages=new Map(routes.map(r=>[r,read(r)]));
test('all public routes have valid local assets, navigation targets and anchors',()=>{
 for(const [route,html] of pages){
  assert.equal((html.match(/<h1\b/g)||[]).length,1,route);
  for(const [,attr,value] of html.matchAll(/\b(href|src)="([^"]*)"/g)){
   if(!value.startsWith('/')&&!value.startsWith('#'))continue;
   const u=new URL(value,'https://example.test'+route);
   const target=pages.get(u.pathname);
   if(target){if(u.hash)assert.ok(target.includes(`id="${decodeURIComponent(u.hash.slice(1))}"`),`${route}: ${value}`);}
   else assert.ok(existsSync(join(root,'out',u.pathname)),`${route}: ${attr}=${value}`);
  }
 }
});
test('public pages contain no eager embeds, autoplay parameters or private SoundCloud tokens',()=>{
 for(const [route,html] of pages){
  assert.doesNotMatch(html,/<iframe\b|autoplay=1|secret_token|codex-preview|raw\.githack/i,route);
  assert.match(html,/<link rel="canonical"/);assert.match(html,/og:image/);
 }
});
test('data edits update the featured title and publish only future confirmed shows',()=>{
 const dir=mkdtempSync(join(tmpdir(),'allenks-review-'));
 try{
  mkdirSync(join(dir,'content'));
  const data=JSON.parse(readFileSync('content/public.json','utf8'));
  data.releases[0].title='TEST <track> & "name"';
  data.shows=[
   {date:'2099-01-01T23:00:00-03:00',confirmed:true,venue:'Confirmed venue',city:'CABA'},
   {date:'2099-01-02T23:00:00-03:00',confirmed:false,venue:'Unconfirmed venue',city:'CABA'},
   {date:'2000-01-01T23:00:00-03:00',confirmed:true,venue:'Expired venue',city:'CABA'}
  ];
  writeFileSync(join(dir,'content/public.json'),JSON.stringify(data));
  writeFileSync(join(dir,'content/store.html'),readFileSync('content/store.html'));
  const result=spawnSync(process.execPath,[resolve('scripts/render-public.mjs')],{cwd:dir,encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);
  const html=readFileSync(join(dir,'preview-build/index.html'),'utf8');
  assert.match(html,/Confirmed venue/);assert.doesNotMatch(html,/Unconfirmed venue|Expired venue/);
  assert.match(html,/<strong>TEST &lt;track&gt; &amp; &quot;name&quot;<\/strong>/);
 }finally{rmSync(dir,{recursive:true,force:true});}
});
test('online preview keeps links and assets on the review branch and is not indexed',()=>{
 for(const route of routes){const html=readFileSync(join(root,'preview-online',route,'index.html'),'utf8');
  assert.match(html,/name="robots" content="noindex,nofollow"/);
  assert.doesNotMatch(html,/\b(?:href|src)="\//);
  assert.match(html,/redesign\/the-sound-review-20261107\/preview-build\/assets\/the-sound.css/);
  assert.match(html,/redesign\/the-sound-review-20261107\/preview-online\/index.html#lanzamientos/);
 }
});
