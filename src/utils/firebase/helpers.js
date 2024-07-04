import { FIREBASE_CONFIG, allRecordsRef } from "./const";
import { getDatabase, onValue } from "firebase/database";

import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

firebase.initializeApp(FIREBASE_CONFIG);
const db = getDatabase();

export const getUIConfig = (setUser) => {
  return {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        if (authResult.additionalUserInfo.profile) {
          const { displayName, uid } = authResult.user;
          setUser({ displayName, uid });
        }
        return false;
      },
      signInFailure: function (error) {
        return handleUIError(error);
      },
    },
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };
};

export const initLoginBtns = (setUser) => {
  var ui =
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", getUIConfig(setUser));
};

export const logOut = () => {
  firebase
    .auth()
    .signOut()
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
      setRecordsList(Object.values(sortedData).slice(0, 10));
    }
  });
  return records;
};
