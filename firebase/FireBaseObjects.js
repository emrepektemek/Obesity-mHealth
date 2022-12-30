import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// your firebaseConfig 

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export function getAuthObject(){
    return auth;
}

export function getDbObject(){
    return db;
}
