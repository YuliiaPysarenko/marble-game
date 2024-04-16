import "./style.css";
import { Main, Login } from "./views";
import { initializeApp } from "firebase/app";
import {
  FIREBASE_CONFIG,
  UserContext,
  DBContext,
  RECORDS_PATH,
} from "./utils/firebase/const.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

export default function App() {
  const [userAuthData, setUserAuthData] = useState(null);
  const [user, setUser] = useState(null);

  const app = initializeApp(FIREBASE_CONFIG);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const db = getDatabase();

  const getRecordValue = (uid) => {
    const recordsRef = ref(db, RECORDS_PATH + uid);
    onValue(recordsRef, (responce) => {
      const data = responce.val();
      if (data) {
        setUser({
          ...userAuthData,
          publicName: data.publicName || data.displayName,
          record: data.record || null,
        });
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (responce) => {
      if (responce) {
        setUserAuthData({
          uid: responce.uid,
          displayName: responce.displayName,
        });
        getRecordValue(responce.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userAuthData && userAuthData.uid) {
      getRecordValue(userAuthData.uid);
    }
  }, [userAuthData]);

  return (
    <>
      {user ? (
        <DBContext.Provider value={db}>
          <UserContext.Provider value={user}>
            <Main />
          </UserContext.Provider>
        </DBContext.Provider>
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
}
