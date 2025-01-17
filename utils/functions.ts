import { httpsCallable } from 'firebase/functions';
import { functions } from '@/config/firebase';

export const callFunction = async <T>(
  name: string,
  data?: any
): Promise<T> => {
  try {
    const functionRef = httpsCallable(functions, name);
    const result = await functionRef(data);
    return result.data as T;
  } catch (error) {
    console.error(`Error calling function ${name}:`, error);
    throw error;
  }
}; 