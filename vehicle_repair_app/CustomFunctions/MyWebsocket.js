import { useState } from "react"
import WebSocket from "react-native-websocket"
import AsyncStorage from "@react-native-async-storage/async-storage"

var serverStatus, setServerStatus, requestingHelp, 
    setRequestingHelp, readyToHelp, setReadyToHelp,
    ws

export const initWebSocket = (
	serverStatusState, setServerStatusState, requestingHelpState,
	setRequestingHelpState, readyToHelpState, setReadyToHelpState
) => {
	serverStatus = serverStatusState
	setServerStatus = setServerStatusState
	requestingHelp = requestingHelpState
	setRequestingHelp = setRequestingHelpState
	readyToHelp = readyToHelpState
	setReadyToHelp = setReadyToHelpState
}

export const connectServer = async () => {
	const deviceID = await AsyncStorage.getItem("deviceID")
	ws = new WebSocket("ws://localhost:8080")
	ws.onopen = () => {
		setServerStatus("Connected to server")
		ws.send("registerUser", deviceID)
	}
	ws.onmessage = (e) => {
		console.log("ws.onmessage: ", e.data)
		if (e.data == "startHelping") {
			setReadyToHelp(true)
		} else if (e.data == "stopHelping") {
			setReadyToHelp(false)
		} else if (e.data == "requestHelp") {
			setRequestingHelp(true)
		} else if (e.data == "cancelHelp") {
			setRequestingHelp(false)
		}
	}
	ws.onerror = (err) => {
		console.log("ws.onerror: ", err.message)
	}
	ws.onclose = (err) => {
		setServerStatus("Not connected to server")
		console.log("ws.onclose: ", err.code, err.reason)
	}
}
export const reconnectServer = () => {
	ws.close()
	connectServer()
}

export const requestHelp = () => {
	if (requestingHelp) {
		ws.send("cancelHelp", deviceID)
	} else {
		ws.send("requestHelp", deviceID)
	}
	setRequestingHelp(!requestingHelp)
}
export const startHelping = () => {
	if (readyToHelp) {
		ws.send("stopHelping", deviceID)
	} else {
		ws.send("startHelping", deviceID)
	}
	setReadyToHelp(!readyToHelp)
}
