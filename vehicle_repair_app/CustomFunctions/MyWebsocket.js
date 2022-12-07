import { useState } from "react";
import WebSocket from "react-native-websocket";

export const [serverStatus, setServerStatus] = useState(false);
export const [requestingHelp, setRequestingHelp] = useState(false);
export const [readyToHelp, setReadyToHelp] = useState(false);

export var ws;
export const connectServer = () => {
    ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
        setServerStatus("Connected to server");
        ws.send("Hello!");
    };
    ws.onmessage = (err) => {
        console.log("ws.onmessage: ", err.data);
    };
    ws.onerror = (err) => {
        console.log("ws.onerror: ", err.message);
    };
    ws.onclose = (err) => {
        setServerStatus("Not connected to server");
        console.log("ws.onclose: ", err.code, err.reason);
    };
};
export const reconnectServer = () => {
    ws.close();
    connectServer();
};

export const requestHelp = () => {
    if (requestingHelp) {
        ws.send("cancelHelp", deviceID);
    } else {
        ws.send("requestHelp", deviceID);
    }
    setRequestingHelp(!requestingHelp);
};
export const startHelping = () => {
    if (readyToHelp) {
        ws.send("stopHelping", deviceID);
    } else {
        ws.send("startHelping", deviceID);
    }
    setReadyToHelp(!readyToHelp);
};
