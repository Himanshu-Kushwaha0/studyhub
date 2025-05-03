import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to detect a specific key sequence
 * @param targetSequence Array of keys that should be pressed in sequence
 * @param resetTimeoutMs Time in milliseconds to reset the sequence if no key is pressed
 * @returns Boolean indicating if the sequence was successfully entered
 */
export function useKeySequence(targetSequence: string[], resetTimeoutMs: number = 2000): boolean {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const [sequenceDetected, setSequenceDetected] = useState(false);
  const [resetTimer, setResetTimer] = useState<NodeJS.Timeout | null>(null);

  // Reset the sequence after a specified timeout
  const resetSequence = useCallback(() => {
    setKeysPressed([]);
  }, []);

  // Check if the current key sequence matches the target
  const checkSequence = useCallback(
    (currentKeys: string[]) => {
      // Check if we have enough keys pressed
      if (currentKeys.length !== targetSequence.length) return false;
      
      // Check if each key matches
      for (let i = 0; i < targetSequence.length; i++) {
        if (currentKeys[i] !== targetSequence[i]) {
          return false;
        }
      }
      
      return true;
    },
    [targetSequence]
  );

  // Handle keydown events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Add the current key to the sequence
      const newKeysPressed = [...keysPressed, event.key.toLowerCase()];
      
      // Only keep the last N keys where N is the length of our target sequence
      if (newKeysPressed.length > targetSequence.length) {
        newKeysPressed.shift();
      }
      
      setKeysPressed(newKeysPressed);
      
      // Reset the timer each time a key is pressed
      if (resetTimer) {
        clearTimeout(resetTimer);
      }
      
      setResetTimer(setTimeout(resetSequence, resetTimeoutMs));
      
      // Check if the sequence matches
      if (checkSequence(newKeysPressed)) {
        setSequenceDetected(true);
        resetSequence();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [keysPressed, checkSequence, resetSequence, resetTimer, resetTimeoutMs, targetSequence]);

  return sequenceDetected;
}

export default useKeySequence;