# Hangman Game - Two Player iPad App

A fun, interactive Hangman game designed for two players sharing an iPad.

## Features

- 🎮 **Two-Player Gameplay**: One player sets the word, the other guesses
- 📱 **iPad Optimized**: Large buttons and text for comfortable shared play
- 🎨 **Fun Interface**: Colorful design with hangman drawings
- 🏆 **Score Tracking**: Clear winner display and game results
- 🔄 **Play Again**: Quick restart for multiple rounds

## How to Play

1. **Start Game**: Player 1 taps "Start New Game"
2. **Set Word**: Player 1 enters a secret word (3-15 letters)
3. **Guess Letters**: Player 2 taps letters to guess the word
4. **Win/Lose**:
   - Player 2 wins by guessing the word before hangman is complete
   - Player 1 wins if Player 2 makes 6 wrong guesses

## Running the App

### Prerequisites
- Node.js (v16 or later)
- React Native development environment
- iOS Simulator or iPad device
- Xcode (for iOS development)

### Installation

1. Navigate to the project directory:
   ```bash
   cd HangmanGame
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install iOS dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```

4. Run on iOS:
   ```bash
   npx react-native run-ios
   ```

### For iPad Testing

To test on an actual iPad:
1. Connect your iPad via USB
2. Open Xcode and select your iPad as the target device
3. Run the app from Xcode or use:
   ```bash
   npx react-native run-ios --device="Your iPad Name"
   ```

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx          # Screen navigation
│   ├── HangmanDrawing.tsx      # Hangman visual display
│   └── AlphabetKeyboard.tsx    # Letter selection keyboard
├── screens/
│   ├── HomeScreen.tsx          # Welcome screen
│   ├── SetupScreen.tsx         # Word input screen
│   ├── GameScreen.tsx          # Main game screen
│   └── ResultScreen.tsx        # Game results screen
├── types/
│   └── index.ts                # TypeScript type definitions
└── utils/
    └── gameLogic.ts            # Game logic and state management
```

## Game Rules

- Words must be 3-15 letters long
- Only letters are allowed (no numbers or special characters)
- Players get 6 wrong guesses before losing
- The hangman is drawn progressively with each wrong guess:
  1. Head
  2. Body
  3. Left arm
  4. Right arm
  5. Left leg
  6. Right leg (game over)

## iPad Optimizations

- Large touch targets (50px minimum)
- Increased font sizes for readability
- Spacious layout for comfortable shared use
- Clear visual feedback for button presses
- Portrait orientation optimized

Enjoy playing Hangman with friends and family! 🎉