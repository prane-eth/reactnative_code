import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ensureDeviceID, {
    deviceID,
    ensureLocationEnabled,
} from "./EnsureDeviceID";
import WebSocket from "react-native-websocket";

export default function App() {
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [location, setLocation] = useState(null);
    const [serverConnected, setServerConnected] = useState(false);
    const [requestingHelp, setRequestingHelp] = useState(false);
    const [readyToHelp, setReadyToHelp] = useState(false);
    var ws;

    const requestHelp = () => {
        if (requestingHelp) {
            // deviceID
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
    const disconnectServer = () => {
        ws.close();
        setServerConnected(false);
    };
    const connectServer = () => {
        ws = new WebSocket("ws://localhost:8080");
        ws.onopen = () => {
            setServerConnected(true);
            ws.send("Hello!");
        };
        ws.onmessage = (e) => {
            console.log("ws.onmessage: ", e.data);
        };
        ws.onerror = (e) => {
            // an error occurred
            console.log(e.message);
        };
        ws.onclose = (e) => {
            setServerConnected(false);
            console.log("ws.onclose: ", e.code, e.reason);
        };
    };
    const reconnectServer = () => {
        disconnectServer();
        connectServer();
    };

    useEffect(() => {
        ensureDeviceID();
        ensureLocationEnabled();
        connectServer();
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text onPress={reconnectServer}>
                {serverConnected
                    ? "Connected to server"
                    : "Not connected to server"}
            </Text>
            {requestingHelp ? (
                <TouchableOpacity
                    style={[styles.button, styles.redButton]}
                    onPress={requestHelp}
                >
                    <Text style={styles.buttonText}> Cancel Help </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.button} onPress={requestHelp}>
                    <Text style={styles.buttonText}> Request Help </Text>
                </TouchableOpacity>
            )}
            {readyToHelp ? (
                <TouchableOpacity
                    style={[styles.button, styles.redButton]}
                    onPress={startHelping}
                >
                    <Text style={styles.buttonText}> Stop Helping </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.button} onPress={startHelping}>
                    <Text style={styles.buttonText}> Start Helping </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "orange",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    redButton: {
        backgroundColor: "red",
    },
});
