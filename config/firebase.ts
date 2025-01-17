import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyDIjW8Ylc3CqgnEUD-3JhUI457XHuYbkOE",
  authDomain: "budgetz-b4b64.firebaseapp.com",
  projectId: "budgetz-b4b64",
  storageBucket: "budgetz-b4b64.firebasestorage.app",
  messagingSenderId: "965604344493",
  appId: "1:965604344493:web:acaae3344466f3eca97c24"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);

export { app, auth, firestore, functions }; 