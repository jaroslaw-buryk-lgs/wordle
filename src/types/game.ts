export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface Letter {
  value: string;
  state: LetterState;
}

export interface GameState {
  currentGuess: string;
  guesses: Letter[][];
  currentRow: number;
  gameStatus: 'playing' | 'won' | 'lost';
  targetWord: string;
}

export interface KeyboardLetter {
  letter: string;
  state: LetterState;
}