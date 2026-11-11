export function matchesArticle(article, query, category) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return (category === '全部' || article.category === category) && words.every(word => article.text.toLocaleLowerCase().includes(word));
}
