import { initializeApp } from "firebase/app";
import { createContext } from "react";
import { getDatabase, ref } from "firebase/database";

export const FIREBASE_CONFIG = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  databaseURL: process.env.VITE_DATABASE_URL,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID,
  measurementId: process.env.VITE_MEASUREMENT_ID,
};

export const RECORDS_PATH = 'records/';

export const UserContext = createContext(null);
export const DBContext = createContext(null);

initializeApp(FIREBASE_CONFIG);
export const db = getDatabase();
export const allRecordsRef = ref(db, RECORDS_PATH);