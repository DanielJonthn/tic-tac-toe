import React from "react";
import Cell from "./Cell";
import "../styles/board.css";

type BoardProps = {
  value: string | null;
  onCellClick: () => void;
};

const Board: React.FC<BoardProps> = ({ value, onCellClick }) => {
  return (
    <div className="board">
      <div className="board-row">
        <Cell value={value} onCellClick={onCellClick} />
        <Cell value={value} onCellClick={onCellClick} />
        <Cell value={value} onCellClick={onCellClick} />
      </div>
      <div className="board-row">
        <Cell value={value} onCellClick={onCellClick} />
        <Cell value={value} onCellClick={onCellClick} />
        <Cell value={value} onCellClick={onCellClick} />
      </div>
      <div className="board-row">
        <Cell value={value} onCellClick={onCellClick} />
        <Cell value={value} onCellClick={onCellClick} />
        <Cell value={value} onCellClick={onCellClick} />
      </div>
    </div>
  );
};

export default Board;
