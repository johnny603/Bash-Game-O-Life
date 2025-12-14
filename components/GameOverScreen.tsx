import React, { useState } from 'react';
import { LeaderboardEntry } from '../App';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  leaderboard: LeaderboardEntry[];
  onSaveScore: (initials: string) => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart, leaderboard, onSaveScore  }) => {
  const [initials, setInitials] = useState('');

  const handleSubmit = () => {
    if (initials.trim()) {
      onSaveScore(initials.trim());
      setInitials('');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/90 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="max-w-md w-full p-8 bg-slate-800 border border-red-500/50 rounded-lg shadow-2xl text-center">
        <h1 className="text-5xl font-bold text-red-500 mb-4">GAME OVER</h1>
        <p className="text-2xl text-slate-300 mb-2">You survived for</p>
        <p className="text-6xl font-bold text-cyan-400 mb-6">{score}</p>
        <p className="text-2xl text-slate-300 mb-8">generations.</p>

        <div className="mb-6">
          <input
            value={initials}
            onChange={(e) => setInitials(e.target.value.toUpperCase().slice(0,3))}
            maxLength={3}
            placeholder="Enter initials"
            className="text-center uppercase px-4 py-2 rounded bg-slate-700 text-cyan-400 font-bold mr-2"
          />
          <button
            onClick={handleSubmit}
            className="bg-lime-500 text-lime-900 font-bold px-4 py-2 rounded hover:bg-lime-400 transition-all duration-200"
          >
            Save
          </button>
        </div>

        {leaderboard.length > 0 && (
          <div className="mb-6 text-left">
            <h2 className="text-xl font-bold text-cyan-400 mb-2">Leaderboard</h2>
            <ol className="list-decimal list-inside">
              {leaderboard.map((entry, idx) => (
                <li key={idx} className="text-slate-300">
                  {entry.initials} - {entry.score} ({entry.date})
                </li>
              ))}
            </ol>
          </div>
        )}
        
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
