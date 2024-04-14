import React from 'react';
import '../App.css';

export default function GameEnd({
  show,
  onClose,
  gameOutcome,
  score,
  gameTime,
  playerName,
  handleTryAgain,
  setPlayerName,
  handleSaveHighscore,
  guesses,
  selectedLength,
  uniqueLettersCount,
}) {
  if (!show) {
    return null;
  }

  const handleTryAgainClick = () => {
    handleTryAgain();
    setPlayerName('');
  };

  const saveHighscore = () => {
    if (playerName && gameTime) {
      handleSaveHighscore(
        playerName,
        score,
        gameTime,
        guesses,
        selectedLength,
        uniqueLettersCount
      );
      console.log(guesses);
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <h2>{gameOutcome === 'win' ? 'You Won!' : 'You lost.'}</h2>
        {gameOutcome === 'win' && (
          <>
            <p>Score: {score}</p>
            <p>Time: {gameTime} seconds</p>
            {guesses && guesses.length > 0 && (
              <p>Guesses: {guesses.map((guess) => guess.guess).join(', ')}</p>
            )}
            <p>Word Length: {selectedLength}</p>
            <p>Unique Letters: {uniqueLettersCount}</p>
            <input
              type='text'
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder='Enter your name (optional)'
            />
            <button onClick={saveHighscore}>Save Highscore</button>
          </>
        )}
        {gameOutcome === 'loss' && (
          <>
            <p>Better luck next time!</p>
            <button onClick={handleTryAgainClick}>Try Again</button>
          </>
        )}
      </div>
    </div>
  );
}
