import Board from "../components/Board";
import { useState, useEffect } from "react";
import {
  Board as BoardType,
  Player,
  Difficulty,
  GameMode,
} from "../types/game";
import { Link, useLocation } from "react-router-dom";
import { makeAIMove } from "../utils/aiPlayer";

const TicTacToe = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialMode = (searchParams.get("mode") as GameMode) || "pvp";
  const initialDifficulty =
    (searchParams.get("difficulty") as Difficulty) || "medium";

  const [history, setHistory] = useState<{ squares: BoardType }[]>([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [gameMode, setGameMode] = useState<GameMode>(initialMode);
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [isAIThinking, setIsAIThinking] = useState(false);

  const calculateWinner = (
    squares: BoardType
  ): { winner: Player | "draw"; line: number[] | null } | null => {
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

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line };
      }
    }

    if (squares.every((square) => square !== null)) {
      return { winner: "draw", line: null };
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (isAIThinking) return;

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

  useEffect(() => {
    if (
      gameMode === "pvc" &&
      !xIsNext &&
      !calculateWinner(history[stepNumber].squares) &&
      !isAIThinking
    ) {
      setIsAIThinking(true);

      const timeoutId = setTimeout(() => {
        const currentHistory = history.slice(0, stepNumber + 1);
        const current = currentHistory[currentHistory.length - 1];
        const squares = [...current.squares];

        const aiMove = makeAIMove(squares, "O", difficulty);
        if (aiMove !== -1) {
          squares[aiMove] = "O";

          setHistory([...currentHistory, { squares }]);
          setStepNumber(currentHistory.length);
          setXIsNext(true);
        }

        setIsAIThinking(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [gameMode, xIsNext, stepNumber, difficulty]);

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current.squares);
  const winner = winnerInfo?.winner || null;
  const winningLine = winnerInfo?.line || null;

  let status;
  if (winner === "draw") {
    status = "Game ended in a draw!";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else if (isAIThinking) {
    status = "Computer is thinking...";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const changeGameMode = (mode: GameMode) => {
    setGameMode(mode);
    resetGame();
  };

  const changeDifficulty = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
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

        <div className="game-mode-controls">
          <div className="mode-buttons">
            <button
              className={
                gameMode === "pvp" ? "mode-button active" : "mode-button"
              }
              onClick={() => changeGameMode("pvp")}
            >
              Player vs Player
            </button>
            <button
              className={
                gameMode === "pvc" ? "mode-button active" : "mode-button"
              }
              onClick={() => changeGameMode("pvc")}
            >
              Player vs Computer
            </button>
          </div>

          {gameMode === "pvc" && (
            <div className="difficulty-controls">
              <div className="difficulty-buttons">
                <button
                  className={
                    difficulty === "easy"
                      ? "difficulty-button active"
                      : "difficulty-button"
                  }
                  onClick={() => changeDifficulty("easy")}
                >
                  Easy
                </button>
                <button
                  className={
                    difficulty === "medium"
                      ? "difficulty-button active"
                      : "difficulty-button"
                  }
                  onClick={() => changeDifficulty("medium")}
                >
                  Medium
                </button>
                <button
                  className={
                    difficulty === "hard"
                      ? "difficulty-button active"
                      : "difficulty-button"
                  }
                  onClick={() => changeDifficulty("hard")}
                >
                  Hard
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="game-content">
          <div className="game-main">
            <div className="status">{status}</div>

            <div className="game-board">
              <Board
                squares={current.squares}
                onCellClick={handleClick}
                winningLine={winningLine}
              />
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
