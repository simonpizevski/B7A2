import { useState, useEffect } from 'react';
import './App.css';
import GameStart from './components/GameStart';
import GamePlay from './components/GamePlay';
import GameWin from './components/GameWin';
import GameLoss from './components/GameLoss';

function App() {
  const [gameState, setGameState] = useState('start');
  const [maxGuesses, setMaxGuesses] = useState(2);
  const [wordLength, setWordLength] = useState(5);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [guessedWord, setGuessedWord] = useState('');
  const [correctWord, setCorrectWord] = useState('');

  const fetchRandomWord = async (length, allowDuplicates) => {
    try {
      const response = await fetch(
        `/api/randomWord/${length}/${allowDuplicates}`
      );
      if (!response.ok) {
        throw new Error('Response not ok.');
      }
      const data = await response.json();
      return data.word;
    } catch {
      return null;
    }
  };

  const handleGuess = async (guessedWord) => {
    if (gameState !== 'play' || gameResult) {
      return;
    }
    const guessLowerCase = guessedWord.toLowerCase();
    if (guessedWord.length === wordLength) {
      const response = await fetch('/api/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guessedWord: guessLowerCase,
          correctWord: correctWord,
        }),
      });
      const data = await response.json();
      setFeedback(data.feedback);
      setGuesses([...guesses, { guess: guessedWord, feedback: data.feedback }]);
      if (data.feedback.every((item) => item.result === 'correct')) {
        setGameResult('win');
      } else if (guesses.length + 1 === maxGuesses) {
        setGameResult('loss');
      }
    } else {
      alert('Invalid guess length');
    }
  };

  const handleSaveHighscore = (name, score) => {
    const gameTime = Math.floor((endTime - startTime) /1000);
    try {
      const response = await fetch('/api/highscore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          time: time,
          score: score,
          duplicateLetters: allowDuplicates,
          selectedLength: wordLength,
          guesses: guesses.length,
    
        }),

      });
      if (!response.ok) {
        throw new Error('Failed to save highscore');
      }
    } catch (error) {
      console.error('Error saving highscore', error);
    }
  }

  const startGame = async (length, allowDuplicates) => {
    setWordLength(length);
    setAllowDuplicates(allowDuplicates);
    const randomWord = await fetchRandomWord(length, allowDuplicates);
    console.log('Random word:', randomWord);
    if (randomWord) {
      setGameState('play');
      setCorrectWord(randomWord);
      setGuessedWord('');
      setFeedback([]);
      setGuesses([]);
    }
  };

  const resetGame = () => {
    setGameState('start');
    setWordLength(4);
    setGameResult(null);
    setGuesses([]);
    setFeedback([]);
    setGuessedWord([]);
    setMaxGuesses(2);
  };

  return (
    <div>
      {gameState === 'start' && <GameStart onStartGame={startGame} />}
      {gameState === 'play' && (
        <GamePlay
          guesses={guesses}
          onGuess={handleGuess}
          wordLength={wordLength}
          allowDuplicates={allowDuplicates}
        />
      )}
      {gameResult === 'win' && <GameWin onReset={resetGame} onSaveHighscore={handleSaveHighscore} time={Math.floor((endTime - startTime) / 1000)} score={score}/>}
      {gameResult === 'loss' && <GameLoss onReset={resetGame} />}
    </div>
  );
}

export default App;
