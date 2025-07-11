import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import { GameState, LetterState } from './types/game';
import { getRandomWord, isValidWord } from './utils/words';
import { evaluateGuess, createInitialGameState } from './utils/gameLogic';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6aaa64',
    },
    secondary: {
      main: '#c9b458',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialGameState(getRandomWord())
  );
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const updateLetterStates = useCallback((guesses: any[]) => {
    const newLetterStates: Record<string, LetterState> = {};
    
    guesses.forEach((guess) => {
      guess.forEach((letter: any) => {
        if (letter.value && letter.state !== 'empty') {
          const currentState = newLetterStates[letter.value];
          // Prioritize states: correct > present > absent
          if (!currentState || 
              (letter.state === 'correct') ||
              (letter.state === 'present' && currentState === 'absent')) {
            newLetterStates[letter.value] = letter.state;
          }
        }
      });
    });
    
    setLetterStates(newLetterStates);
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentGuess.length >= 5) return;

    setGameState(prev => {
      const newGuess = prev.currentGuess + key;
      const newGuesses = [...prev.guesses];
      const currentRowLetters = [...newGuesses[prev.currentRow]];
      
      for (let i = 0; i < 5; i++) {
        if (i < newGuess.length) {
          currentRowLetters[i] = { value: newGuess[i], state: 'empty' };
        } else {
          currentRowLetters[i] = { value: '', state: 'empty' };
        }
      }
      
      newGuesses[prev.currentRow] = currentRowLetters;
      
      return {
        ...prev,
        currentGuess: newGuess,
        guesses: newGuesses,
      };
    });
  }, [gameState.gameStatus, gameState.currentGuess.length]);

  const handleBackspace = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentGuess.length === 0) return;

    setGameState(prev => {
      const newGuess = prev.currentGuess.slice(0, -1);
      const newGuesses = [...prev.guesses];
      const currentRowLetters = [...newGuesses[prev.currentRow]];
      
      for (let i = 0; i < 5; i++) {
        if (i < newGuess.length) {
          currentRowLetters[i] = { value: newGuess[i], state: 'empty' };
        } else {
          currentRowLetters[i] = { value: '', state: 'empty' };
        }
      }
      
      newGuesses[prev.currentRow] = currentRowLetters;
      
      return {
        ...prev,
        currentGuess: newGuess,
        guesses: newGuesses,
      };
    });
  }, [gameState.gameStatus, gameState.currentGuess.length]);

  const handleEnter = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentGuess.length !== 5) return;

    if (!isValidWord(gameState.currentGuess)) {
      // Could add shake animation here in the future
      return;
    }

    setGameState(prev => {
      const evaluatedGuess = evaluateGuess(prev.currentGuess, prev.targetWord);
      const newGuesses = [...prev.guesses];
      newGuesses[prev.currentRow] = evaluatedGuess;
      
      const isWin = evaluatedGuess.every(letter => letter.state === 'correct');
      const isGameOver = prev.currentRow === 5;
      
      let newGameStatus = prev.gameStatus;
      if (isWin) {
        newGameStatus = 'won';
      } else if (isGameOver) {
        newGameStatus = 'lost';
      }
      
      return {
        ...prev,
        guesses: newGuesses,
        currentRow: prev.currentRow + 1,
        currentGuess: '',
        gameStatus: newGameStatus,
      };
    });
  }, [gameState.gameStatus, gameState.currentGuess]);

  const handleNewGame = useCallback(() => {
    const newTargetWord = getRandomWord();
    setGameState(createInitialGameState(newTargetWord));
    setLetterStates({});
    setDialogOpen(false);
  }, []);

  // Update letter states when guesses change
  useEffect(() => {
    updateLetterStates(gameState.guesses);
  }, [gameState.guesses, updateLetterStates]);

  // Show dialog when game ends
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') {
      setTimeout(() => setDialogOpen(true), 1000);
    }
  }, [gameState.gameStatus]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= 'a' && event.key <= 'z') {
        handleKeyPress(event.key.toUpperCase());
      } else if (event.key === 'Backspace') {
        handleBackspace();
      } else if (event.key === 'Enter') {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, handleBackspace, handleEnter]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#fafafa' }}>
        <AppBar position="static" elevation={1}>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
              WORDLE
            </Typography>
            <Button
              color="inherit"
              onClick={handleNewGame}
              startIcon={<Refresh />}
              sx={{ ml: 2 }}
            >
              New Game
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 'calc(100vh - 64px)',
              py: 2,
            }}
          >
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <GameBoard guesses={gameState.guesses} />
            </Box>
            
            <Keyboard
              onKeyPress={handleKeyPress}
              onBackspace={handleBackspace}
              onEnter={handleEnter}
              letterStates={letterStates}
            />
          </Box>
        </Container>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>
            {gameState.gameStatus === 'won' ? '🎉 Congratulations!' : '😞 Game Over'}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              {gameState.gameStatus === 'won'
                ? `You guessed the word "${gameState.targetWord}" in ${gameState.currentRow} tries!`
                : `The word was "${gameState.targetWord}". Better luck next time!`}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewGame} variant="contained" color="primary">
              Play Again
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default App;
