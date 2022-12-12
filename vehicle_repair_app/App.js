import { StatusBar } from "expo-status-bar"
import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import {
	ensureDeviceID,
	ensureLocationEnabled,
} from "./CustomFunctions/DeviceFunctions"
import {
	connectServer,
    reconnectServer,
    initWebSocket,
} from "./CustomFunctions/MyWebsocket"

export default function App() {
    const [registrationStatus, setRegistrationStatus] = useState(null)
    const [serverStatus, setServerStatus] = useState(false)
    const [requestingHelp, setRequestingHelp] = useState(false)
    const [readyToHelp, setReadyToHelp] = useState(false)
    initWebSocket(
        serverStatus, setServerStatus, requestingHelp,
        setRequestingHelp, readyToHelp, setReadyToHelp
    )

	useEffect(() => {
		ensureDeviceID()
		ensureLocationEnabled()
        connectServer()
        AsyncStorage.getItem("registrationStatus").then((value) => {
            setRegistrationStatus(value)
        })
		// on page close, close websocket
		return () => {
			ws.close()
		}
    }, [])

    // when registrationStatus changes, store it in AsyncStorage
    useEffect(() => {
        AsyncStorage.setItem("registrationStatus", registrationStatus)
    }, [registrationStatus])
	return registrationStatus ? (
		<View style={styles.container}>
			<StatusBar style="auto" />
			{/* circle filled with color depending on server status */}
			<div
				style={serverStatus == "Connected to server" ? "green" : "red"}
			></div>
			<Text onPress={reconnectServer}> serverStatus </Text>
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
	) : (
		<View style={styles.container}>
			{/* register as user or helper buttons */}
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					setRegistrationStatus("user")
				}}
			>
				<Text style={styles.buttonText}> Register as User </Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					setRegistrationStatus("helper")
				}}
			>
				<Text style={styles.buttonText}> Register as Helper </Text>
			</TouchableOpacity>
		</View>
	)
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
	redCircle: {
		width: 50,
		height: 50,
		borderRadius: 50,
		backgroundColor: "red",
	},
	greenCircle: {
		width: 50,
		height: 50,
		borderRadius: 50,
		backgroundColor: "green",
	},
})
