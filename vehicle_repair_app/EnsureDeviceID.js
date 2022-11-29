import { AsyncStorage } from '@react-native-community/async-storage';
import DeviceInfo from "react-native-device-info";
import md5 from "md5";

export var deviceID = null;
const getHash = (value) => {
    return md5(value);
};

const ensureDeviceID = async () => {
    if (!deviceID) {
        deviceID = await AsyncStorage.getItem("deviceID");
    }
    if (deviceID) {
        // if value is set by above function, or if value already exists
        return deviceID;
    }
    var id = await DeviceInfo.getUniqueId();
    if (!id || id === "unknown") {
        // ip address + user agent + timestamp
        const ip = await DeviceInfo.getIpAddress();
        const userAgent = await DeviceInfo.getUserAgent();
        const timestamp = Date.now();
        id = ip + userAgent + timestamp;
    }
    // hashing is for a unique value of constant length
    deviceID = getHash(id);
    // store in async storage
    AsyncStorage.setItem("deviceID", deviceID);
};

export const ensureLocationEnabled = async () => {
    const locationEnabled = await DeviceInfo.isLocationEnabled();
    return locationEnabled;
};

export default ensureDeviceID;