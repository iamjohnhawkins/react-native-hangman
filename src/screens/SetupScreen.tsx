import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface SetupScreenProps {
  onGameStart: (word: string) => void;
  onBack: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onGameStart, onBack }) => {
  const [word, setWord] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleStartGame = () => {
    const cleanWord = word.trim().toUpperCase();

    if (cleanWord.length < 3) {
      Alert.alert('Invalid Word', 'Please enter a word with at least 3 letters');
      return;
    }

    if (!/^[A-Z]+$/.test(cleanWord)) {
      Alert.alert('Invalid Word', 'Please enter only letters (no numbers or special characters)');
      return;
    }

    onGameStart(cleanWord);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Game Setup</Text>

      <View style={styles.playerIndicator}>
        <Text style={styles.playerText}>Player 1's Turn</Text>
        <Text style={styles.instructionText}>Enter a secret word for Player 2 to guess</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Secret Word:</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={word}
            onChangeText={setWord}
            placeholder="Enter your word here..."
            autoCapitalize="characters"
            autoCorrect={false}
            secureTextEntry={!showPassword}
            maxLength={15}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.hint}>
          • 3-15 letters only
          • No numbers or special characters
          • Word will be hidden from Player 2
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.startButton, !word.trim() && styles.disabledButton]}
        onPress={handleStartGame}
        disabled={!word.trim()}
      >
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 40,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#3498db',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 30,
  },
  playerIndicator: {
    backgroundColor: '#e74c3c',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  playerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    padding: 15,
    paddingRight: 50,
    fontSize: 18,
    backgroundColor: '#ecf0f1',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
  },
  eyeIcon: {
    fontSize: 20,
  },
  hint: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SetupScreen;