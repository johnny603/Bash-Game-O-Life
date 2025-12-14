import React, { useState, useEffect, useCallback } from 'react';
import { GameState, CellType, Position, Board } from './types';
import { GRID_WIDTH, GRID_HEIGHT, INITIAL_LIVE_CELL_RATIO, POWERUP_SPAWN_CHANCE, IMMUNITY_DURATION, TIPS } from './constants';
import Grid from './components/Grid';
import Hud from './components/Hud';
import RulesScreen from './components/RulesScreen';
import GameOverScreen from './components/GameOverScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Rules);
  const [previousGameState, setPreviousGameState] = useState<GameState | null>(null);
  const [board, setBoard] = useState<Board>([]);
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [immunity, setImmunity] = useState(0);
  const [tip, setTip] = useState(TIPS[0]);

  const countLiveNeighbors = useCallback((b: Board, x: number, y: number): number => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        const newY = y + i;
        const newX = x + j;

        if (newY >= 0 && newY < GRID_HEIGHT && newX >= 0 && newX < GRID_WIDTH) {
          const isPlayerPos = playerPos.x === newX && playerPos.y === newY;
          if (isPlayerPos || b[newY][newX] === CellType.Live) {
            count++;
          }
        }
      }
    }
    return count;
  }, [playerPos]);

  const initGame = useCallback(() => {
    const newBoard: Board = Array.from({ length: GRID_HEIGHT }, () =>
      Array.from({ length: GRID_WIDTH }, () =>
        Math.random() < INITIAL_LIVE_CELL_RATIO ? CellType.Live : CellType.Dead
      )
    );

    let playerX, playerY;
    do {
      playerX = Math.floor(Math.random() * GRID_WIDTH);
      playerY = Math.floor(Math.random() * GRID_HEIGHT);
    } while (newBoard[playerY][playerX] !== CellType.Live);

    newBoard[playerY][playerX] = CellType.Dead;

    if (Math.random() < 0.5) {
        const powerUpX = Math.floor(Math.random() * GRID_WIDTH);
        const powerUpY = Math.floor(Math.random() * GRID_HEIGHT);
        if (newBoard[powerUpY][powerUpX] === CellType.Dead) {
            newBoard[powerUpY][powerUpX] = CellType.PowerUp;
        }
    }

    setBoard(newBoard);
    setPlayerPos({ x: playerX, y: playerY });
    setScore(0);
    setImmunity(0);
    setGameState(GameState.Playing);
    setTip(TIPS[0]);
  }, []);

  const runNextGeneration = useCallback((currentBoard: Board, currentPlayerPos: Position) => {
    const nextBoard = currentBoard.map(row => [...row]);
    let isPlayerAlive = true;

    // Apply Conway's rules to the whole board
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        const neighbors = countLiveNeighbors(currentBoard, x, y);
        const cellType = currentBoard[y][x];

        if (cellType === CellType.Live) {
          if (neighbors < 2 || neighbors > 3) {
            nextBoard[y][x] = CellType.Dead;
          }
        } else if (cellType === CellType.Dead) {
          if (neighbors === 3) {
            nextBoard[y][x] = CellType.Live;
          }
        }
      }
    }
    
    // Check if player's cell survives
    const playerNeighbors = countLiveNeighbors(currentBoard, currentPlayerPos.x, currentPlayerPos.y);
    if (playerNeighbors < 2 || playerNeighbors > 3) {
      isPlayerAlive = false;
    }

    if (!isPlayerAlive) {
      setGameState(GameState.GameOver);
      return;
    }

    // Spawn power-ups
    if (Math.random() < POWERUP_SPAWN_CHANCE) {
      const pX = Math.floor(Math.random() * GRID_WIDTH);
      const pY = Math.floor(Math.random() * GRID_HEIGHT);
      if (nextBoard[pY][pX] === CellType.Dead && (pX !== currentPlayerPos.x || pY !== currentPlayerPos.y)) {
        nextBoard[pY][pX] = CellType.PowerUp;
      }
    }

    setBoard(nextBoard);
    setScore(s => s + 1);
    setImmunity(i => Math.max(0, i - 1));
    setTip(prevTip => {
  const currentIndex = TIPS.indexOf(prevTip);
  return TIPS[(currentIndex + 1) % TIPS.length];
});
  }, [countLiveNeighbors]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameState !== GameState.Playing) {
      if(e.key.toLowerCase() === 'r'){
        setPreviousGameState(gameState);
        setGameState(GameState.Rules);
      }
      return;
    };
    
    let newX = playerPos.x;
    let newY = playerPos.y;

    switch (e.key.toLowerCase()) {
      case 'w': newY--; break;
      case 'a': newX--; break;
      case 's': newY++; break;
      case 'd': newX++; break;
      case 'r': 
        setPreviousGameState(gameState);
        setGameState(GameState.Rules); 
        return;
      default: return;
    }

    if (newX < 0 || newX >= GRID_WIDTH || newY < 0 || newY >= GRID_HEIGHT) {
      return; // Wall collision
    }

    const targetCellType = board[newY][newX];
    const neighborsAtTarget = countLiveNeighbors(board, newX, newY);

    if (targetCellType === CellType.Dead && neighborsAtTarget < 2 && immunity <= 0) {
      setGameState(GameState.GameOver);
      return;
    }
    
    const newBoard = board.map(r => [...r]);
    let newImmunity = immunity;

    if (targetCellType === CellType.PowerUp) {
      newImmunity += IMMUNITY_DURATION;
      newBoard[newY][newX] = CellType.Dead;
    }

    const newPlayerPos = { x: newX, y: newY };

    setPlayerPos(newPlayerPos);
    setBoard(newBoard);
    setImmunity(newImmunity);
    
    runNextGeneration(newBoard, newPlayerPos);

  }, [gameState, playerPos, board, immunity, countLiveNeighbors, runNextGeneration]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Rules:
        const handleStart = () => {
          // If we came from a playing state, resume the game.
          // Otherwise (initial start, or from game over), start a new game.
          if (previousGameState === GameState.Playing) {
            setGameState(GameState.Playing);
          } else {
            initGame();
          }
        };
        return <RulesScreen onStart={handleStart} />;
      case GameState.GameOver:
        return <GameOverScreen score={score} onRestart={initGame} />;
      case GameState.Playing:
        return (
          <>
            <Hud score={score} immunity={immunity} tip={tip}/>
            <Grid board={board} playerPos={playerPos} />
            <div className="mt-4 text-center text-slate-400 text-sm">Use <span className="bg-slate-700 px-2 py-1 rounded">W A S D</span> to move. Press <span className="bg-slate-700 px-2 py-1 rounded">R</span> for rules.</div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      {renderContent()}
    </div>
  );
};

export default App;
