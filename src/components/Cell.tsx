import "../styles/board.css";
import React from "react";
import { Player } from "../types/game";

type CellProps = {
  value: Player;
  onCellClick: () => void;
};

const Cell: React.FC<CellProps> = ({ value, onCellClick }) => {
  return (
    <button className="cell" onClick={onCellClick}>
      {value}
    </button>
  );
};

export default Cell;
