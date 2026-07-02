// Inserts 200 new articles (IDs 127-326) from JSON files into App.jsx
// Run: node insert-articles.mjs

import { readFileSync, writeFileSync } from 'fs';

const CATEGORY_TO_TAGS = {
  'Indian History & Culture': ['Indian History & Culture'],
  'Australian History & Culture': ['Australian History & Culture'],
  'American History & Culture': ['American History & Culture'],
  'British History & Culture': ['British History & Culture'],
  'Sports': ['Sports'],
  'Languages': ['Languages'],
  'Technology & AI': ['Technology & AI'],
  'Technology': ['Technology & AI'],
  'Science': ['Science & Space'],
  'Space': ['Science & Space'],
  'History': ['World History'],
  'World History': ['World History'],
  'Economics': ['Economics & Money'],
  'Philosophy': ['Philosophy & Ideas'],
  'Psychology': ['Psychology & Mind'],
  'Geography': ['Geography & Earth'],
  'Environment': ['Nature & Environment'],
  'Nature': ['Nature & Environment'],
  'Nature & Environment': ['Nature & Environment'],
  'Current Affairs': ['Current Affairs'],
  'Music': ['Arts & Culture'],
  'Literature': ['Arts & Culture'],
  'Art & Culture': ['Arts & Culture'],
  'Arts & Culture': ['Arts & Culture'],
  'Architecture': ['Arts & Culture'],
  'Food & Nutrition': ['Food & Culture'],
  'Food & Culture': ['Food & Culture'],
};

function esc(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function articleToJS(a) {
  const tags = CATEGORY_TO_TAGS[a.category] || ['World History'];
  const tagsStr = JSON.stringify(tags);
  const quizStr = JSON.stringify(a.quiz, null, 0)
    .replace(/"/g, '"')
    .replace(/\\n/g, '\\n');

  return `  {id:${a.id},tags:${tagsStr},title:"${a.title.replace(/"/g,'\\"')}",category:"${a.category}",emoji:"${a.emoji}",image:"${a.image||'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80'}",readTime:${a.readTime},body:\`${esc(a.body)}\`,quiz:${quizStr}}`;
}

const articles1 = JSON.parse(readFileSync('C:/Users/katar/Downloads/new_100_articles_127_226.json', 'utf8'));
const articles2 = JSON.parse(readFileSync('C:/Users/katar/Downloads/third_100_articles_227_326.json', 'utf8'));
const allArticles = [...articles1, ...articles2];

console.log(`Loaded ${allArticles.length} articles (IDs ${allArticles[0].id}–${allArticles[allArticles.length-1].id})`);

const jsChunks = allArticles.map(articleToJS);
const insertText = '\n' + jsChunks.join(',\n') + '\n';

// Find the closing ]; of the ARTICLES array using bracket depth tracking
let content = readFileSync('src/App.jsx', 'utf8');
const marker = 'const ARTICLES = [';
const start = content.indexOf(marker);
if (start === -1) throw new Error('Could not find ARTICLES array');

let depth = 0;
let inStr = false;
let strChar = '';
let escape = false;
let closeIdx = -1;

for (let i = start + marker.length - 1; i < content.length; i++) {
  const ch = content[i];
  if (escape) { escape = false; continue; }
  if (ch === '\\' && inStr) { escape = true; continue; }
  if (inStr) {
    if (ch === strChar) inStr = false;
    continue;
  }
  if (ch === '"' || ch === "'" || ch === '`') { inStr = true; strChar = ch; continue; }
  if (ch === '[' || ch === '{' || ch === '(') depth++;
  if (ch === ']' || ch === '}' || ch === ')') {
    depth--;
    if (depth === 0) { closeIdx = i; break; }
  }
}

if (closeIdx === -1) throw new Error('Could not find closing ] of ARTICLES array');

// Insert before the closing ]
content = content.slice(0, closeIdx) + ',' + insertText + content.slice(closeIdx);

writeFileSync('src/App.jsx', content, 'utf8');
console.log(`Done! Inserted ${allArticles.length} articles before position ${closeIdx}`);
