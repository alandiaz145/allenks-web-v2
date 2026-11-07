import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
const branch='redesign/the-sound-review-20261107';
const base=`https://raw.githack.com/alandiaz145/allenks-web-v2/${branch}`;
for(const route of ['', 'musica/', 'proyectos/', 'tienda/']) {
 let html=readFileSync(`out/${route}index.html`,'utf8');
 html=html.replace(/\b(href|src)="\/(?!\/)([^"]*)"/g,(_,attr,path)=>{
  if(path.startsWith('assets/'))return `${attr}="${base}/preview-build/${path}"`;
  const [pathname,hash]=path.split('#');
  return `${attr}="${base}/preview-online/${pathname}index.html${hash?'#'+hash:''}"`;
 });
 html=html.replace('</head>','<meta name="robots" content="noindex,nofollow"></head>');
 const dir=`preview-online/${route}`;mkdirSync(dir,{recursive:true});writeFileSync(dir+'index.html',html);
}
console.log(`${base}/preview-online/index.html`);
