import { useState } from 'react';
import React from 'react';

export default function GamePlay({
  guesses,
  feedback,
  onGuess,
  onReset,
  wordLength,
  allowDuplicates,
}) {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGuess(input);
    setInput('');
  };
  return (
    <div>
      <div className='rules'>
        <h2>Rules</h2>
        <p>You have 10 guesses before game over</p>
        <p>Submit your guess in the input area</p>
        <p>
          <span className='green'>G</span>reen letter means correct letter
        </p>
        <p>
          <span className='red'>Y</span>ellow letter means misplaced letter
        </p>
        <p>
          <span className='red'>R</span>ed letter means incorrect letter
        </p>
      </div>
      <form className='guess-form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={input}
          onChange={handleChange}
          placeholder='Enter your guess here'
        />
        <button type='submit'>Guess</button>
      </form>
      <div className='guess-list'>
        <h2>Your Guesses:</h2>
        <ul>
          {guesses.map((guess, index) => (
            <li key={index}>
              {guess.guess &&
                guess.guess.split('').map((letter, i) => (
                  <span
                    key={i}
                    className={
                      guess.feedback[i].result === 'correct'
                        ? 'green'
                        : guess.feedback[i].result === 'misplaced'
                        ? 'yellow'
                        : 'red'
                    }
                  >
                    {letter}
                  </span>
                ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
