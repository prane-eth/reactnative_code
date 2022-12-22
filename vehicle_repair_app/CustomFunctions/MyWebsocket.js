import WebSocket from "react-native-websocket";
import {
	backendURL,
	setServerStatus,
	serverStatus,
	requestingHelp,
	setRequestingHelp,
	readyToHelp,
	setReadyToHelp,
	deviceID,
	setDeviceID
} from "./StateVariables";

var ws;

export const statusTypes = {
	connectedToServer: "Connected to server",
	notConnectedToServer: "Not connected to server",
	connectingToServer: "Connecting to server",
};

export const connectServer = async () => {
	setServerStatus(statusTypes.connectingToServer);
	ws = new WebSocket(backendURL);
	ws.onopen = () => {
		setServerStatus(statusTypes.connectedToServer);
		ws.send("registerUser", deviceID);
	};
	ws.onmessage = (e) => {
		console.log("ws.onmessage: ", e.data);
		if (e.data == "startHelping") {
			setReadyToHelp(true);
		} else if (e.data == "stopHelping") {
			setReadyToHelp(false);
		} else if (e.data == "requestHelp") {
			setRequestingHelp(true);
		} else if (e.data == "cancelHelp") {
			setRequestingHelp(false);
		}
	};
	ws.onerror = (err) => {
		console.log("ws.onerror: ", err.message);
	};
	ws.onclose = (err) => {
		setServerStatus(statusTypes.notConnectedToServer);
		console.log("ws.onclose: ", err.code, err.reason);
	};
};
export const disconnectServer = () => {
	ws.send("close", deviceID);
};
export const reconnectServer = () => {
	disconnectServer();
	connectServer();
};

export const helpRequestFunction = () => {
	if (requestingHelp) {
		ws.send("cancelHelp", deviceID);
	} else {
		ws.send("requestHelp", deviceID);
	}
	setRequestingHelp(!requestingHelp);
};
export const helpOfferFunction = () => {
	if (readyToHelp) {
		ws.send("stopHelping", deviceID);
	} else {
		ws.send("startHelping", deviceID);
	}
	setReadyToHelp(!readyToHelp);
};


// export other variables from StateVariables.js
export {
	backendURL,
	setServerStatus,
	requestingHelp,
	setRequestingHelp,
	readyToHelp,
	setReadyToHelp,
	deviceID,
	setDeviceID,
	serverStatus,
}