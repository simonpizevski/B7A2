export default function algorithmA(guessedWord, correctWord) {
  const feedback = [];
  const correctlyGuessedLetters = [];
  const guessedWordArray = guessedWord.split('');
  const correctWordArray = correctWord.split('');

  for (let i = 0; i < correctWordArray.length; i++) {
    const correctLetter = correctWordArray[i];
    if (guessedWordArray[i] === correctLetter) {
      if (!correctlyGuessedLetters.includes(correctLetter)) {
        correctlyGuessedLetters.push(correctLetter);
      }
    }
  }

  for (let i = 0; i < correctWordArray.length; i++) {
    const correctLetter = correctWordArray[i];
    const guessedLetter = guessedWordArray[i];
    if (guessedLetter === correctLetter) {
      feedback.push({ letter: correctLetter, result: 'correct' });
    } else if (
      !correctlyGuessedLetters.includes(guessedLetter) &&
      correctWordArray.includes(guessedLetter)
    ) {
      feedback.push({ letter: guessedLetter, result: 'misplaced' });
    } else {
      feedback.push({ letter: guessedLetter, result: 'incorrect' });
    }
  }

  return feedback;
}
