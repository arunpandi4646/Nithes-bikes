import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYjTRGQouFgSJJ689XwKN14fFfsMfK26M",
  authDomain: "studio-398059978-802b3.firebaseapp.com",
  projectId: "studio-398059978-802b3",
  storageBucket: "studio-398059978-802b3.firebasestorage.app",
  messagingSenderId: "783407561608",
  appId: "1:783407561608:web:846006efb8aedb500ad83d"
};

type FirebaseInstances = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
};

let firebaseInstances: FirebaseInstances | null = null;

export const initializeFirebase = (): FirebaseInstances => {
  if (firebaseInstances) {
    return firebaseInstances;
  }

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  firebaseInstances = { app, auth, db };
  return firebaseInstances;
};


export const { app, auth, db } = initializeFirebase();
