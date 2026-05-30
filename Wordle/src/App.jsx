import { useState } from 'react'
import './App.css'

const MAX_GUESSES = 5


export default function App() {
  const [word, setWord] = useState("")
  const [guesses, setGuesses] = useState([])
  const [message, setMessage] = useState("")
  const [target, setTarget] = useState("")
  const [gameStarted, setGameStarted] = useState(false)
  const [isWin, setIsWin] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  

  let start;
  let startButton;

  if(!gameStarted){
    start = <label>Enter Word to be Guessed: </label>
    startButton = <button onClick={initializeGame}>Start Game</button>
  }
  else{
    start = <label>Guess Word: </label>;
    startButton = <button onClick={handleSubmit} disabled={buttonDisabled}>Submit</button>;
  }

  function handleInputChange(e) {
    setWord(e.target.value);
  }

  function initializeGame() {
    setTarget(word);
    setWord("");
    setMessage("");
    setGameStarted(true);
  }
  function handleSubmit() {
    if (guesses.includes(word)) {
      setMessage("You already guessed that word!");
      return;
    }
    if(target.toUpperCase().includes(word.toUpperCase()) && word.toUpperCase() === target.toUpperCase()) {
      setMessage("Congratulations! You guessed the word!");
      setIsWin(1);
      setGuesses([...guesses, word]);
      setButtonDisabled(true);
      return;
    }
    if (word.length > target.length) {
      setMessage(`The word you entered is longer than ${target.length} characters!`);
        return;
    }
    if (word.length < target.length) {
      setMessage(`The word you entered is shorter than ${target.length} characters!`);
        return;
    }

    
    setGuesses([...guesses, word]);
    setWord("");
    setMessage("");
    console.log(guesses.length);

    if(guesses.length >= MAX_GUESSES - 1) {
      setMessage("Game over! No more guesses allowed.");
      setIsWin(2);
      setButtonDisabled(true);
      return;
    }
    
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

  function colorGuesses(letter, colIndex, rowIndex) {
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
  }

  function displayGuesses(word, rowIndex) {
    return(
        <div key={rowIndex} style={{ display: 'flex', gap: '8px' }}>
          
          {/* Split the word into an array of letters and map over them */}
          {word.split('').map(colorGuesses)}
        </div>
    );
  }
  return (
    <>
      <div>
        <h1>Wordle</h1>
        <div className="guesses-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      
          {guesses.map(displayGuesses)}
      
        </div>
      </div>
      <div>
        {start}
        <input type="text" onChange={handleInputChange} value={word} />
        {startButton}
        <hr></hr>
        <label style={{ color: isWin == 1 ? '#538d4e' : '#e06666' }}>{message}</label>
      </div>
    </>
  )
}
