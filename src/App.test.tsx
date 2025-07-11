import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders wordle game', () => {
  render(<App />);
  const wordleElement = screen.getByText(/WORDLE/i);
  expect(wordleElement).toBeInTheDocument();
});

test('renders new game button', () => {
  render(<App />);
  const newGameButton = screen.getByText(/New Game/i);
  expect(newGameButton).toBeInTheDocument();
});

test('renders keyboard', () => {
  render(<App />);
  const enterButton = screen.getByText(/ENTER/i);
  expect(enterButton).toBeInTheDocument();
});
