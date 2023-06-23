export interface Move {
  move: string;
  check: boolean;
  stalemate: boolean;
  checkmate: boolean;
  fen: string;
  pgn: string;
  isKill: boolean;
  piece: string;
  turn: string;
}
