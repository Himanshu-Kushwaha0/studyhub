import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Game constants
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const GAME_WIDTH = GRID_SIZE * CELL_SIZE;
const GAME_HEIGHT = GRID_SIZE * CELL_SIZE;
const INITIAL_SPEED = 150; // ms
const SPEED_INCREMENT = 5; // ms faster after eating food

// Direction enum
enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

// Coordinate type
type Coordinate = {
  x: number;
  y: number;
};

interface RetroSnakeGameProps {
  onClose: () => void;
}

const RetroSnakeGame: React.FC<RetroSnakeGameProps> = ({ onClose }) => {
  // Game state
  const [snake, setSnake] = useState<Coordinate[]>([
    { x: 10, y: 10 }, // Head
    { x: 9, y: 10 },  // Body
    { x: 8, y: 10 }   // Tail
  ]);
  const [food, setFood] = useState<Coordinate>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);
  const [highScore, setHighScore] = useState<number>(() => {
    const stored = localStorage.getItem('snakeHighScore');
    return stored ? parseInt(stored) : 0;
  });
  
  // Ref for current direction to avoid stale closures
  const currentDirectionRef = useRef<Direction>(Direction.RIGHT);
  
  // Update direction ref when state changes
  useEffect(() => {
    currentDirectionRef.current = direction;
  }, [direction]);
  
  // Generate food at a random position not on the snake
  const generateFood = useCallback(() => {
    let newFood: Coordinate;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      // Keep generating until we find a position not on the snake
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    return newFood;
  }, [snake]);
  
  // Update high score
  const updateHighScore = useCallback(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);
  
  // Reset game
  const resetGame = useCallback(() => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ]);
    setFood(generateFood());
    setDirection(Direction.RIGHT);
    currentDirectionRef.current = Direction.RIGHT;
    setGameOver(false);
    setSpeed(INITIAL_SPEED);
    setScore(0);
  }, [generateFood]);
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for game keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'r', 'R'].includes(e.key)) {
        e.preventDefault();
      }
      
      // Special controls
      if (e.key === ' ') {
        setIsPaused(prev => !prev);
        return;
      }
      
      if (e.key === 'r' || e.key === 'R') {
        resetGame();
        return;
      }
      
      // Don't process movement if game is over or paused
      if (gameOver || isPaused) return;
      
      // Movement controls - check against current direction to prevent reversing
      const currentDir = currentDirectionRef.current;
      switch (e.key) {
        case 'ArrowUp':
          if (currentDir !== Direction.DOWN) {
            setDirection(Direction.UP);
          }
          break;
        case 'ArrowDown':
          if (currentDir !== Direction.UP) {
            setDirection(Direction.DOWN);
          }
          break;
        case 'ArrowLeft':
          if (currentDir !== Direction.RIGHT) {
            setDirection(Direction.LEFT);
          }
          break;
        case 'ArrowRight':
          if (currentDir !== Direction.LEFT) {
            setDirection(Direction.RIGHT);
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, isPaused, resetGame]);
  
  // Game loop - update game state at regular intervals
  useEffect(() => {
    if (gameOver || isPaused) return;
    
    // Use setInterval for more predictable timing
    const intervalId = setInterval(() => {
      // Update snake position
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        
        // Move head based on current direction
        switch (currentDirectionRef.current) {
          case Direction.UP:
            head.y -= 1;
            break;
          case Direction.DOWN:
            head.y += 1;
            break;
          case Direction.LEFT:
            head.x -= 1;
            break;
          case Direction.RIGHT:
            head.x += 1;
            break;
        }
        
        // Check for collisions with walls
        if (
          head.x < 0 || 
          head.x >= GRID_SIZE || 
          head.y < 0 || 
          head.y >= GRID_SIZE
        ) {
          setGameOver(true);
          updateHighScore();
          return prevSnake; // Don't update snake if game over
        }
        
        // Check for collisions with self
        if (newSnake.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          updateHighScore();
          return prevSnake; // Don't update snake if game over
        }
        
        // Add new head
        newSnake.unshift(head);
        
        // Check if snake ate food
        if (head.x === food.x && head.y === food.y) {
          // Increase score
          setScore(prevScore => prevScore + 10);
          
          // Generate new food
          setFood(generateFood());
          
          // Increase speed (make game faster)
          if (speed > 50) {
            setSpeed(prevSpeed => prevSpeed - SPEED_INCREMENT);
          }
        } else {
          // Remove tail if didn't eat food
          newSnake.pop();
        }
        
        return newSnake;
      });
    }, speed);
    
    return () => clearInterval(intervalId);
  }, [gameOver, isPaused, speed, food, generateFood, updateHighScore]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border-2 border-green-400">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-green-400 text-xl font-bold tracking-widest">SNAKE GAME</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="flex justify-between mb-2 text-green-400 font-mono">
          <div>Score: {score}</div>
          <div>High Score: {highScore}</div>
        </div>
        
        <div 
          style={{ 
            width: `${GAME_WIDTH}px`, 
            height: `${GAME_HEIGHT}px`,
            border: '2px solid #22c55e', 
            position: 'relative',
            backgroundColor: '#1f2937'
          }}
        >
          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: `${CELL_SIZE - 2}px`,
                height: `${CELL_SIZE - 2}px`,
                left: `${segment.x * CELL_SIZE}px`,
                top: `${segment.y * CELL_SIZE}px`,
                backgroundColor: index === 0 ? '#34d399' : '#22c55e',
                border: '1px solid #065f46',
                borderRadius: index === 0 ? '4px' : '0'
              }}
            />
          ))}

          {/* Food */}
          <div
            style={{
              position: 'absolute',
              width: `${CELL_SIZE - 2}px`,
              height: `${CELL_SIZE - 2}px`,
              left: `${food.x * CELL_SIZE}px`,
              top: `${food.y * CELL_SIZE}px`,
              backgroundColor: '#f87171',
              borderRadius: '50%',
              border: '1px solid #b91c1c'
            }}
          />

          {/* Game Over Overlay */}
          {gameOver && (
            <div 
              className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white"
              style={{ zIndex: 10 }}
            >
              <p className="text-xl font-bold mb-2">GAME OVER</p>
              <p className="mb-4">Score: {score}</p>
              <Button 
                variant="outline"
                onClick={resetGame}
                className="border-green-500 text-green-400 hover:bg-green-900/30"
              >
                Play Again
              </Button>
            </div>
          )}

          {/* Pause Overlay */}
          {isPaused && !gameOver && (
            <div 
              className="absolute inset-0 bg-black/60 flex items-center justify-center text-white"
              style={{ zIndex: 10 }}
            >
              <p className="text-xl font-bold">PAUSED</p>
            </div>
          )}
        </div>

        <div className="mt-4 text-gray-300 text-xs">
          <p>Use <span className="text-green-400">arrow keys</span> to move</p>
          <p><span className="text-green-400">Space</span> to pause, <span className="text-green-400">R</span> to restart</p>
        </div>
      </div>
    </div>
  );
};

export default RetroSnakeGame;