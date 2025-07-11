import React from 'react';
import { Box, Paper } from '@mui/material';
import { Letter } from '../../types/game';

interface LetterTileProps {
  letter: Letter;
  index: number;
}

const LetterTile: React.FC<LetterTileProps> = ({ letter }) => {
  const getBackgroundColor = () => {
    switch (letter.state) {
      case 'correct':
        return '#6aaa64'; // Green
      case 'present':
        return '#c9b458'; // Yellow
      case 'absent':
        return '#787c7e'; // Gray
      default:
        return 'white'; // Empty
    }
  };

  const getTextColor = () => {
    return letter.state === 'empty' ? '#000' : '#fff';
  };

  const getBorderColor = () => {
    return letter.state === 'empty' ? '#d3d6da' : 'transparent';
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: 62,
        height: 62,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        border: `2px solid ${getBorderColor()}`,
        fontSize: '2rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        transition: 'all 0.3s ease',
      }}
    >
      {letter.value}
    </Paper>
  );
};

interface GameRowProps {
  letters: Letter[];
  rowIndex: number;
}

const GameRow: React.FC<GameRowProps> = ({ letters }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        justifyContent: 'center',
        mb: 1,
      }}
    >
      {letters.map((letter, index) => (
        <LetterTile key={index} letter={letter} index={index} />
      ))}
    </Box>
  );
};

interface GameBoardProps {
  guesses: Letter[][];
}

const GameBoard: React.FC<GameBoardProps> = ({ guesses }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
      }}
    >
      {guesses.map((guess, index) => (
        <GameRow key={index} letters={guess} rowIndex={index} />
      ))}
    </Box>
  );
};

export default GameBoard;