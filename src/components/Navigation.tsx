import React from 'react';
import { View } from 'react-native';
import { GameScreen } from '../types';
import HomeScreen from '../screens/HomeScreen';
import SetupScreen from '../screens/SetupScreen';

interface NavigationProps {
  currentScreen: GameScreen;
  onScreenChange: (screen: GameScreen) => void;
  onGameStart?: (word: string) => void;
  onSinglePlayerStart?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, onScreenChange, onGameStart, onSinglePlayerStart }) => {
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen
          onStartGame={() => onScreenChange('setup')}
          onStartSinglePlayer={onSinglePlayerStart || (() => {})}
        />;
      case 'setup':
        return <SetupScreen
          onGameStart={onGameStart || (() => onScreenChange('game'))}
          onBack={() => onScreenChange('home')}
        />;
      default:
        return <HomeScreen
          onStartGame={() => onScreenChange('setup')}
          onStartSinglePlayer={onSinglePlayerStart || (() => {})}
        />;
    }
  };

  return <View style={{ flex: 1 }}>{renderScreen()}</View>;
};

export default Navigation;