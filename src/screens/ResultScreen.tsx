import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ResultScreenProps {
  winner?: 1 | 2;
  word?: string;
  isSinglePlayer?: boolean;
  onPlayAgain: () => void;
  onHome: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  winner = 1,
  word = 'REACT',
  isSinglePlayer = false,
  onPlayAgain,
  onHome,
}) => {
  const isPlayer2Win = winner === 2;

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, isPlayer2Win ? styles.winCard : styles.loseCard]}>
        <Text style={styles.resultEmoji}>
          {isPlayer2Win ? '🎉' : '💀'}
        </Text>

        <Text style={styles.resultTitle}>
          {isSinglePlayer
            ? (isPlayer2Win ? 'You Win!' : 'Game Over!')
            : (isPlayer2Win ? 'Player 2 Wins!' : 'Player 1 Wins!')
          }
        </Text>

        <Text style={styles.resultSubtitle}>
          {isSinglePlayer
            ? (isPlayer2Win
              ? 'Great guessing! You found the word!'
              : 'The hangman is complete! Better luck next time!'
            )
            : (isPlayer2Win
              ? 'Great guessing! You found the word!'
              : 'The word was too tricky to guess!'
            )
          }
        </Text>

        <View style={styles.wordReveal}>
          <Text style={styles.wordLabel}>The word was:</Text>
          <Text style={styles.revealedWord}>{word}</Text>
        </View>

        {!isSinglePlayer && (
          <View style={styles.scoreContainer}>
            <View style={[styles.playerScore, winner === 1 && styles.winnerScore]}>
              <Text style={styles.playerName}>Player 1</Text>
              <Text style={styles.playerRole}>(Word Setter)</Text>
              {winner === 1 && <Text style={styles.winnerLabel}>Winner! 🏆</Text>}
            </View>

            <Text style={styles.vs}>VS</Text>

            <View style={[styles.playerScore, winner === 2 && styles.winnerScore]}>
              <Text style={styles.playerName}>Player 2</Text>
              <Text style={styles.playerRole}>(Guesser)</Text>
              {winner === 2 && <Text style={styles.winnerLabel}>Winner! 🏆</Text>}
            </View>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.playAgainButton} onPress={onPlayAgain}>
          <Text style={styles.playAgainButtonText}>Play Again</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={onHome}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
    justifyContent: 'center',
  },
  resultCard: {
    backgroundColor: '#ffffff',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  winCard: {
    borderWidth: 3,
    borderColor: '#27ae60',
  },
  loseCard: {
    borderWidth: 3,
    borderColor: '#e74c3c',
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  resultSubtitle: {
    fontSize: 18,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 30,
  },
  wordReveal: {
    backgroundColor: '#ecf0f1',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  wordLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  revealedWord: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    letterSpacing: 2,
    fontFamily: 'Courier',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  playerScore: {
    alignItems: 'center',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
  },
  winnerScore: {
    backgroundColor: '#d5f4e6',
    borderWidth: 2,
    borderColor: '#27ae60',
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  playerRole: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  winnerLabel: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: 'bold',
    marginTop: 5,
  },
  vs: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#95a5a6',
    marginHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  playAgainButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  playAgainButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#95a5a6',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  homeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultScreen;