import React, { useState } from 'react';
import ChooseLength from './ChooseLength';
import GuessInput from './GuessInput';
import GuessList from './GuessList';
import '../App.css';

export default function GamePlay({ onEndGame, playerName, setPlayerName }) {
  const [generatedWord, setGeneratedWord] = useState('');
  const [selectedLength, setSelectedLength] = useState(5);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const maxGuesses = 2;

  const handleLengthChange = (length) => {
    setSelectedLength(length);
  };

  const handleGenerateWord = async () => {
    try {
      const response = await fetch(`/api/randomWord/${selectedLength}`);
      if (!response.ok) {
        throw new Error('Failed to fetch word');
      }
      const data = await response.json();
      const cleanedWord = data.word.trim();
      setGeneratedWord(cleanedWord);
      setGuesses([]);
      setGameStarted(true);
      setStartTime(Date.now());
      console.log(cleanedWord);
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  };

  const handleGuessChange = (guess) => {
    setCurrentGuess(guess);
  };

  const handleGuessSubmit = () => {
    if (currentGuess.length === selectedLength) {
      fetch('/api/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guessedWord: currentGuess,
          correctWord: generatedWord,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const feedback = data.feedback;
          setGuesses([...guesses, { guess: currentGuess, feedback }]);
          setCurrentGuess('');
          checkGameStatus(feedback);
        })
        .catch((error) => console.error('Error', error));
    } else {
      alert('Invalid guess length');
    }
  };

  const checkGameStatus = (feedback) => {
    if (feedback.every((item) => item.result === 'correct')) {
      handleEndGame('win');
    }
    if (guesses.length + 1 === maxGuesses) {
      handleEndGame('loss');
    }
  };

  const handleEndGame = (outcome) => {
    setGameStarted(false);
    setGameEnded(true);
    const endTime = Date.now();
    const gameTime = Math.floor((endTime - startTime) / 1000);
    setShowModal(true);
    onEndGame(
      outcome,
      gameTime,
      calculateScore(gameTime),
      guesses,
      selectedLength,
      generatedWord.length
    );
  };

  const calculateScore = (gameTime) => {
    const guessesRemaining = maxGuesses - guesses.length;
    const timeScore = 100000 - gameTime;
    const guessScore = guessesRemaining * 100;
    return timeScore + guessScore;
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='game-div'>
      {!gameStarted && (
        <>
          <ChooseLength
            selectedLength={selectedLength}
            onLengthChange={handleLengthChange}
          />
          <button onClick={handleGenerateWord}>Generate Word</button>
        </>
      )}
      {gameStarted && (
        <>
          <GuessList guesses={guesses} />
          <GuessInput
            currentGuess={currentGuess}
            onGuessChange={handleGuessChange}
            onGuessSubmit={handleGuessSubmit}
          />
          <p>Guesses left: {maxGuesses - guesses.length}</p>
        </>
      )}
    </div>
  );
}
