import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // In a development environment on the client, you can connect to the emulator
    try {
        auth.config.emulator = {
            host: 'localhost'
        };
    } catch(e) {
        //This can fail if the emulator is not running.
        console.error(e)
    }
}
auth.tenantId = 'nitheesh-garage.firebaseapp.com';

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
