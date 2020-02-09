import firebase from "firebase/app";
import "firebase/firestore";
// import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBr2iCwQxZuKS0MmKL7TxsivQVvaSMSRdc",
    authDomain: "hoppers-site.firebaseapp.com",
    databaseURL: "https://hoppers-site.firebaseio.com",
    projectId: "hoppers-site",
    storageBucket: "hoppers-site.appspot.com",
    messagingSenderId: "976938368605",
    appId: "1:976938368605:web:8ac95c13a7c7dfdd3b57b4",
    measurementId: "G-HBVCJ6DQP7"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();

// export const auth = firebase.auth()
