import { 
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  getDocs,
  DocumentData,
  Query,
  WhereFilterOp
} from 'firebase/firestore';
import { firestore } from '@/config/firebase';

export const createDocument = async <T extends object>(
  collectionName: string,
  data: T,
  id?: string
) => {
  try {
    const docRef = id 
      ? doc(firestore, collectionName, id)
      : doc(collection(firestore, collectionName));
    
    await setDoc(docRef, data);
    return docRef.id;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const updateDocument = async <T extends object>(
  collectionName: string,
  id: string,
  data: Partial<T>
) => {
  try {
    const docRef = doc(firestore, collectionName, id);
    await updateDoc(docRef, data as DocumentData);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, id: string) => {
  try {
    const docRef = doc(firestore, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const getDocument = async <T>(collectionName: string, id: string) => {
  try {
    const docRef = doc(firestore, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

export const queryDocuments = async <T>(
  collectionName: string,
  queries: Array<[string, WhereFilterOp, any]>
) => {
  try {
    const collectionRef = collection(firestore, collectionName);
    let queryRef: Query = query(
      collectionRef,
      ...queries.map(([field, operator, value]) => where(field, operator, value))
    );
    
    const snapshot = await getDocs(queryRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as (T & { id: string })[];
  } catch (error) {
    console.error('Error querying documents:', error);
    throw error;
  }
}; 