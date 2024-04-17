import { useState } from 'react';
import React from 'react';

export default function GameWin({ time, guesses, onReset, onSaveHighscore }) {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSaveHighscore = async () => {
    await onSaveHighscore(name);
    onReset();
  };
  return (
    <div className='modal'>
      <div className='modal-content'>
        <h1>You Win</h1>
        <p>Time Played: {time} seconds</p>
        <p>{guesses} guesses</p>
        <input
          type='text'
          placeholder='Enter your name here'
          value={name}
          onChange={handleNameChange}
        />
        <button onClick={handleSaveHighscore}>Save Highscore</button>
        <button onClick={onReset}>Play Again</button>
      </div>
    </div>
  );
}
