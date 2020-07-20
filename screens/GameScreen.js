import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
} from 'react-native';
import { NumberContainer } from '../components/NumberContainer';
import { Card } from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }

  return rndNum;
};

export const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;

  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, onGameOver, userChoice]);

  const nextGuesHandler = (direction) => {
    if ((direction === 'lower' && currentGuess < userChoice)
      || (direction === 'greater' && currentGuess > userChoice)) {
      Alert.alert(
        'Don\'t lie!',
        'You know that this is wrong..',
        [{ text: 'Sorry', style: 'cancel' }]
      );
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds((curRounds) => curRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent&lsquo;s guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="LOWER" onPress={() => nextGuesHandler('lower')} />
        </View>
        <View style={styles.button}>
          <Button title="GREATER" onPress={() => nextGuesHandler('greater')} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
  },
  button: {
    width: '40%',
  },
});
