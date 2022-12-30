import { StatusBar } from 'expo-status-bar';
import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';

import LoadingOverlay from './components/ui/LoadingOverlay';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthContexProvider, { AuthContext } from './store/auth-context';
import UserFoodsContexProvider from './store/user-food-context';
import UserActivitiesContexProvider from './store/user-activity-context';

import AsyncStorage from "@react-native-async-storage/async-storage";

import AnaEkran from './screens/AnaEkran';
import AktiviteKaydetEkrani from './screens/AktiviteKaydetEkrani';
import AktiviteGecmisEkrani from './screens/AktiviteGecmisEkrani';
import YemekGecmisEkrani from './screens/YemekGecmisEkrani';
import YemekKaydetEkrani from './screens/YemekKaydetEkrani';

import GirisEkrani from './screens/GirisEkrani';
import KayitEkrani from './screens/KayitEkrani';

import { NotifierWrapper } from 'react-native-notifier';

import { Ionicons } from '@expo/vector-icons'; 


const Stack = createNativeStackNavigator();

const BottomTabs = createBottomTabNavigator();


function BottomTabsEkranlari(){

  return(
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle:{
          height: 70,
          backgroundColor: '#fff200f8'
        },
        tabBarIcon: ({focused})=>{
          return(
            <Ionicons 
              name="chevron-down-circle-sharp" 
              size={30} 
              color="black" 
            />
          );
        },
        tabBarActiveBackgroundColor:'#ccc200ff' 
      }}
    >
      <BottomTabs.Screen 
        name="AnaEkran"
        component={AnaEkran}
        options={{
          tabBarLabelStyle:{
            color: '#000000ff',
            fontSize: 14,
            fontFamily: 'sans-serif-medium'
          },
          tabBarLabel:'Ana Ekran'
        }}
      />
       <BottomTabs.Screen 
        name="YemekGecmisEkrani"
        component={YemekGecmisEkrani}
        options={{
          tabBarLabelStyle:{
            color: '#000000ff',
            fontSize: 14,
            fontFamily: 'sans-serif-medium'
          },
          tabBarLabel:'Geçmiş Yemekler'
        }}
      />
      <BottomTabs.Screen 
        name="AktiviteGecmisEkrani"
        component={AktiviteGecmisEkrani}
        options={{
          tabBarLabelStyle:{
            color: '#000000ff',
            fontSize: 14,
            fontFamily: 'sans-serif-medium'
          },
          tabBarLabel:'Geçmiş Aktiviteler'
        }}
      />
    </BottomTabs.Navigator>
  );
}

function GirisKayitEkranlari(){
  return(
    <Stack.Navigator
      screenOptions={{headerShown:false}}
    >
      <Stack.Screen 
        name="GirisEkrani"
        component={GirisEkrani}
      />
      <Stack.Screen
        name="KayitEkrani"
        component={KayitEkrani}
      />
    </Stack.Navigator>
  );
}

function UygulamaEkranlari(){

  return(
    <Stack.Navigator
      screenOptions={{headerShown:false}}
    >
      <Stack.Screen 
        name="BottomTabsEkranlari"
        component={BottomTabsEkranlari}
      />
      <Stack.Screen
        name="YemekKaydetEkrani"
        component={YemekKaydetEkrani}
      />
      <Stack.Screen
        name="AktiviteKaydetEkrani"
        component={AktiviteKaydetEkrani}
      />
    </Stack.Navigator>
  );

}


function Navigation() {

  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <GirisKayitEkranlari />}
      {authContext.isAuthenticated && <UygulamaEkranlari />}
    </NavigationContainer>
  );
}

function Root(){

  const [isTryingLogin , setIsTraingLogin] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken(){
        const storedToken = await AsyncStorage.getItem('uid');
        
        if(storedToken){
          authContext.authenticate(storedToken);
        }
        setIsTraingLogin(false);
    }
    fetchToken();
    
  },[]);

  if(isTryingLogin){
    return <LoadingOverlay message="Giriş Yapılıyor..." />
  }

  return <Navigation />;
}

export default function App() {

  return (
    <UserFoodsContexProvider>
      <UserActivitiesContexProvider>
        <AuthContexProvider>
            <NotifierWrapper>
            <StatusBar style='auto' />
            <Root />
          </NotifierWrapper>
        </AuthContexProvider>
      </UserActivitiesContexProvider>
    </UserFoodsContexProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
