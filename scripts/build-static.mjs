import {cpSync,existsSync,mkdirSync,rmSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
await import('./render-public.mjs');
const root=process.cwd(), source=resolve(root,'preview-build'), out=resolve(root,'out');
if(!existsSync(source)) throw new Error('Missing preview-build source');
if(out!==resolve(root,'out')) throw new Error('Unsafe output path');
rmSync(out,{recursive:true,force:true});mkdirSync(out,{recursive:true});cpSync(source,out,{recursive:true});writeFileSync(resolve(out,'.nojekyll'),'');
console.log('Public static site built at out/');
