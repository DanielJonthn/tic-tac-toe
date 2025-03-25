import { Link } from "react-router-dom";
import { useState } from "react";

const HomePage = () => {
  const [gameMode, setGameMode] = useState<"pvp" | "pvc">("pvp");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );

  return (
    <div className="home-container">
      <h1>Tic Tac Toe</h1>

      <div className="game-mode-selector">
        <h2>Game Mode</h2>
        <div className="mode-buttons">
          <button
            className={
              gameMode === "pvp" ? "mode-button active" : "mode-button"
            }
            onClick={() => setGameMode("pvp")}
          >
            Player vs Player
          </button>
          <button
            className={
              gameMode === "pvc" ? "mode-button active" : "mode-button"
            }
            onClick={() => setGameMode("pvc")}
          >
            Player vs Computer
          </button>
        </div>

        {gameMode === "pvc" && (
          <div className="difficulty-selector">
            <h3>Difficulty</h3>
            <div className="difficulty-buttons">
              <button
                className={
                  difficulty === "easy"
                    ? "difficulty-button active"
                    : "difficulty-button"
                }
                onClick={() => setDifficulty("easy")}
              >
                Easy
              </button>
              <button
                className={
                  difficulty === "medium"
                    ? "difficulty-button active"
                    : "difficulty-button"
                }
                onClick={() => setDifficulty("medium")}
              >
                Medium
              </button>
              <button
                className={
                  difficulty === "hard"
                    ? "difficulty-button active"
                    : "difficulty-button"
                }
                onClick={() => setDifficulty("hard")}
              >
                Hard
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="game-options-home">
        <Link
          to={`/classic?mode=${gameMode}${
            gameMode === "pvc" ? `&difficulty=${difficulty}` : ""
          }`}
          className="game-option-home"
        >
          <h2>Classic Tic Tac Toe</h2>
          <p>The traditional 3x3 game you know and love.</p>
        </Link>
        <Link
          to={`/enhanced?mode=${gameMode}${
            gameMode === "pvc" ? `&difficulty=${difficulty}` : ""
          }`}
          className="game-option-home"
        >
          <h2>Tic Tac Toe 2</h2>
          <p>
            A new twist: Only 2 marks per player. Each new move removes your
            oldest mark!
          </p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
