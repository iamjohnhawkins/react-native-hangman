import React from 'react';
import { View, StyleSheet } from 'react-native';

interface HangmanDrawingProps {
  wrongGuesses: number;
}

const HangmanDrawing: React.FC<HangmanDrawingProps> = ({ wrongGuesses }) => {
  return (
    <View style={styles.container}>
      <View style={styles.gallows}>
        {/* Base */}
        <View style={[styles.line, styles.base]} />

        {/* Pole */}
        <View style={[styles.line, styles.pole]} />

        {/* Top beam */}
        <View style={[styles.line, styles.topBeam]} />

        {/* Noose */}
        <View style={[styles.line, styles.noose]} />

        {/* Head */}
        {wrongGuesses >= 1 && <View style={[styles.bodyPart, styles.head]} />}

        {/* Body */}
        {wrongGuesses >= 2 && <View style={[styles.line, styles.body]} />}

        {/* Left arm */}
        {wrongGuesses >= 3 && <View style={[styles.line, styles.leftArm]} />}

        {/* Right arm */}
        {wrongGuesses >= 4 && <View style={[styles.line, styles.rightArm]} />}

        {/* Left leg */}
        {wrongGuesses >= 5 && <View style={[styles.line, styles.leftLeg]} />}

        {/* Right leg */}
        {wrongGuesses >= 6 && <View style={[styles.line, styles.rightLeg]} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
  },
  gallows: {
    position: 'relative',
    height: 180,
    width: 150,
  },
  line: {
    backgroundColor: '#8B4513',
    position: 'absolute',
  },
  bodyPart: {
    position: 'absolute',
  },
  base: {
    bottom: 0,
    left: 0,
    width: 100,
    height: 4,
  },
  pole: {
    bottom: 0,
    left: 10,
    width: 4,
    height: 150,
  },
  topBeam: {
    top: 30,
    left: 10,
    width: 80,
    height: 4,
  },
  noose: {
    top: 30,
    left: 86,
    width: 4,
    height: 25,
  },
  head: {
    top: 55,
    left: 70,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#2c3e50',
    backgroundColor: '#f39c12',
  },
  body: {
    top: 85,
    left: 82,
    width: 4,
    height: 50,
    backgroundColor: '#2c3e50',
  },
  leftArm: {
    top: 100,
    left: 60,
    width: 25,
    height: 3,
    backgroundColor: '#2c3e50',
    transform: [{ rotate: '30deg' }],
  },
  rightArm: {
    top: 100,
    left: 84,
    width: 25,
    height: 3,
    backgroundColor: '#2c3e50',
    transform: [{ rotate: '-30deg' }],
  },
  leftLeg: {
    top: 130,
    left: 65,
    width: 20,
    height: 3,
    backgroundColor: '#2c3e50',
    transform: [{ rotate: '45deg' }],
  },
  rightLeg: {
    top: 130,
    left: 84,
    width: 20,
    height: 3,
    backgroundColor: '#2c3e50',
    transform: [{ rotate: '-45deg' }],
  },
});

export default HangmanDrawing;