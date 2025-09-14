import { GameState } from '../types';

export const createInitialGameState = (word: string): GameState => ({
  currentPlayer: 2, // Player 2 starts guessing
  word: word.toUpperCase(),
  guessedLetters: [],
  wrongGuesses: 0,
  maxWrongGuesses: 6,
  gameStatus: 'playing',
});

export const makeGuess = (gameState: GameState, letter: string): GameState => {
  const upperLetter = letter.toUpperCase();

  if (gameState.guessedLetters.includes(upperLetter)) {
    return gameState;
  }

  const newGuessedLetters = [...gameState.guessedLetters, upperLetter];
  const isCorrect = gameState.word.includes(upperLetter);
  const newWrongGuesses = isCorrect ? gameState.wrongGuesses : gameState.wrongGuesses + 1;

  // Check if word is complete
  const isWordComplete = gameState.word
    .split('')
    .every(letter => newGuessedLetters.includes(letter));

  // Determine game status
  let gameStatus: GameState['gameStatus'] = 'playing';
  let winner: 1 | 2 | undefined;

  if (isWordComplete) {
    gameStatus = 'won';
    winner = 2; // Guesser wins
  } else if (newWrongGuesses >= gameState.maxWrongGuesses) {
    gameStatus = 'lost';
    winner = 1; // Word setter wins
  }

  return {
    ...gameState,
    guessedLetters: newGuessedLetters,
    wrongGuesses: newWrongGuesses,
    gameStatus,
    winner,
  };
};

export const getDisplayWord = (word: string, guessedLetters: string[]): string => {
  return word
    .split('')
    .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');
};

export const getWrongLetters = (word: string, guessedLetters: string[]): string[] => {
  return guessedLetters.filter(letter => !word.includes(letter));
};