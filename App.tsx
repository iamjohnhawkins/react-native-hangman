import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Navigation from './src/components/Navigation';
import { GameScreen } from './src/types';
import { getRandomWord } from './src/utils/wordService';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f8ff" />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('home');
  const [gameWord, setGameWord] = useState<string>('');
  const [gameResult, setGameResult] = useState<{ winner: 1 | 2; word: string } | null>(null);
  const [isSinglePlayer, setIsSinglePlayer] = useState<boolean>(false);

  const handleScreenChange = (screen: GameScreen) => {
    setCurrentScreen(screen);
  };

  const handleGameStart = (word: string) => {
    setGameWord(word);
    setIsSinglePlayer(false);
    setCurrentScreen('game');
  };

  const handleGameEnd = (winner: 1 | 2, word: string) => {
    setGameResult({ winner, word });
    setCurrentScreen('result');
  };

  const handleSinglePlayerStart = async () => {
    try {
      const randomWord = await getRandomWord();
      setGameWord(randomWord);
      setIsSinglePlayer(true);
      setCurrentScreen('game');
    } catch (error) {
      console.error('Failed to get random word:', error);
    }
  };

  const handlePlayAgain = async () => {
    if (isSinglePlayer) {
      await handleSinglePlayerStart();
    } else {
      setCurrentScreen('setup');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Navigation
          currentScreen="home"
          onScreenChange={handleScreenChange}
          onSinglePlayerStart={handleSinglePlayerStart}
        />;
      case 'setup':
        return (
          <Navigation
            currentScreen="setup"
            onScreenChange={handleScreenChange}
            onGameStart={handleGameStart}
          />
        );
      case 'game':
        const GameScreenComponent = require('./src/screens/GameScreen').default;
        return (
          <GameScreenComponent
            word={gameWord}
            onGameEnd={handleGameEnd}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'result':
        const ResultScreenComponent = require('./src/screens/ResultScreen').default;
        return (
          <ResultScreenComponent
            winner={gameResult?.winner}
            word={gameResult?.word}
            isSinglePlayer={isSinglePlayer}
            onPlayAgain={handlePlayAgain}
            onHome={() => setCurrentScreen('home')}
          />
        );
      default:
        return <Navigation currentScreen="home" onScreenChange={handleScreenChange} />;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
});

export default App;
