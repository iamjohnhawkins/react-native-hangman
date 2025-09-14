# Hangman Game - React Native + Expo Training Project

A Hangman game built with React Native and Expo, featuring both single-player and multiplayer modes. This project is intended as a personal training resource for learning mobile app development with modern React Native practices.

![Game Preview](./assets/game-preview.png)

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Guide](#development-guide)
- [Game Flow](#game-flow)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Styling Approach](#styling-approach)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Learning Resources](#learning-resources)

## Features

### 🎮 Game Modes
- **Single Player**: Play against computer-generated words from a dictionary API
- **Multiplayer**: One player sets a word, another guesses

### 🎨 User Experience
- Intuitive touch-friendly interface
- Visual hangman drawing that updates with wrong guesses
- Password-style input with eye toggle for secret words
- Responsive design optimized for mobile devices
- Smooth animations and transitions

### 🔧 Technical Features
- TypeScript for type safety
- Expo SDK 54 for cross-platform development
- External API integration (Wordnik Dictionary API)
- Graceful fallback for offline functionality
- Clean component architecture
- Comprehensive state management

## Technology Stack

- **React Native**: 0.81.4 - Mobile app framework
- **Expo**: ~54.0.0 - Development platform and build tools
- **TypeScript**: Type-safe JavaScript
- **React**: 19.1.0 - UI library
- **Expo Status Bar**: Status bar management
- **Expo Splash Screen**: App launch screen
- **React Native Safe Area Context**: Safe area handling
- **Wordnik API**: Dictionary service for random words

## Project Structure

```
HangmanGame/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AlphabetKeyboard.tsx    # Interactive letter selection
│   │   ├── HangmanDrawing.tsx      # Visual hangman display
│   │   └── Navigation.tsx          # Screen navigation logic
│   ├── screens/              # Main application screens
│   │   ├── HomeScreen.tsx          # Landing page with game mode selection
│   │   ├── SetupScreen.tsx         # Word input for multiplayer
│   │   ├── GameScreen.tsx          # Main gameplay interface
│   │   └── ResultScreen.tsx        # End game results
│   ├── utils/                # Utility functions and services
│   │   ├── gameLogic.ts            # Core game logic
│   │   └── wordService.ts          # API integration for random words
│   └── types/                # TypeScript type definitions
│       └── index.ts                # Centralized type exports
├── assets/                   # Static assets (icons, images)
├── App.tsx                   # Root application component
├── index.js                  # Application entry point
├── app.json                  # Expo configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## Getting Started

### Prerequisites

Before running this project, ensure you have:

1. **Node.js** (v18 or higher)
2. **npm** or **yarn** package manager
3. **Expo CLI** (will be installed automatically)
4. **iOS Simulator** (macOS) or **Android Emulator**
5. **Expo Go app** on your physical device (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HangmanGame
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS Simulator (macOS only)
   npm run ios

   # Android Emulator
   npm run android

   # Or scan QR code with Expo Go app
   ```

### Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run lint` - Run ESLint code analysis
- `npm test` - Run Jest tests (when implemented)

## Development Guide

### Adding New Features

1. **Create components** in `src/components/`
2. **Add screens** in `src/screens/`
3. **Define types** in `src/types/index.ts`
4. **Add utilities** in `src/utils/`
5. **Update navigation** in `App.tsx` and `Navigation.tsx`

### Code Style Guidelines

- Use **TypeScript** for all new files
- Follow **React hooks** patterns
- Implement **proper error handling**
- Use **descriptive variable names**
- Add **inline comments** for complex logic
- Follow **React Native styling** conventions

## Game Flow

### Application Flow Diagram
```
HomeScreen
    ├── Single Player → GameScreen (with API word)
    └── Two Player → SetupScreen → GameScreen
                                      └── ResultScreen
                                          ├── Play Again (same mode)
                                          └── Back to Home
```

### Screen Responsibilities

1. **HomeScreen**: Game mode selection and instructions
2. **SetupScreen**: Secret word input for multiplayer games
3. **GameScreen**: Main gameplay with hangman drawing and letter selection
4. **ResultScreen**: Game outcome display with contextual messaging

## Component Architecture

### Core Components

#### `AlphabetKeyboard.tsx`
- Renders interactive alphabet grid
- Manages letter selection state
- Handles guess submissions
- Props: `onLetterPress`, `guessedLetters`, `disabled`

#### `HangmanDrawing.tsx`
- Visual representation of hangman
- Updates based on wrong guess count
- SVG-based drawing for scalability
- Props: `wrongGuesses`, `maxGuesses`

#### `Navigation.tsx`
- Centralized screen routing logic
- Passes props between screens
- Handles screen transitions
- Props: `currentScreen`, `onScreenChange`, `onGameStart`

### Screen Components

Each screen follows this pattern:
- Interface definition with typed props
- Functional component with hooks
- Event handlers for user interactions
- StyleSheet for component styling
- Export as default

## State Management

### App-Level State (App.tsx)

```typescript
const [currentScreen, setCurrentScreen] = useState<GameScreen>('home');
const [gameWord, setGameWord] = useState<string>('');
const [gameResult, setGameResult] = useState<GameResult | null>(null);
const [isSinglePlayer, setIsSinglePlayer] = useState<boolean>(false);
```

### Game State (GameScreen.tsx)

```typescript
const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
const [wrongGuesses, setWrongGuesses] = useState(0);
const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
```

### State Flow Patterns

1. **Props down**: Parent components pass data to children
2. **Events up**: Child components notify parents of state changes
3. **Local state**: Components manage their own UI-specific state
4. **Derived state**: Calculate values from existing state

## API Integration

### Word Service (`src/utils/wordService.ts`)

The application integrates with the Wordnik Dictionary API for generating random words:

```typescript
export const getRandomWord = async (): Promise<string> => {
  try {
    // API call to Wordnik
    const response = await fetch('https://api.wordnik.com/...');
    return processedWord;
  } catch (error) {
    // Fallback to local word list
    return FALLBACK_WORDS[randomIndex];
  }
};
```

#### API Features
- **Rate limiting**: Handles API quotas gracefully
- **Offline support**: Falls back to local word list
- **Word validation**: Ensures only letter-based words
- **Length filtering**: 4-12 character words only

#### Fallback Strategy
When API fails or is unavailable:
1. Catches network/API errors
2. Falls back to curated local word list
3. Logs errors for debugging
4. Maintains seamless user experience

## Styling Approach

### Design System

The app uses a consistent design system with:

```typescript
// Color Palette
const colors = {
  primary: '#3498db',     // Blue
  secondary: '#e74c3c',   // Red
  success: '#27ae60',     // Green
  background: '#f0f8ff',  // Light Blue
  text: '#2c3e50',        // Dark Blue
  accent: '#34495e'       // Gray
};
```

### Styling Patterns

1. **StyleSheet.create()** for component styles
2. **Flexbox** for responsive layouts
3. **Platform-specific** adjustments when needed
4. **Consistent spacing** using multiples of 8px
5. **Shadow effects** for depth and hierarchy

### Responsive Design

- Flexible layouts using `flex` properties
- Percentage-based widths for buttons
- Safe area handling for notched devices
- Touch-friendly tap targets (44px minimum)

## Testing

### Testing Strategy (Future Implementation)

```typescript
// Example test structure
describe('GameScreen', () => {
  it('should handle letter guesses correctly', () => {
    // Test game logic
  });

  it('should detect win/lose conditions', () => {
    // Test game state changes
  });
});
```

### Recommended Testing Libraries
- **Jest**: JavaScript testing framework
- **React Native Testing Library**: Component testing
- **Detox**: End-to-end testing
- **Metro**: Code coverage reporting

## Troubleshooting

### Common Issues

#### Expo/Metro Issues
```bash
# Clear Metro cache
npx expo start --clear

# Reset Expo cache
npx expo install --fix
```

#### iOS Build Issues
```bash
# Rebuild iOS pods
cd ios && rm -rf Pods Podfile.lock
npx pod install
```

#### Android Build Issues
```bash
# Clean Android build
cd android && ./gradlew clean
cd .. && npx expo run:android
```

#### API Issues
- Check internet connectivity
- Verify API endpoint availability
- Review console logs for network errors
- Test with fallback word list

### Development Tips

1. **Hot Reload**: Save files to see instant updates
2. **Debug Menu**: Shake device or Cmd+D (iOS) / Cmd+M (Android)
3. **Console Logs**: Use React Native Flipper for debugging
4. **TypeScript**: Enable strict mode for better type checking

## Learning Resources

### React Native & Expo
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Express](https://www.reactnativeexpress.com/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Mobile Development
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design](https://material.io/design)

### Code Quality
- [ESLint React Native Rules](https://github.com/Intellicode/eslint-plugin-react-native)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

---

## Contributing

This is a training project, but contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is created for educational purposes. Feel free to use it as a learning resource.

---

**Happy Coding! 🎮📱**