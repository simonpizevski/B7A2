import { useState, useEffect } from 'react';
import './App.css';
import GameStart from './components/GameStart';
import GamePlay from './components/GamePlay';
import GameWin from './components/GameWin';
import GameLoss from './components/GameLoss';
import { set } from 'mongoose';

function App() {
  const [gameState, setGameState] = useState('start');
  const [maxGuesses, setMaxGuesses] = useState(5);
  const [wordLength, setWordLength] = useState(5);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [guessedWord, setGuessedWord] = useState('');
  const [guessedWords, setGuessedWords] = useState([]);
  const [correctWord, setCorrectWord] = useState('');
  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const [gameTime, setGameTime] = useState(0);

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

    if (guessedWords.includes(guessLowerCase)) {
      alert('You have already guessed that');
      return;
    }

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
      setGuessedWords([...guessedWords, guessLowerCase]);
      if (data.feedback.every((item) => item.result === 'correct')) {
        setGameResult('win');
        setEndTime(Date.now());
      } else if (guesses.length + 1 === maxGuesses) {
        setGameResult('loss');
        setEndTime(Date.now());
      }
    } else {
      alert('Invalid guess length');
    }
  };

  const handleSaveHighscore = async (name) => {
    try {
      const response = await fetch('/api/highscore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          time: gameTime,
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
  };

  useEffect(() => {
    if (startTime && endTime) {
      const time = endTime - startTime;
      console.log('Game time' + gameTime);
      setGameTime(Math.floor(time));
    }
  }, [startTime, endTime]);

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
      setStartTime(Date.now());
    }
  };

  const resetGame = () => {
    setGameState('start');
    setWordLength(4);
    setGameResult(null);
    setGuesses([]);
    setFeedback([]);
    setGuessedWord([]);
    setMaxGuesses(5);
    setStartTime(null);
    setEndTime(null);
    setGameTime(0);
    setGuessedWords([]);
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
      {gameResult === 'win' && (
        <GameWin
          onReset={resetGame}
          onSaveHighscore={handleSaveHighscore}
          time={Math.floor((endTime - startTime) / 1000)}
          guesses={guesses.length}
        />
      )}
      {gameResult === 'loss' && <GameLoss onReset={resetGame} />}
    </div>
  );
}

export default App;
