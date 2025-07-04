export enum CellType {
  Dead,
  Live,
  PowerUp,
}

export enum GameState {
  Rules,
  Playing,
  GameOver,
}

export type Position = {
  x: number;
  y: number;
};

// Player is not a cell type on the board, but a special render case
export const PLAYER_CELL_TYPE = 'Player';

export type Board = CellType[][];