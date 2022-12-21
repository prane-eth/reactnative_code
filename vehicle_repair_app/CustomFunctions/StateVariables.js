import { useState } from 'react'

const backendURL = "ws://localhost:8080"
const [registrationStatus, setRegistrationStatus] = useState(null)
const [serverStatus, setServerStatus] = useState("Not connected to server")
const [requestingHelp, setRequestingHelp] = useState(false)
const [readyToHelp, setReadyToHelp] = useState(false)
const [deviceID, setDeviceID] = useState(null)

module.exports = {
	backendURL,
	registrationStatus,
	setRegistrationStatus,
	serverStatus,
	setServerStatus,
	requestingHelp,
	setRequestingHelp,
	readyToHelp,
	setReadyToHelp,
	deviceID,
	setDeviceID,
}