import { useState } from 'react'

const MAX_GUESSES = 5
const MAX_WORD_LENGTH = 5

export default function App() {
  const [word, setWord] = useState("")
  const [guesses, setGuesses] = useState([])
  const [message, setMessage] = useState("")
  const [target, setTarget] = useState("APPLE")

  function handleInputChange(e) {
    setWord(e.target.value)
  }

  function handleSubmit() {
    if (guesses.includes(word)) {
      setMessage("You already guessed that word!")
      return
    }
    if(target.toUpperCase().includes(word.toUpperCase()) && word.toUpperCase() === target.toUpperCase()) {
      setMessage("Congratulations! You guessed the word!")
      return
    }
    if (word.length != MAX_WORD_LENGTH) {
      setMessage(`Word must be ${MAX_WORD_LENGTH} letters long.`)
        return
    }
    if(guesses.length >= MAX_GUESSES) {
      setMessage("Game over! No more guesses allowed.")
      return
    }
    setGuesses([...guesses, word])
    setWord("")
    setMessage("")
  }

  function getBackgroundColor(letter, index) {
    const upperLetter = letter.toUpperCase();
    const upperTarget = target.toUpperCase();

    if (upperTarget[index] === upperLetter) {
      return '#538d4e'; // Green: Correct letter, correct spot
    } 
    if (upperTarget.includes(upperLetter)) {
      return '#b59f3b'; // Yellow: Correct letter, wrong spot
    } 
    
    return '#e06666'; // Red: Letter not in the word at all
  };
  
  function endGame() {
    setMessage(`Game over! The correct word was: ${target}`);
  }
  return (
    <>
      <div>
        <h1>Wordle</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      
      {guesses.map((word, rowIndex) => (
        // Each word forms a row
        <div key={rowIndex} style={{ display: 'flex', gap: '8px' }}>
          
          {/* Split the word into an array of letters and map over them */}
          {word.split('').map((letter, colIndex) => {
            const tileColor = getBackgroundColor(letter, colIndex);
            // Each letter forms a cell/column inside that row
            return (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #333',
                borderRadius: '4px',
                fontSize: '20px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                backgroundColor: tileColor,
                color: '#fff',
              }}
            >
              {letter}
            </div>
            );
          })}
        </div>
      ))}
      
    </div>
      </div>
      <div>
        
        <label>Enter your guess: </label>
        <input type="text" onChange={handleInputChange} value={word} />
        <button onClick={handleSubmit}>Submit</button>
        <hr></hr>
        <label style={{ color: 'red' }}>{message}</label>
      </div>
    </>
  )
}