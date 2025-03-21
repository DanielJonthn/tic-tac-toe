import "../styles/board.css";
import React from "react";
import Cell from "./Cell";
import { Board as BoardType } from "../types/game";

type BoardProps = {
  squares: BoardType;
  onCellClick: (index: number) => void;
};

const Board: React.FC<BoardProps> = ({ squares, onCellClick }) => {
  const renderCell = (i: number) => {
    return <Cell value={squares[i]} onCellClick={() => onCellClick(i)} />;
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
      </div>
      <div className="board-row">
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
      </div>
      <div className="board-row">
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </div>
    </div>
  );
};

export default Board;
