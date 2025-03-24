import "../styles/board.css";
import React from "react";
import { Player } from "../types/game";

type CellProps = {
  value: Player;
  onCellClick: () => void;
  isWinningCell?: boolean;
};

const Cell: React.FC<CellProps> = ({ value, onCellClick, isWinningCell }) => {
  return (
    <button
      className={`cell ${isWinningCell ? "winning-cell" : ""}`}
      onClick={onCellClick}
    >
      {value}
    </button>
  );
};

export default Cell;
