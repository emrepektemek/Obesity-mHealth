import { useState} from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';

import { Colors } from '../../constants/colors';

import { LinearGradient } from 'expo-linear-gradient';



function AuthContent({ isLogin, onAuthenticate }) {

  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {

    if(isLogin){
      navigation.replace('KayitEkrani');
    }
    else{
      navigation.replace('GirisEkrani');
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length >= 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
        Alert.alert('Invalid input', 'Please check your entered credentials.');
        setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <LinearGradient 
            style={styles.mainContainer}
            colors={['#fe3434dc','#fff200f8']}
    >
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Yeni Kullanıcı Oluştur' : 'Giriş Yap'}
        </FlatButton>
      </View>
    </LinearGradient>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    paddingTop: 100,
},
  buttons: {
    marginTop: 8,
    alignItems: 'center'
  },
});
