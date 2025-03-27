import { useState } from "react";
import "./Play.css";

function Play() {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [count, setCount] = useState(7);
  const [right, setRight] = useState(0);
  const [sum, setSum] = useState(0);
  const [avg, setAvg] = useState(0);
  const [backgroundClass, setBackgroundClass] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const generate = () => {
    const newNumber1 = Math.floor(Math.random() * 7) + 1;
    const newNumber2 = Math.floor(Math.random() * 7) + 1;

    setNumber1(newNumber1);
    setNumber2(newNumber2);
    setFlipped(true);
    setTimeout(() => setFlipped(false), 1200);
    setCount(prevCount => prevCount - 1);

    if (newNumber1 === newNumber2) {
        setRight(right+1);
        setSum(sum+newNumber1);
        
      setBackgroundClass("correct-body"); // Set background to green
    } else {
      setBackgroundClass("incorrect-body"); // Set background to red
    }

    // Reset background after a short delay
    setTimeout(() => setBackgroundClass(""), 1000);

    // Check if game is over
    if (count - 1 === 0) {
      setIsGameOver(true);

      // ✅ Calculate avg as sum + right
      setAvg( sum + right);
    }
  };

  const resetGame = () => {
    setNumber1(0);
    setNumber2(0);
    setFlipped(false);
    setCount(7);
    setRight(0);
    setSum(0);
    setAvg(0); // ✅ Reset avg properly
    setBackgroundClass("");
    setIsGameOver(false);
  };

  function getOrdinalSuffix(num) {
    if (num === 0) return "Do not get married";
    if (num === 1) return `${num}st`;
    if (num === 2) return `${num}nd`;
    if (num === 3) return `${num}rd`;
    return `${num}th`;
  }

  return (
    <div className={`container ${backgroundClass}`}>
      <h1>Flip & Guess</h1>
      <div className="stats">
        <h2 className="first">Chances: <span >{count}</span></h2>
        <h2 className="second">Matched: <span>{right}</span></h2>
      </div>
      <div className="cards">
        <div className={`card ${flipped ? "flipped" : ""} ${number1 === number2 ? "match" : "no-match"}`}>
          <div className="front">?</div>
          <div className="back">{number1}</div>
        </div>
        <div className={`card ${flipped ? "flipped" : ""} ${number1 === number2 ? "match" : "no-match"}`}>
          <div className="front">?</div>
          <div className="back">{number2}</div>
        </div>
      </div>
      <button onClick={generate} disabled={isGameOver}>Flip Cards</button>

      {isGameOver && (
        <div className="modal">
          <div className="modal-content">
            <h2>Game Over</h2>
            <p>
              {right === 0 
                ? "Do not get married 😅" 
                : `Your partner is born on ${getOrdinalSuffix(avg)}!`}
            </p>
            <button onClick={resetGame}>🔄 Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Play;
