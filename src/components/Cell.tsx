import React from "react";
import "../styles/board.css";

type CellProps = {
  value: string | null;
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
