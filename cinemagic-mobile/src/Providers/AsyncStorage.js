import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataInStorage = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        throw Error(e.message);
    }
};

export const getDataFromStorage = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        throw Error(e.message);
    }
};
