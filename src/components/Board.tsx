import React from "react";
import Cell from "./Cell";
import "../styles/board.css";

type BoardProps = {
  squares: (string | null)[];
  onCellClick: (index: number) => void;
};

const Board: React.FC<BoardProps> = ({ squares, onCellClick }) => {
  return (
    <div className="board">
      <div className="board-row">
        <Cell value={squares[0]} onCellClick={() => onCellClick(0)} />
        <Cell value={squares[1]} onCellClick={() => onCellClick(1)} />
        <Cell value={squares[2]} onCellClick={() => onCellClick(2)} />
      </div>
      <div className="board-row">
        <Cell value={squares[3]} onCellClick={() => onCellClick(3)} />
        <Cell value={squares[4]} onCellClick={() => onCellClick(4)} />
        <Cell value={squares[5]} onCellClick={() => onCellClick(5)} />
      </div>
      <div className="board-row">
        <Cell value={squares[6]} onCellClick={() => onCellClick(6)} />
        <Cell value={squares[7]} onCellClick={() => onCellClick(7)} />
        <Cell value={squares[8]} onCellClick={() => onCellClick(8)} />
      </div>
    </div>
  );
};

export default Board;
