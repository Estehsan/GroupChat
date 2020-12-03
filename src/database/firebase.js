import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGU67bg0E88BW7tJHUf_mDA37SNX-bTxU",
  authDomain: "groupchat-f876a.firebaseapp.com",
  databaseURL: "https://groupchat-f876a.firebaseio.com",
  projectId: "groupchat-f876a",
  storageBucket: "groupchat-f876a.appspot.com",
  messagingSenderId: "358291861577",
  appId: "1:358291861577:web:26500643b9ac6e19514f98",
  measurementId: "G-B9H238P35B",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export default firebase;
