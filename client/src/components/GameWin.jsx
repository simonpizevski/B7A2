import { useState } from 'react';
import React from 'react';

export default function GameWin({
  time,
  guesses,
  onReset,
  onSaveHighscore,
  highscoreSaved,
}) {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSaveHighscore = async () => {
    await onSaveHighscore(name);
  };
  return (
    <div className='modal'>
      <div className='modal-content'>
        <h1>You Win</h1>
        <p>Time Played: {time} seconds</p>
        <p>{guesses} guesses</p>
        <input
          type='text'
          placeholder='Enter your name'
          value={name}
          onChange={handleNameChange}
        />
        <button onClick={handleSaveHighscore} disabled={highscoreSaved}>
          Save Highscore
        </button>
        <p style={{ fontWeight: 700 }}>or</p>
        <button onClick={onReset}>Play Again</button>
      </div>
    </div>
  );
}
