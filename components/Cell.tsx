import React from 'react';
import { CellType, PLAYER_CELL_TYPE } from '../types';

interface CellProps {
  type: CellType | typeof PLAYER_CELL_TYPE;
}

const Cell: React.FC<CellProps> = ({ type }) => {
  const baseClasses = 'w-6 h-6 md:w-8 md:h-8 border border-slate-700/50 flex items-center justify-center transition-colors duration-300';

  const typeClasses = {
    [CellType.Dead]: 'bg-slate-800',
    [CellType.Live]: 'bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.7)]',
    [CellType.PowerUp]: 'bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)] animate-pulse',
    [PLAYER_CELL_TYPE]: 'bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.8)] rounded-full',
  };

  const symbol = {
    [CellType.Dead]: '-',
    [CellType.Live]: '+',
    [CellType.PowerUp]: '$',
    [PLAYER_CELL_TYPE]: '0',
  }
  
  const textClass = {
    [CellType.Dead]: 'text-slate-600',
    [CellType.Live]: 'text-cyan-900 font-bold',
    [CellType.PowerUp]: 'text-fuchsia-900 font-bold',
    [PLAYER_CELL_TYPE]: 'text-lime-900 font-bold',
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <span className={textClass[type]}>{symbol[type]}</span>
    </div>
  );
};

export default Cell;
