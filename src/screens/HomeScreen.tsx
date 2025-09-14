import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HomeScreenProps {
  onStartGame: () => void;
  onStartSinglePlayer: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame, onStartSinglePlayer }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Hangman Game</Text>
      <Text style={styles.subtitle}>Challenge Friends or Play Solo!</Text>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>How to Play:</Text>
        <Text style={styles.instructionText}>• Guess the secret word letter by letter</Text>
        <Text style={styles.instructionText}>• Wrong guesses add parts to the hangman</Text>
        <Text style={styles.instructionText}>• Win by guessing the word first!</Text>
        <Text style={styles.instructionText}>• Don't let the hangman complete!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={onStartGame}>
          <Text style={styles.startButtonText}>Two Player Game</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.startButton, styles.singlePlayerButton]} onPress={onStartSinglePlayer}>
          <Text style={styles.startButtonText}>Single Player</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 40, // Increased for iPad
  },
  title: {
    fontSize: 64, // Larger for iPad
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 32, // Larger for iPad
    color: '#34495e',
    marginBottom: 60,
  },
  instructionsContainer: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 15,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructions: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  instructionText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flex: 0.45,
  },
  singlePlayerButton: {
    backgroundColor: '#e74c3c',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;