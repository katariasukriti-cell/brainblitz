// Adds "diff" field to every quiz question in App.jsx based on position:
//   index 0 → "easy", index 1 → "medium", index 2+ → "hard"
// Run: node backfill-diff.mjs

import { readFileSync, writeFileSync } from 'fs';

const DIFFS = ['easy', 'medium', 'hard'];
let content = readFileSync('src/App.jsx', 'utf8');

let pos = 0;
const replacements = [];

// Match both "questions":[ and "questions": [ (with or without space)
function nextMarker(from) {
  const a = content.indexOf('"questions":[', from);
  const b = content.indexOf('"questions": [', from);
  if (a === -1 && b === -1) return { idx: -1, markerLen: 0 };
  if (a === -1) return { idx: b, markerLen: '"questions": ['.length };
  if (b === -1) return { idx: a, markerLen: '"questions":['.length };
  return a < b
    ? { idx: a, markerLen: '"questions":['.length }
    : { idx: b, markerLen: '"questions": ['.length };
}

while (true) {
  const { idx: start, markerLen } = nextMarker(pos);
  if (start === -1) break;

  // Track to the '[' of this array
  const arrayStart = start + markerLen - 1;
  let depth = 0, inStr = false, strChar = '', escape = false, arrayEnd = -1;

  for (let i = arrayStart; i < content.length; i++) {
    const ch = content[i];
    if (escape)          { escape = false; continue; }
    if (ch === '\\' && inStr) { escape = true; continue; }
    if (inStr)           { if (ch === strChar) inStr = false; continue; }
    if (ch === '"' || ch === "'") { inStr = true; strChar = ch; continue; }
    if (ch === '[' || ch === '{' || ch === '(') depth++;
    if (ch === ']' || ch === '}' || ch === ')') {
      depth--;
      if (depth === 0) { arrayEnd = i; break; }
    }
  }

  if (arrayEnd === -1) break;

  const arrayStr = content.slice(arrayStart, arrayEnd + 1);

  try {
    const questions = JSON.parse(arrayStr);
    // Only process arrays that look like quiz questions (have q/opts/ans fields)
    if (questions.length > 0 && questions[0].q && questions[0].opts && questions[0].ans !== undefined) {
      const enhanced = questions.map((q, i) => ({
        q: q.q,
        opts: q.opts,
        ans: q.ans,
        diff: DIFFS[Math.min(i, DIFFS.length - 1)],
      }));
      replacements.push({ start: arrayStart, end: arrayEnd + 1, replacement: JSON.stringify(enhanced) });
    }
  } catch (e) {
    // Skip unparseable blocks
  }

  pos = arrayEnd + 1;
}

// Apply in reverse so character positions stay valid
replacements.reverse().forEach(({ start, end, replacement }) => {
  content = content.slice(0, start) + replacement + content.slice(end);
});

writeFileSync('src/App.jsx', content, 'utf8');
console.log(`Done — added diff fields to ${replacements.length} question arrays.`);
