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
    <div className='div-start'>
      <div className='rules'>
        <h2>Rules</h2>
        <p>You have 5 guesses before game over</p>
        <p>Submit your guess in the input area</p>
        <p>
          <span className='green'>G</span>reen letter means correct letter
        </p>
        <p>
          <span className='yellow'>Y</span>ellow letter means misplaced letter
        </p>
        <p>
          <span className='red'>R</span>ed letter means incorrect letter
        </p>
      </div>
      <div className='game-start'>
        <label>
          Choose length of word
          <select onChange={(e) => setWordLength(parseInt(e.target.value))}>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
          </select>
        </label>

        <label>
          Allow duplicate letters
          <input
            type='checkbox'
            onChange={(e) => setAllowDuplicates(e.target.checked)}
          />
        </label>

        <button onClick={handleStart}>Start Game</button>
      </div>
    </div>
  );
}
