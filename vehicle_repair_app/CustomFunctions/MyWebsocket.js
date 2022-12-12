import WebSocket from "react-native-websocket"

var serverStatus,
	setServerStatus,
	requestingHelp,
	setRequestingHelp,
	readyToHelp,
	setReadyToHelp,
	deviceID, ws

export const initWebSocket = (
	serverStatusState,
	setServerStatusState,
	requestingHelpState,
	setRequestingHelpState,
	readyToHelpState,
	setReadyToHelpState,
    deviceIDState
) => {
	serverStatus = serverStatusState
	setServerStatus = setServerStatusState
	requestingHelp = requestingHelpState
	setRequestingHelp = setRequestingHelpState
	readyToHelp = readyToHelpState
	setReadyToHelp = setReadyToHelpState
    deviceID = deviceIDState
}

export const serverStatuses = {
    connectedToServer: "Connected to server",
    notConnectedToServer: "Not connected to server",
    connectingToServer: "Connecting to server"
}

export const connectServer = async () => {
    setServerStatus(connectingToServer)
	ws = new WebSocket("ws://localhost:8080")
	ws.onopen = () => {
		setServerStatus(connectedToServer)
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
		setServerStatus(notConnectedToServer)
		console.log("ws.onclose: ", err.code, err.reason)
	}
}
export const disconnectServer = () => {
	ws.send("close", deviceID)
}
export const reconnectServer = () => {
	disconnectServer()
	connectServer()
}

export const helpRequestFunction = () => {
	if (requestingHelp) {
		ws.send("cancelHelp", deviceID)
	} else {
		ws.send("requestHelp", deviceID)
	}
	setRequestingHelp(!requestingHelp)
}
export const helpOfferFunction = () => {
	if (readyToHelp) {
		ws.send("stopHelping", deviceID)
	} else {
		ws.send("startHelping", deviceID)
	}
	setReadyToHelp(!readyToHelp)
}
