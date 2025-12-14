import React, { useEffect } from 'react';

interface RulesScreenProps {
  onStart: () => void;
}

const RulesScreen: React.FC<RulesScreenProps> = ({ onStart }) => {
  useEffect(() => {
    const handleKeyPress = () => {
      onStart();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onStart]);

  return (
    <div className="fixed inset-0 bg-slate-900/90 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="max-w-2xl w-full p-8 bg-slate-800 border border-cyan-400/50 rounded-lg shadow-2xl text-center">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">Bash Game of Life: Survival Edition</h1>
        <div className="text-left space-y-3 text-slate-300 mb-6">
            <p>You are a single live cell <span className="font-bold text-lime-400">(0)</span> navigating a dynamic universe of live <span className="font-bold text-cyan-400">(+)</span>, dead <span className="text-slate-500">(-)</span>, and power-up <span className="font-bold text-fuchsia-400">($)</span> cells.</p>
            <p><strong>GOAL:</strong> Survive as many generations as possible!</p>
            <h2 className="text-2xl font-bold text-cyan-400 pt-2">How to Play</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>Move your cell <span className="font-bold text-lime-400">(0)</span> one step per generation using <span className="bg-slate-700 px-2 py-1 rounded">W</span> <span className="bg-slate-700 px-2 py-1 rounded">A</span> <span className="bg-slate-700 px-2 py-1 rounded">S</span> <span className="bg-slate-700 px-2 py-1 rounded">D</span> keys.</li>
                <li>Your cell dies if it has fewer than 2 or more than 3 live neighbors.</li>
                <li className="list-none mt-2">
  <p className="font-semibold">Example of a good move:</p>
  <pre className="bg-slate-900 p-3 rounded text-lime-400 font-mono text-sm">
+ + -
+ 0 -
- - -
  </pre>
</li>

<li className="list-none mt-2">
  <p className="font-semibold">Example of a bad move:</p>
  <pre className="bg-slate-900 p-3 rounded text-red-400 font-mono text-sm">
- - -
- 0 -
- - +
  </pre>
</li>
                <li>Moving into an isolated dead cell (0 or 1 neighbor) is fatal unless you are immune.</li>
                <li>Collect power-ups <span className="font-bold text-fuchsia-400">($)</span> for temporary immunity against isolation death.</li>
                <li>Press <span className="bg-slate-700 px-2 py-1 rounded">R</span> anytime during the game to view these rules again.</li>
            </ul>
        </div>
        <p className="text-xl text-lime-400 animate-pulse">Press any key to begin...</p>
      </div>
    </div>
  );
};

export default RulesScreen;
