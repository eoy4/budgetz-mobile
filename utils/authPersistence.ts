import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'firebase/auth';

const AUTH_USER_KEY = '@auth_user';

export const persistUser = async (user: User | null) => {
  try {
    if (user) {
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem(AUTH_USER_KEY);
    }
  } catch (error) {
    console.error('Error persisting user:', error);
  }
};

export const getPersistedUser = async (): Promise<User | null> => {
  try {
    const userString = await AsyncStorage.getItem(AUTH_USER_KEY);
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error('Error getting persisted user:', error);
    return null;
  }
}; 