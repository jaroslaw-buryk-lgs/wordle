# Wordle Game

A React implementation of the popular Wordle word-guessing game, built with Material-UI.

## Features

- **Classic Wordle Gameplay**: Guess a 5-letter word in 6 attempts
- **Color-coded Feedback**: 
  - 🟩 Green: Correct letter in correct position
  - 🟨 Yellow: Correct letter in wrong position  
  - ⬜ Gray: Letter not in the word
- **Virtual Keyboard**: On-screen keyboard with color feedback
- **Responsive Design**: Works on desktop and mobile devices
- **Material Design**: Clean, modern UI using Material-UI components
- **Word Validation**: Validates guesses against a curated word list
- **Game Statistics**: Win/loss tracking with attempt count

## How to Play

1. Guess a 5-letter word by typing or clicking the virtual keyboard
2. Press ENTER to submit your guess
3. Use the color feedback to narrow down the correct word
4. You have 6 attempts to guess the correct word
5. Click "New Game" to start over with a new word

## Technologies Used

- **React 19** with TypeScript
- **Material-UI (MUI)** for UI components and theming
- **Emotion** for styling
- **Create React App** for project setup and build tools

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) to view the game

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Project Structure

```
src/
├── components/
│   ├── GameBoard/     # Game grid and letter tiles
│   └── Keyboard/      # Virtual keyboard component
├── types/
│   └── game.ts        # TypeScript type definitions
├── utils/
│   ├── gameLogic.ts   # Core game logic and evaluation
│   └── words.ts       # Word list and validation
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## Game Logic

The game implements the classic Wordle rules:
- Each guess must be a valid 5-letter word
- Color feedback follows standard Wordle conventions
- The game ends when the word is guessed or 6 attempts are used
- A new random word is selected for each game

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).