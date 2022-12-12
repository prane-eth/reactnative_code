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
