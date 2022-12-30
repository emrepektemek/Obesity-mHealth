import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// get your firebase confing 

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export function getAuthObject(){
    return auth;
}

export function getDbObject(){
    return db;
}
