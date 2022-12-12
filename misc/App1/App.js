import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function App() {
  const [myVar, setMyVar] = useState(1);
  const buttonClick = () => {
    setMyVar(2);
    alert(myVar);
  };
  const [animating, setAnimating] = useState(true);
  var closeActivityIndicator = () => {
    setTimeout(() => {
      setAnimating(false);
    }, 5000);
  };
  useEffect(() => {
    closeActivityIndicator();
  }, []);
  
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color="#bc2b78"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
  // return (
  //   <View style={styles.container}>
  //     <TouchableNativeFeedback onPress={buttonClick} style={styles.button}>
  //       <Text> Value: {myVar} </Text>
  //     </TouchableNativeFeedback>
  //   </View>
  // );
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
