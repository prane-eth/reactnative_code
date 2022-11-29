import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ensureDeviceID, { deviceID } from './EnsureDeviceID';

export default function App() {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [location, setLocation] = useState(null);
  const [requestingHelp, setRequestingHelp] = useState(false);
  const [readyToHelp, setReadyToHelp] = useState(false);
  const requestHelp = () => {
    if (requestingHelp) {
    } else {
    }
    setRequestingHelp(!requestingHelp);
  };
  const startHelping = () => {
    if (readyToHelp) {
    } else {
    }
    setReadyToHelp(!readyToHelp);
  };
  useEffect(() => {
    ensureDeviceID();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {
        requestingHelp ?
          <TouchableOpacity style={[styles.button, styles.redButton]} onPress={requestHelp}>
            <Text style={styles.buttonText}> Cancel Help </Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.button} onPress={requestHelp}>
            <Text style={styles.buttonText}> Request Help </Text>
          </TouchableOpacity>
      }
      {
        readyToHelp ?
          <TouchableOpacity style={[styles.button, styles.redButton]} onPress={startHelping}>
            <Text style={styles.buttonText}> Stop Helping </Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.button} onPress={startHelping}>
            <Text style={styles.buttonText}> Start Helping </Text>
          </TouchableOpacity>
      }
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
    backgroundColor: 'orange',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  redButton: {
    backgroundColor: 'red',
  },
});
