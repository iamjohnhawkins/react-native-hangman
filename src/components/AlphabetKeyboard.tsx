import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AlphabetKeyboardProps {
  guessedLetters: string[];
  onLetterPress: (letter: string) => void;
  disabled: boolean;
}

const AlphabetKeyboard: React.FC<AlphabetKeyboardProps> = ({
  guessedLetters,
  onLetterPress,
  disabled,
}) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const renderRow = (letters: string[]) => (
    <View style={styles.row}>
      {letters.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        return (
          <TouchableOpacity
            key={letter}
            style={[
              styles.key,
              isGuessed && styles.guessedKey,
              disabled && styles.disabledKey,
            ]}
            onPress={() => onLetterPress(letter)}
            disabled={isGuessed || disabled}
          >
            <Text style={[styles.keyText, isGuessed && styles.guessedKeyText]}>
              {letter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderRow(alphabet.slice(0, 9))}
      {renderRow(alphabet.slice(9, 18))}
      {renderRow(alphabet.slice(18, 26))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  key: {
    backgroundColor: '#3498db',
    marginHorizontal: 5, // Increased spacing for iPad
    paddingVertical: 16, // Larger touch targets for iPad
    paddingHorizontal: 12,
    borderRadius: 10,
    minWidth: 50, // Larger keys for iPad
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  guessedKey: {
    backgroundColor: '#95a5a6',
  },
  disabledKey: {
    backgroundColor: '#bdc3c7',
  },
  keyText: {
    color: '#ffffff',
    fontSize: 20, // Larger for iPad
    fontWeight: 'bold',
  },
  guessedKeyText: {
    color: '#7f8c8d',
  },
});

export default AlphabetKeyboard;