import { Board, Difficulty, Player } from "../types/game";

export const getAvailableMoves = (squares: Board): number[] => {
  return squares.reduce<number[]>((moves, cell, index) => {
    if (cell === null) {
      moves.push(index);
    }
    return moves;
  }, []);
};

export const makeRandomMove = (squares: Board): number => {
  const availableMoves = getAvailableMoves(squares);
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
};

export const findWinningMove = (
  squares: Board,
  player: Player
): number | null => {
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

  for (const [a, b, c] of lines) {
    const squares_copy = [...squares];
    if (
      squares_copy[a] === null &&
      squares_copy[b] === player &&
      squares_copy[c] === player
    ) {
      return a;
    }
    if (
      squares_copy[a] === player &&
      squares_copy[b] === null &&
      squares_copy[c] === player
    ) {
      return b;
    }
    if (
      squares_copy[a] === player &&
      squares_copy[b] === player &&
      squares_copy[c] === null
    ) {
      return c;
    }
  }
  return null;
};

export const findBlockingMove = (
  squares: Board,
  opponent: Player
): number | null => {
  return findWinningMove(squares, opponent);
};

export const makeMediumMove = (squares: Board, player: Player): number => {
  const opponent = player === "X" ? "O" : "X";

  const winningMove = findWinningMove(squares, player);
  if (winningMove !== null) {
    return winningMove;
  }

  const blockingMove = findBlockingMove(squares, opponent);
  if (blockingMove !== null) {
    return blockingMove;
  }

  return makeRandomMove(squares);
};

// Helper for minimax
const evaluate = (squares: Board, maximizingPlayer: Player): number => {
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

  const opponent = maximizingPlayer === "X" ? "O" : "X";

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      if (squares[a] === maximizingPlayer) {
        return 10;
      } else if (squares[a] === opponent) {
        return -10;
      }
    }
  }

  return 0;
};

// Minimax algorithm for Hard AI
const minimax = (
  squares: Board,
  depth: number,
  isMaximizing: boolean,
  player: Player,
  alpha: number = -Infinity,
  beta: number = Infinity
): number => {
  const opponent = player === "X" ? "O" : "X";
  const score = evaluate(squares, player);

  // If the game is over or we've reached the maximum depth
  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (getAvailableMoves(squares).length === 0) return 0;
  if (depth >= 5) return 0; // Limit depth for performance

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of getAvailableMoves(squares)) {
      const boardCopy = [...squares];
      boardCopy[move] = player;
      const score = minimax(boardCopy, depth + 1, false, player, alpha, beta);
      bestScore = Math.max(score, bestScore);
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of getAvailableMoves(squares)) {
      const boardCopy = [...squares];
      boardCopy[move] = opponent;
      const score = minimax(boardCopy, depth + 1, true, player, alpha, beta);
      bestScore = Math.min(score, bestScore);
      beta = Math.min(beta, bestScore);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return bestScore;
  }
};

export const makeHardMove = (squares: Board, player: Player): number => {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (const move of getAvailableMoves(squares)) {
    const boardCopy = [...squares];
    boardCopy[move] = player;
    const score = minimax(boardCopy, 0, false, player);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};

export const makeAIMove = (
  squares: Board,
  player: Player,
  difficulty: Difficulty
): number => {
  let move = -1;

  if (difficulty === "easy") {
    move = makeRandomMove(squares);
  } else if (difficulty === "medium") {
    move = makeMediumMove(squares, player);
  } else if (difficulty === "hard") {
    move = makeHardMove(squares, player);
  }

  return move !== -1 ? move : makeRandomMove(squares);
};
