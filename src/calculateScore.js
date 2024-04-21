export default function calculateScore(
  time,
  guesses,
  wordLength,
  allowDuplicates
) {
  const timeScore = 10000 / time;
  const guessesScore = 100 - guesses * 5;
  const lengthScore = wordLength * 10;
  const duplicateScore = allowDuplicates ? 0 : 50;

  const totalScore = timeScore + guessesScore + lengthScore - duplicateScore;

  return totalScore;
}
