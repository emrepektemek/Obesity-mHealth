import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCWb2AJyBIqjqkkxqEFjjKHiCCzdkTxhCo",
    authDomain: "tasarim-b5fdc.firebaseapp.com",
    projectId: "tasarim-b5fdc",
    storageBucket: "tasarim-b5fdc.appspot.com",
    messagingSenderId: "793945674127",
    appId: "1:793945674127:web:c4ad8e60f305f60e6dfbfa",
    measurementId: "G-64KZ0VPSRD"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export function getAuthObject(){
    return auth;
}

export function getDbObject(){
    return db;
}