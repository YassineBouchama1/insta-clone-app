import AsyncStorage from '@react-native-async-storage/async-storage';

// function to store data in AsyncStorage
export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

// fun to retrieve data from AsyncStorage
export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading data:', e);
    return null;
  }
};


// func to remove data from AsyncStorage
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data with key "${key}" removed successfully.`);
  } catch (e) {
    console.error('Error removing data:', e);
  }
};