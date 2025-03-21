import "../styles/Home.css";
import { Link } from "react-router-dom";

const homepage = () => {
  return (
    <div className="home-container">
      <h1>Tic Tac Toe</h1>
      <div className="game-options-home">
        <Link to="/classic" className="game-option-home">
          <h2>Classic Tic Tac Toe</h2>
          <p>The traditional 3x3 game you know and love.</p>
        </Link>
        <Link to="/enhanced" className="game-option-home">
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

export default homepage;
