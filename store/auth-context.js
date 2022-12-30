import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext , useState } from "react";

export const AuthContext = createContext({
    uid: '',
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {}
});

function AuthContexProvider({children}){

    const [firebaseID , setFirebaseID] = useState();

    function authenticate(uid){
        setFirebaseID(uid);
        AsyncStorage.setItem('uid',uid);
    }

    function logout(){
        setFirebaseID(null);
        AsyncStorage.removeItem('uid');
    }

    const value = {
        uid: firebaseID,
        isAuthenticated: !!firebaseID,
        authenticate: authenticate,
        logout: logout
    }

    return(
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default AuthContexProvider;