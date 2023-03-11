// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuLI10Cs1jtIROmUV4AJCCI16Q012gaA8",
  authDomain: "tasks-7f561.firebaseapp.com",
  projectId: "tasks-7f561",
  storageBucket: "tasks-7f561.appspot.com",
  messagingSenderId: "1065364292557",
  appId: "1:1065364292557:web:f3ad1911d06355171d7a84",
  measurementId: "G-87DZS79HCC",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
