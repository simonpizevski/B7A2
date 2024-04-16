import fs from 'fs';

export default function fetchRandomWord(length, allowDuplicates = false) {
  const words = fs.readFileSync('./src/words_alpha.txt', 'utf8').split('\n');
  let filteredWords = words.filter((word) => word.trim().length === length);

  if (!allowDuplicates) {
    filteredWords = filteredWords.filter((word) => !hasDuplicates(word));
  }
  if (filteredWords.length === 0) return null;
  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function hasDuplicates(word) {
  return new Set(word).size !== word.length;
}

console.log(fetchRandomWord(5));
