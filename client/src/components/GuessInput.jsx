import React from 'react';
import '../App.css';

export default function GuessInput({
  currentGuess,
  onGuessChange,
  onGuessSubmit,
}) {
  const handleInputChange = (e) => {
    onGuessChange(e.target.value);
  };

  const handleSubmit = () => {
    onGuessSubmit();
  };

  return (
    <label htmlFor='Guess'>
      <input
        type='text'
        id='Guess'
        name='Guess'
        value={currentGuess}
        onChange={handleInputChange}
        placeholder='Enter your guess...'
      />
      <button onClick={handleSubmit}>Guess</button>
    </label>
  );
}
