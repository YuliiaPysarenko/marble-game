import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from "firebase/auth";
import { allRecordsRef } from "./const";
import { onValue } from "firebase/database";

export const logIn = (auth, provider) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const logOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export const getAllRecords = (setRecordsList) => {
  let records = null;
  onValue(allRecordsRef, (responce) => {
    const data = responce.val();
    if (Object.values(data)) {
      const filteredData = Object.values(data).filter((item) => item.record);
      const sortedData = Object.values(filteredData).sort(
        (a, b) => Number(a.record) - Number(b.record)
      );
      setRecordsList(Object.values(sortedData));
    }
  });
  return records;
};
