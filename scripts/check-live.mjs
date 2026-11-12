import {readFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const base=new URL(process.argv[2] || 'https://juncheng0909.github.io/w9/');
if(!base.pathname.endsWith('/'))throw Error('網站網址須以 / 結尾');
async function files(dir){
  const entries=await readdir(dir,{withFileTypes:true});
  const nested=await Promise.all(entries.filter(e=>!e.name.startsWith('.')).map(e=>e.isDirectory()?files(path.join(dir,e.name)):path.join(dir,e.name)));
  return nested.flat();
}
let failures=0;
for(const file of await files(root)){
  const relative=path.relative(root,file).split(path.sep).join('/');
  const response=await fetch(new URL(relative,base),{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(25000)});
  const live=Buffer.from(await response.arrayBuffer());
  const same=response.status===200 && live.equals(await readFile(file));
  console.log(`${same?'PASS':'FAIL'} ${response.status} ${relative} — ${same?'matches local build':'response differs from local build'}`);
  if(!same)failures++;
}
if(failures)process.exitCode=1;
