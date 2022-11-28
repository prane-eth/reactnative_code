import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [myVar, setMyVar] = useState('Hello World');
  useEffect(() => {
    setMyVar('Hello World 2');
  }, []);
  const buttonClick = () => {
    setMyVar('Hello World 3');
    alert(myVar);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={buttonClick}>
        <Text>{myVar}</Text>
      </TouchableOpacity>
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
