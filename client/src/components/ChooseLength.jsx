import React from 'react';
import '../App.css';

function ChooseLength({ selectedLength, onLengthChange }) {
  const handleLength = (e) => {
    onLengthChange(parseInt(e.target.value));
  };

  return (
    <label>
      Please choose length of word:
      <select value={selectedLength} onChange={handleLength}>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select>
    </label>
  );
}

export default ChooseLength;
