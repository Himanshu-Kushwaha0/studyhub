import React, { useState, useEffect } from 'react';
import { useKeySequence } from '@/hooks/use-key-sequence';
import RetroSnakeGame from './RetroSnakeGame';
import { useToast } from '@/hooks/use-toast';

const EasterEggs: React.FC = () => {
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const { toast } = useToast();
  
  // Define sequence for Snake game: 's', 'n', 'k'
  const snakeSequenceDetected = useKeySequence(['s', 'n', 'k']);
  
  useEffect(() => {
    if (snakeSequenceDetected) {
      setShowSnakeGame(true);
      toast({
        title: "🎮 Snake Game Unlocked!",
        description: "Use arrow keys to control the snake. Collect the food to grow!",
      });
    }
  }, [snakeSequenceDetected, toast]);
  
  // Close snake game
  const handleCloseSnakeGame = () => {
    setShowSnakeGame(false);
  };
  
  // If no Easter egg is activated, don't render anything
  if (!showSnakeGame) {
    return null;
  }
  
  return (
    <>
      {showSnakeGame && <RetroSnakeGame onClose={handleCloseSnakeGame} />}
    </>
  );
};

export default EasterEggs;