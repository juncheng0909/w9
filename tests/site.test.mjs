import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import {matchesArticle} from '../assets/js/search.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const articles=JSON.parse(await readFile(path.join(root,'content/articles.json'),'utf8'));
const pages=['index.html',...articles.map(a=>`pages/${a.slug}.html`)];

test('all pages have accessible structure, descriptions and working local links including fragments',async()=>{
  for(const page of pages){
    const filename=path.join(root,'dist',page);
    const html=await readFile(filename,'utf8');
    assert.match(html,/<html lang="zh-Hant">/);assert.match(html,/name="viewport"/);assert.match(html,/name="description"/);
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length,1,page);
    assert.match(html,/href="#main"/);
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(ids).size,ids.length,`duplicate id in ${page}`);
    for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
      if (/^(https?:|mailto:|data:)/.test(url)) continue;
      assert.ok(!url.startsWith('/'),`absolute path breaks repository hosting: ${url}`);
      const [relative,fragment]=url.split('#');
      const target=relative?path.resolve(path.dirname(filename),relative.split('?')[0]):filename;
      assert.ok((await stat(target)).isFile(),`${page} → ${url}`);
      if(fragment){const content=await readFile(target,'utf8');assert.ok(content.includes(`id="${fragment}"`),`${page}: missing ${fragment}`);}
    }
  }
});
test('article schema, exercises, source and rendered pages agree',async()=>{
  const actual=(await readdir(path.join(root,'dist/pages'))).sort();
  const expected=articles.map(a=>`${a.slug}.html`).sort();
  assert.deepEqual(actual,expected,'outdated article files should not remain after build');
  const index=await readFile(path.join(root,'dist/index.html'),'utf8');
  assert.equal(new Set(articles.map(a=>a.number)).size,articles.length);
  for(const a of articles){
    const html=await readFile(path.join(root,`dist/pages/${a.slug}.html`),'utf8');
    assert.ok(a.sections.length>=4);assert.equal(a.sections.at(-1).id,'practice');
    assert.ok(a.glyph && index.includes(`class="card-glyph" aria-hidden="true">${a.glyph}</div>`),'article has a glyph in the homepage card');
    assert.match(a.sections.at(-1).html,/<details>/);assert.match(html,/aria-current="page"/);
    for(const s of a.sections){
      assert.ok(html.includes(`id="${s.id}"`));
      if(s.code) assert.ok(s.language && html.includes(`<div class="code-label">${s.language}</div>`), `code language label missing in ${a.slug}`);
    }
  }
});
test('search handles whitespace, mixed case, multiple terms, categories and empty results',()=>{
  const a={category:'資料結構',text:'Stack 堆疊 LIFO push pop 後進先出'};
  assert.ok(matchesArticle(a,'  sTaCk  ','全部'));
  assert.ok(matchesArticle(a,'堆疊 LIFO','資料結構'));
  assert.ok(matchesArticle(a,'','全部'));
  assert.ok(!matchesArticle(a,'stack queue','全部'));
  assert.ok(!matchesArticle(a,'stack','離散數學'));
  assert.ok(!matchesArticle(a,'不存在','全部'));
});
test('Stack example: LIFO and empty boundaries',()=>{
  const source=articles.find(a=>a.slug==='stack').sections.find(s=>s.id==='implementation').code;
  const result=vm.runInNewContext(`${source}\nconst s = new Stack(); const empty = s.pop(); s.push(1); s.push(2); [empty, s.peek(), s.pop(), s.pop(), s.size, s.peek()];`,{console:{log(){}}});
  assert.deepEqual(Array.from(result),[undefined,2,2,1,0,undefined]);
});
test('bracket example: nesting, mismatch, unmatched closing, empty, ordinary characters',()=>{
  const source=articles.find(a=>a.slug==='stack').sections.find(s=>s.id==='application').code;
  const result=vm.runInNewContext(`${source}\n['([]{})','([)]',')','(','','a+(b*c)'].map(isBalanced);`,{console:{log(){}}});
  assert.deepEqual(Array.from(result),[true,false,false,false,true,true]);
});
test('BST examples: insert, search, sorted traversal, empty tree and duplicate policy',()=>{
  const a=articles.find(a=>a.slug==='bst');
  const source=a.sections.find(s=>s.id==='search').code+'\n'+a.sections.find(s=>s.id==='traversal').code;
  const result=vm.runInNewContext(`${source}\nroot=insert(root,7);root=insert(root,7);[inorder(root),contains(root,7),contains(root,9),contains(null,1),inorder(null)];`,{console:{log(){}}});
  assert.deepEqual(JSON.parse(JSON.stringify(result)),[[1,3,6,7,8,10,14],true,false,false,[]]);
});
