import { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard';
import GuessForm from './components/GuessForm';
import ShowResult from './components/ShowResult';

function App() {
  return (
    <>
      <div>
      <h1>Welcome to my Wordle Game</h1>
      <p>I want you to guess the random word
        <br />Good luck!
      </p>
      <GameBoard />
      <GuessForm />
      <ShowResult />
    </div>
    </>
  )
}

export default App
