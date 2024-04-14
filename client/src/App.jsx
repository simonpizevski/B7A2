import { useState, useEffect } from 'react';
import './App.css';
import GameSetup from './components/GameSetup';
import GamePlay from './components/GamePlay';
import GameEnd from './components/GameEnd';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gameOutcome, setGameOutcome] = useState('');
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [selectedLength, setSelectedLength] = useState(5);
  const [uniqueLettersCount, setUniqueLettersCount] = useState(0);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleEndGame = (
    outcome,
    time,
    playerScore,
    guessList,
    wordLength,
    lettersCount
  ) => {
    setGameStarted(false);
    setGameOutcome(outcome);
    setGameTime(time);
    setScore(playerScore);
    setShowModal(true);
    setGuesses(guessList);
    setSelectedLength(wordLength);
    setUniqueLettersCount(lettersCount);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTryAgain = () => {
    setShowModal(false);
    setGameStarted(true);
  };

  const handleSaveHighscore = async (
    name,
    score,
    time,
    guesses,
    selectedLength,
    uniqueLettersCount
  ) => {
    try {
      const response = await fetch('/api/highscore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          score,
          time,
          guesses,
          selectedLength,
          uniqueLettersCount,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save highscore');
      }
      console.log('highscore saved');
    } catch (error) {
      console.error('Error saving highscore', error);
      return;
    }
    setShowModal(false);
  };

  return (
    <div className='App'>
      {!gameStarted ? (
        <GameSetup onStartGame={handleStartGame} />
      ) : (
        <GamePlay
          onEndGame={handleEndGame}
          playerName={playerName}
          setPlayerName={setPlayerName}
        />
      )}
      <GameEnd
        show={showModal}
        gameOutcome={gameOutcome}
        onClose={handleCloseModal}
        score={score}
        gameTime={gameTime}
        playerName={playerName}
        handleTryAgain={handleTryAgain}
        setPlayerName={setPlayerName}
        handleSaveHighscore={handleSaveHighscore}
        guesses={guesses}
        selectedLength={selectedLength}
        uniqueLettersCount={uniqueLettersCount}
      />
    </div>
  );
}

export default App;
