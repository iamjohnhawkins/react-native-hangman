export interface GameState {
  currentPlayer: 1 | 2;
  word: string;
  guessedLetters: string[];
  wrongGuesses: number;
  maxWrongGuesses: number;
  gameStatus: 'setup' | 'playing' | 'won' | 'lost';
  winner?: 1 | 2;
}

export interface Player {
  id: 1 | 2;
  name: string;
  color: string;
}

export type GameScreen = 'home' | 'setup' | 'game' | 'result';