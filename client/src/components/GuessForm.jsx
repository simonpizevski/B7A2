import React, { useState } from "react";

export default function GuessForm() {
    const [guess, setGuess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onsubmit={handleSubmit}>
            <input 
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess..." />
            <button type="submit">Submit Guess</button>
        </form>
    )
}