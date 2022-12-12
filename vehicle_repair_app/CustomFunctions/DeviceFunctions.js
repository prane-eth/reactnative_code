import { Platform } from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"
import DeviceInfo from "react-native-device-info"
import md5 from "md5"

const getHash = (value) => {
	return md5(value)
}

export const ensureDeviceID = async () => {
	if (!deviceID) {
		deviceID = await AsyncStorage.getItem("deviceID")
	}
	if (deviceID) {
		// if value is set by above function, or if value already exists
		return deviceID
	}
	var id = await DeviceInfo.getUniqueId()
	if (!id || id === "unknown") {
		// ip address + user agent + timestamp
		const ipAddress = await DeviceInfo.getIpAddress()
		const userAgent = await DeviceInfo.getUserAgent()
		const os = Platform.OS
		const batteryLevel = await DeviceInfo.getBatteryLevel()
		const timestamp = Date.now()
		id = ipAddress + userAgent + os + batteryLevel + timestamp
	}
	// hashing is for a unique value of constant length
	var deviceID = getHash(id)
	// store in async storage
	AsyncStorage.setItem("deviceID", deviceID)
}

export const ensureLocationEnabled = async () => {
	if (Platform.OS === "ios" || Platform.OS === "android") {
	}
	const locationEnabled = await DeviceInfo.isLocationEnabled()
	if (!locationEnabled) {
		var res = await DeviceInfo.getAvailableLocationProviders()
		console.log(res)
	}
	return locationEnabled
}
