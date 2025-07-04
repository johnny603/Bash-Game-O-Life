import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/90 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="max-w-md w-full p-8 bg-slate-800 border border-red-500/50 rounded-lg shadow-2xl text-center">
        <h1 className="text-5xl font-bold text-red-500 mb-4">GAME OVER</h1>
        <p className="text-2xl text-slate-300 mb-2">You survived for</p>
        <p className="text-6xl font-bold text-cyan-400 mb-6">{score}</p>
        <p className="text-2xl text-slate-300 mb-8">generations.</p>
        
        <button
          onClick={onRestart}
          className="bg-lime-500 text-lime-900 font-bold text-2xl px-8 py-4 rounded-lg shadow-lg hover:bg-lime-400 focus:outline-none focus:ring-4 focus:ring-lime-300 transition-all duration-200 transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;
