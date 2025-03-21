import "../styles/ticTacToe.css";
import Board from "../components/Board";
import { useState } from "react";
import { Board as BoardType, Player } from "../types/game";
import { Link } from "react-router-dom";

const TicTacToe = () => {
  const [history, setHistory] = useState<{ squares: BoardType }[]>([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculateWinner = (squares: BoardType): Player | "draw" => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    if (squares.every((square) => square !== null)) {
      return "draw";
    }

    return null;
  };

  const handleClick = (index: number) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[index]) {
      return;
    }

    squares[index] = xIsNext ? "X" : "O";

    setHistory([...currentHistory, { squares }]);
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner === "draw") {
    status = "Game ended in a draw!";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  return (
    <div className="page-container">
      <div className="game-options">
        <Link to="/classic" className="game1-option-classic selected">
          <h2>Classic Tic Tac Toe</h2>
          <p>The traditional 3x3 game you know and love.</p>
        </Link>
        <Link to="/enhanced" className="game1-option-enhanced">
          <h2>Tic Tac Toe 2</h2>
          <p>
            A new twist: Only 2 marks per player. Each new move removes your
            oldest mark!
          </p>
        </Link>
      </div>

      <div className="game-container">
        <Link to="/">
          <h1 className="game-title">Classic Tic Tac Toe</h1>
        </Link>

        <div className="game-content">
          <div className="game-main">
            <div className="status">{status}</div>

            <div className="game-board">
              <Board squares={current.squares} onCellClick={handleClick} />
            </div>

            <button className="reset-button" onClick={resetGame}>
              Reset Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
