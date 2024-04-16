import { useState } from 'react';
import React from 'react';

export default function GameLoss({ onReset }) {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>You lost. Feel free to try again</h2>
        <button onClick={onReset}>Try Again</button>
      </div>
    </div>
  );
}
