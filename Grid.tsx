import React from 'react';
import { Board, CellType, Position, PLAYER_CELL_TYPE } from '../types';
import Cell from './Cell';
import { GRID_WIDTH, GRID_HEIGHT } from '../constants';


interface GridProps {
  board: Board;
  playerPos: Position;
}

const Grid: React.FC<GridProps> = ({ board, playerPos }) => {
  return (
    <div className="bg-slate-900/50 p-2 md:p-4 rounded-lg border border-slate-700 shadow-lg">
      <div 
        className="grid gap-px" 
        style={{ 
          gridTemplateColumns: `repeat(${GRID_WIDTH}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_HEIGHT}, minmax(0, 1fr))`
        }}
      >
        {board.map((row, y) =>
          row.map((cellType, x) => {
            const isPlayerPos = playerPos.x === x && playerPos.y === y;
            return (
              <Cell
                key={`${y}-${x}`}
                type={isPlayerPos ? PLAYER_CELL_TYPE : cellType}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Grid;
