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
    <div className='game-play'>
      <div className='game-play-content'>
        <div className='guess-list'>
          <h1>Your Guesses:</h1>
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
        <div className='div-form'>
          <form className='guess-form' onSubmit={handleSubmit}>
            <input
              type='text'
              value={input}
              onChange={handleChange}
              placeholder='Enter your guess here'
            />
            <button type='submit'>Guess</button>
          </form>
        </div>
      </div>
    </div>
  );
}
