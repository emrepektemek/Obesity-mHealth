import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

import { AuthContext } from '../store/auth-context';

import { girisYap } from '../firebase/auth';


function GirisEkrani() {

  const [isAuthenticating , setIsAuthenticating ] = useState(false);

  const authContext = useContext(AuthContext);

  async function loginHandler({email , password}){

    setIsAuthenticating(true);

    try {
      const uid = await girisYap(email , password);
      authContext.authenticate(uid.user.uid);

    } catch (error) {
      Alert.alert('Authentication Failed' , 'Could Not Log You In. Please Check Your Credentials And Try Again Later');
      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating){
    return(
      <LoadingOverlay message="Giriş Yapılıyor..."/>
    );
  }

  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default GirisEkrani;
