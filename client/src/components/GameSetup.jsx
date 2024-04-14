import React from 'react';
import '../App.css';

export default function GameSetup({ onStartGame }) {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Click the button to begin</p>
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
}
