import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Colors from '../constants/colors';

export const GameOverScreen = (props) => {
  const { rounds, userNumber, onStart } = props;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>The Game is Over</Text>
      <Text>{`Number of attempts: ${rounds}`}</Text>
      <Text>{`Number was: ${userNumber}`}</Text>
      <Button
        title="Play again"
        onPress={() => onStart(null)}
        color={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
  },
});
