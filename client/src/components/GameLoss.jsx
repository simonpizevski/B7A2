import { useState } from 'react';
import React from 'react';

export default function GameLoss({ onReset, correctWord }) {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <h1>You lost</h1>
        <p>The right word was: {correctWord}</p>
        <p>Feel free to try again</p>
        <button onClick={onReset}>Try Again</button>
      </div>
    </div>
  );
}
