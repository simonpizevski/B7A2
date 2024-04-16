import { useState } from 'react';
import React from 'react';

export default function GameStart({ onStartGame }) {
  const [wordLength, setWordLength] = useState(4);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const handleStart = () => {
    onStartGame(wordLength, allowDuplicates);
    console.log(wordLength, allowDuplicates);
  };

  return (
    <div className='game-start'>
      <h2>Choose length of word</h2>
      <select onChange={(e) => setWordLength(parseInt(e.target.value))}>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
      </select>
      <label>
        Allow Duplicate Letters
        <input
          type='checkbox'
          onChange={(e) => setAllowDuplicates(e.target.checked)}
        />
      </label>
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
}
