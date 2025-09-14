import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { GameState } from '../types';
import { createInitialGameState, makeGuess, getDisplayWord, getWrongLetters } from '../utils/gameLogic';
import HangmanDrawing from '../components/HangmanDrawing';
import AlphabetKeyboard from '../components/AlphabetKeyboard';

interface GameScreenProps {
  word?: string;
  onGameEnd: (winner: 1 | 2, word: string) => void;
  onBack: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ word = 'REACT', onGameEnd, onBack }) => {
  const [gameState, setGameState] = useState<GameState>(() => createInitialGameState(word));

  useEffect(() => {
    if (gameState.gameStatus !== 'playing') {
      setTimeout(() => {
        onGameEnd(gameState.winner || 1, gameState.word);
      }, 1500);
    }
  }, [gameState.gameStatus, gameState.winner, gameState.word, onGameEnd]);

  const handleLetterPress = (letter: string) => {
    const newGameState = makeGuess(gameState, letter);
    setGameState(newGameState);
  };

  const handleQuitGame = () => {
    Alert.alert(
      'Quit Game',
      'Are you sure you want to quit the current game?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Quit', style: 'destructive', onPress: onBack },
      ]
    );
  };

  const wrongLetters = getWrongLetters(gameState.word, gameState.guessedLetters);
  const displayWord = getDisplayWord(gameState.word, gameState.guessedLetters);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.quitButton} onPress={handleQuitGame}>
          <Text style={styles.quitButtonText}>Quit</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Hangman Game</Text>

        <View style={styles.placeholder} />
      </View>

      <View style={styles.playerIndicator}>
        <Text style={styles.playerText}>Player 2's Turn</Text>
        <Text style={styles.instructionText}>Guess the secret word!</Text>
      </View>

      <View style={styles.gameArea}>
        <HangmanDrawing wrongGuesses={gameState.wrongGuesses} />

        <View style={styles.wordContainer}>
          <Text style={styles.word}>{displayWord}</Text>
          <Text style={styles.wordHint}>
            {gameState.word.length} letters
          </Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Wrong guesses: {gameState.wrongGuesses} / {gameState.maxWrongGuesses}
        </Text>
        {wrongLetters.length > 0 && (
          <Text style={styles.wrongLetters}>
            Wrong letters: {wrongLetters.join(', ')}
          </Text>
        )}
      </View>

      {gameState.gameStatus === 'playing' ? (
        <AlphabetKeyboard
          guessedLetters={gameState.guessedLetters}
          onLetterPress={handleLetterPress}
          disabled={false}
        />
      ) : (
        <View style={styles.gameEndContainer}>
          <Text style={[
            styles.gameEndText,
            gameState.gameStatus === 'won' ? styles.winText : styles.loseText
          ]}>
            {gameState.gameStatus === 'won' ? '🎉 Player 2 Wins!' : '💀 Player 1 Wins!'}
          </Text>
          <Text style={styles.revealText}>
            The word was: {gameState.word}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  quitButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  quitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  placeholder: {
    width: 60,
  },
  playerIndicator: {
    backgroundColor: '#9b59b6',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  playerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 14,
    color: '#ffffff',
  },
  gameArea: {
    alignItems: 'center',
    marginBottom: 20,
  },
  wordContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    letterSpacing: 4,
    fontFamily: 'Courier',
  },
  wordHint: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 10,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: 'bold',
  },
  wrongLetters: {
    fontSize: 14,
    color: '#e74c3c',
    marginTop: 5,
  },
  gameEndContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gameEndText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  winText: {
    color: '#27ae60',
  },
  loseText: {
    color: '#e74c3c',
  },
  revealText: {
    fontSize: 18,
    color: '#34495e',
  },
});

export default GameScreen;