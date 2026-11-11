import { matchesArticle } from './search.mjs';

const input = document.querySelector('#search');
if (input) {
  const cards = [...document.querySelectorAll('.topic-card')];
  const buttons = [...document.querySelectorAll('[data-filter]')];
  let category = '全部';
  document.querySelector('.search-tools').hidden = false;
  function update() {
    let count = 0;
    for (const card of cards) {
      const visible = matchesArticle({category:card.dataset.topic,text:card.dataset.search}, input.value, category);
      card.hidden = !visible;
      if (visible) count++;
    }
    document.querySelector('#result-count').textContent = `找到 ${count} 篇學習筆記`;
    document.querySelector('#empty-state').hidden = count !== 0;
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.filter === category));
  }
  input.addEventListener('input', update);
  buttons.forEach(button => button.addEventListener('click', () => {category = button.dataset.filter; update();}));
  document.querySelector('#reset-search').addEventListener('click', () => {input.value=''; category='全部'; update(); input.focus();});
}
