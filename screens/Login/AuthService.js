import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSession = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getSession = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};