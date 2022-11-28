import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [myVar, setMyVar] = useState('Hello World');
  useEffect(() => {
    setMyVar('Hello World 2');
  }, []);
  return (
    <View style={styles.container}>
      <Text> {myVar} </Text>
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
});
