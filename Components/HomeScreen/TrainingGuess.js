import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import { guess } from '../../Actions/TrainingActions';
import {
  GUESS_BUBBLE_WIDTH,
  TRAINING_GUESS_BUBBLE_POSITION_LEFT,
  TRAINING_GUESS_BUBBLE_POSITION_TOP,
} from '../../layoutConsts';

export default function TrainingGuess(props) {
  const trainingGuess = useSelector((state) => state.training.guess);
  const [displayGuess, setDisplayGuess] = useState('');
  const ellipses = useEffect(() => {
    if (trainingGuess !== null) {
      ellipse(1);
    }
  }, [trainingGuess]);

  const ellipse = (counter) => {
    if (counter < 6) {
      setTimeout(() => ellipse(counter + 1), 1000 / 6);
    } else {
      setTimeout(() => setDisplayGuess(trainingGuess + '?'));
    }
    setDisplayGuess('.'.repeat((counter % 3) + 1));
  };
  return trainingGuess === null ? null : (
    <View style={styles.guessBubble}>
      <Text style={styles.guessText}>{displayGuess}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  guessBubble: {
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: TRAINING_GUESS_BUBBLE_POSITION_TOP,
    left: TRAINING_GUESS_BUBBLE_POSITION_LEFT,
    width: GUESS_BUBBLE_WIDTH,
    alignItems: 'center',
  },
  guessText: {
    fontSize: 30,
    color: '#998200',
  },
});
