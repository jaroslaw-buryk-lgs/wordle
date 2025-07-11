import { Letter, LetterState, GameState } from '../types/game';

export const evaluateGuess = (guess: string, targetWord: string): Letter[] => {
  const result: Letter[] = [];
  const targetLetters = targetWord.split('');
  const guessLetters = guess.split('');
  
  // First pass: mark correct positions
  const usedTargetIndices = new Set<number>();
  const usedGuessIndices = new Set<number>();
  
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = { value: guessLetters[i], state: 'correct' };
      usedTargetIndices.add(i);
      usedGuessIndices.add(i);
    }
  }
  
  // Second pass: mark present letters
  for (let i = 0; i < guessLetters.length; i++) {
    if (usedGuessIndices.has(i)) continue;
    
    let found = false;
    for (let j = 0; j < targetLetters.length; j++) {
      if (!usedTargetIndices.has(j) && guessLetters[i] === targetLetters[j]) {
        result[i] = { value: guessLetters[i], state: 'present' };
        usedTargetIndices.add(j);
        found = true;
        break;
      }
    }
    
    if (!found) {
      result[i] = { value: guessLetters[i], state: 'absent' };
    }
  }
  
  return result;
};

export const createEmptyRow = (): Letter[] => {
  return Array(5).fill(null).map(() => ({ value: '', state: 'empty' as LetterState }));
};

export const createInitialGameState = (targetWord: string): GameState => {
  return {
    currentGuess: '',
    guesses: Array(6).fill(null).map(() => createEmptyRow()),
    currentRow: 0,
    gameStatus: 'playing',
    targetWord: targetWord.toUpperCase()
  };
};