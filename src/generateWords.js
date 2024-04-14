import fs from 'fs';

export default function fetchRandomWord(length) {
  const words = fs.readFileSync('./src/words_alpha.txt', 'utf8').split('\n');
  const filteredWords = words.filter((word) => word.trim().length === length);
  if (filteredWords.length === 0) return null;
  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

console.log(fetchRandomWord(5));
