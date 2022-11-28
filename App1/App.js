import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';

export default function App() {
  const [myVar, setMyVar] = useState(1);
  const buttonClick = () => {
    setMyVar(2);
    alert(myVar);
  };
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={buttonClick} style={styles.button}>
        <Text> Value: {myVar} </Text>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
  },
});
