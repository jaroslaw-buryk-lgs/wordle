import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { Backspace } from '@mui/icons-material';
import { LetterState } from '../../types/game';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  letterStates: Record<string, LetterState>;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const Keyboard: React.FC<KeyboardProps> = ({
  onKeyPress,
  onBackspace,
  onEnter,
  letterStates
}) => {
  const getKeyColor = (letter: string) => {
    const state = letterStates[letter];
    switch (state) {
      case 'correct':
        return '#6aaa64';
      case 'present':
        return '#c9b458';
      case 'absent':
        return '#787c7e';
      default:
        return '#d3d6da';
    }
  };

  const getTextColor = (letter: string) => {
    const state = letterStates[letter];
    return state && state !== 'empty' ? '#fff' : '#000';
  };

  const KeyButton: React.FC<{ letter: string }> = ({ letter }) => (
    <Button
      variant="contained"
      onClick={() => onKeyPress(letter)}
      sx={{
        minWidth: { xs: '32px', sm: '40px' },
        height: { xs: '48px', sm: '58px' },
        fontSize: { xs: '14px', sm: '16px' },
        fontWeight: 'bold',
        backgroundColor: getKeyColor(letter),
        color: getTextColor(letter),
        border: 'none',
        borderRadius: '4px',
        margin: '0 3px 6px 0',
        '&:hover': {
          backgroundColor: getKeyColor(letter),
          opacity: 0.8,
        },
      }}
    >
      {letter}
    </Button>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '6px',
          }}
        >
          {rowIndex === 2 && (
            <Button
              variant="contained"
              onClick={onEnter}
              sx={{
                minWidth: { xs: '50px', sm: '65px' },
                height: { xs: '48px', sm: '58px' },
                fontSize: { xs: '12px', sm: '14px' },
                fontWeight: 'bold',
                backgroundColor: '#d3d6da',
                color: '#000',
                borderRadius: '4px',
                margin: '0 3px 6px 0',
                '&:hover': {
                  backgroundColor: '#d3d6da',
                  opacity: 0.8,
                },
              }}
            >
              ENTER
            </Button>
          )}
          
          {row.map((letter) => (
            <KeyButton key={letter} letter={letter} />
          ))}
          
          {rowIndex === 2 && (
            <IconButton
              onClick={onBackspace}
              sx={{
                minWidth: { xs: '50px', sm: '65px' },
                height: { xs: '48px', sm: '58px' },
                backgroundColor: '#d3d6da',
                color: '#000',
                borderRadius: '4px',
                margin: '0 3px 6px 0',
                '&:hover': {
                  backgroundColor: '#d3d6da',
                  opacity: 0.8,
                },
              }}
            >
              <Backspace />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Keyboard;