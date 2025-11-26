import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSCFnbac7MsV4xDdD-gx_CG_4q6mGUEMI",
  authDomain: "nitheesh-garage.firebaseapp.com",
  projectId: "nitheesh-garage",
  storageBucket: "nitheesh-garage.firebasestorage.app",
  messagingSenderId: "839936311214",
  appId: "1:839936311214:web:52fcc205e21e1bb7ced23f",
  measurementId: "G-TZQQKCZ8T2"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
