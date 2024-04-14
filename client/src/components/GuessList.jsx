import React from 'react';
import '../App.css';

const GuessList = ({ guesses }) => {
  return (
    <div>
      <h2>Your Guesses:</h2>
      <ul>
        {guesses.map((guess, index) => (
          <li key={index}>
            {guess.guess.split('').map((letter, i) => (
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
  );
};

export default GuessList;
