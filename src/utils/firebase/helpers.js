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
        // Do something with the returned AuthResult.
        // Return type determines whether we continue the redirect
        // automatically or whether we leave that to developer to handle.

        if (authResult.additionalUserInfo.profile) {
          const { name, id } = authResult.additionalUserInfo.profile;
          setUser({ displayName: name, uid: id });
        }
        return false;
      },
      signInFlow: "popup",
      signInFailure: function (error) {
        // Some unrecoverable error occurred during sign-in.
        // Return a promise when error handling is completed and FirebaseUI
        // will reset, clearing any UI. This commonly occurs for error code
        // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
        // occurs. Check below for more details on this.
        return handleUIError(error);
      },
      // uiShown: function() {
      //   // The widget is rendered.
      //   // Hide the loader.
      //   document.getElementById('loader').style.display = 'none';
      // }
    },
    signInSuccessUrl: "/",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    // tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    // privacyPolicyUrl: function() {
    //   window.location.assign('<your-privacy-policy-url>');
    // }
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
      setRecordsList(Object.values(sortedData));
    }
  });
  return records;
};
