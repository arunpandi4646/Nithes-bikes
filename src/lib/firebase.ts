import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAYjTRGQouFgSJJ689XwKN14fFfsMfK26M",
  authDomain: "studio-398059978-802b3.firebaseapp.com",
  projectId: "studio-398059978-802b3",
  storageBucket: "studio-398059978-802b3.firebasestorage.app",
  messagingSenderId: "783407561608",
  appId: "1:783407561608:web:846006efb8aedb500ad83d"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
