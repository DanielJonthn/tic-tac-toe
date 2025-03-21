export type Player = "X" | "O" | null;

export type Board = Player[];

export type GameHistory = {
  squares: Board;
  currentPlayer: Player;
  moveSequence: number[];
};

export type GameType = "classic" | "enhanced";

export type GameState = {
  history: GameHistory[];
  currentStep: number;
  gameType: GameType;
  winner: Player | "draw";
  isGameOver: boolean;
};
