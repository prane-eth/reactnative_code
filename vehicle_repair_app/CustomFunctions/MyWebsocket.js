import { useState } from "react";

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
    };
    ws.onerror = (e) => {
        console.log("ws.onerror: ", e.message);
    };
    ws.onclose = (e) => {
        setServerStatus("Not connected to server");
        console.log("ws.onclose: ", e.code, e.reason);
    };
};
export const reconnectServer = () => {
    ws.close();
    connectServer();
};

export const requestHelp = () => {
    if (requestingHelp) {
        // deviceID
    } else {
        ws.send("requestHelp", deviceID);
    }
    setRequestingHelp(!requestingHelp);
};
export const startHelping = () => {
    if (readyToHelp) {
    } else {
    }
    setReadyToHelp(!readyToHelp);
};
