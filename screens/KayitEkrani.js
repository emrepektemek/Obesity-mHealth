import AuthContent from '../components/Auth/AuthContent';

import { useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';

import { kayitOl } from '../firebase/auth';

function KayitEkrani({navigation}) {

  const [isAuthenticating , setIsAuthenticating ] = useState(false);


  async function signupHandler({email , password}){

    setIsAuthenticating(true);
    try {
      await kayitOl(email , password);
      navigation.replace('GirisEkrani');
    } catch (error) {
      Alert.alert('Kayıt olunamadı lütfen tekrardan deneyiniz');
      setIsAuthenticating(false);
    }
   
  }

  if(isAuthenticating){

    return(
      <LoadingOverlay message="Kayıt Olunuyor..."/>
    );
  }

  return(

    <AuthContent 
      onAuthenticate={signupHandler}
    />
    
  );
}

export default KayitEkrani;
