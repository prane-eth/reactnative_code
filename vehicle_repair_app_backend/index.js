const http = require("http");
const WebSocket = require("ws");
const express = require("express");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
    const userTasks = ["requestHelp", "cancelHelp"]
    const helperTasks = ["startHelping", "stopHelping"]
    const usersClients = []
    const helpersClients = []
    const availableRequests = []
    const availableOffers = []

    ws.on("registerUser", function incoming(message) {
        const deviceID = message.toString()
        console.log("registerUser: ", deviceID)
        helpersClients = helpersClients.filter((client) => client != deviceID)
        usersClients.push(deviceID)
    })
    ws.on("registerHelper", function incoming(message) {
        const deviceID = message.toString()
        console.log("registerHelper: ", deviceID)
        usersClients = usersClients.filter((client) => client != deviceID)
        helpersClients.push(deviceID)
    })
    ws.on("deregister", function incoming(message) {
        const deviceID = message.toString()
        console.log("deregister: ", deviceID)
        usersClients = usersClients.filter((client) => client != deviceID)
        helpersClients = helpersClients.filter((client) => client != deviceID)
    })
    ws.on("close", function close(message) {
        const deviceID = message.toString()
        availableRequests = availableRequests.filter((request) => request != deviceID)
        availableOffers = availableOffers.filter((offer) => offer != deviceID)
        console.log("disconnected client: ", deviceID)
    })
    userTasks.forEach((task) => {
        ws.on(task, function incoming(message) {
            const deviceID = message.toString()
            console.log(deviceID)
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    // send the message to only helpers
                    if (helpersClients.includes(deviceID)) {
                        client.send(task, deviceID)
                    }
                } else {
                    client.close()
                    wss.clients.delete(client)
                }
            })
        })
    })
    helperTasks.forEach((task) => {
        ws.on(task, function incoming(message) {
            const deviceID = message.toString()
            console.log(deviceID)
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    // send the message to only users
                    if (usersClients.includes(deviceID)) {
                        client.send(task, deviceID)
                    }
                } else {
                    client.close()
                    wss.clients.delete(client)
                }
            })
        })
    })
})

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

server.listen(8080, () => {
    console.log("Listening to port 8080");
});
