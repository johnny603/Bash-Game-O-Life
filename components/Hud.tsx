import React from 'react';

interface HudProps {
  score: number;
  immunity: number;
  tip: string;
}

const Hud: React.FC<HudProps> = ({ score, immunity, tip }) => {
  return (
    <div className="w-full max-w-4xl p-4 mb-4 bg-slate-800/50 border border-slate-700 rounded-lg shadow-md flex justify-between items-center text-lg">
      <div>
        <span className="font-bold text-cyan-400">Score:</span> {score}
      </div>
      <div>
        <span className="font-bold text-fuchsia-400">Immunity:</span> 
        <span className={immunity > 0 ? 'text-lime-400' : 'text-slate-400'}>
          {immunity > 0 ? ` ${immunity} moves` : ' Inactive'}
        </span>
      </div>
      <div className="hidden md:block text-sm text-slate-400">
        <p>{tip}</p>
      </div>
    </div>
  );
};

export default Hud;
