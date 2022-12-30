import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Alert } from "react-native";

import { AuthContext } from "../store/auth-context";
import { UserFoodsContext } from "../store/user-food-context";
import { UserActivityContext } from "../store/user-activity-context";

import { getTodayDate } from "../util/date";
import { Colors } from './../constants/colors';
  
import IconButton from "../components/ui/IconButton";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ExitButton from "../components/ui/ExitButton";

import AwesomeButton from "react-native-really-awesome-button";

import CircularProgress from "react-native-circular-progress-indicator";

import { collection, query, where, getDocs, arrayRemove } from "firebase/firestore";
import { getDbObject } from "../firebase/FireBaseObjects";

import { LinearGradient } from "expo-linear-gradient";


let today = getTodayDate();


function AnaEkran({navigation}){

    const authCtx = useContext(AuthContext);

    const userFoodCtx = useContext(UserFoodsContext);
    const userActivityCtx = useContext(UserActivityContext);

    const [besinlerGetirildiMi , setBesinlerGetirildiMi ] = useState(true);
    const [aktivitelerGetirildiMi , setAktivitelerGetirildiMi ] = useState(true);

    const [yemekKalori,setYemekKalori] = useState(0);
    const [aktiviteKalori,setAktiviteKalori] = useState(0);

    const db = getDbObject();

    useEffect(() => {
        async function getUserFoods(){
            if(userFoodCtx.UserFoods.length>0){
               
            }
            else{
                    setBesinlerGetirildiMi(false);
                try {
                const q = query(collection(db, "userfoods"),where("userId", "==", authCtx.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc)=>{
                    userFoodCtx.addUserFoods(doc.data());         
                    setYemekKalori(oncekiKalori => oncekiKalori+doc.data().kalori);             
                });
                } catch (error) {
                    Alert.alert('Yemek verileri getirelemedi lütfen internet bağlantınızı kontrol ediniz');
                }
                setBesinlerGetirildiMi(true); 
            }
            
        }
        getUserFoods();
    },[]);

    useEffect(() => {
        async function getUserActivity(){
            if(userActivityCtx.UserActivities.length>0){
               
            }
            else{
                setAktivitelerGetirildiMi(false);
                try {
                  const q = query(collection(db, "useractivity"),where("userId", "==", authCtx.uid));
                  const querySnapshot = await getDocs(q);
                  querySnapshot.forEach((doc)=>{           
                    userActivityCtx.addUserActivities(doc.data());  
                    let yakilanKalori = (doc.data().yakilanKalori*doc.data().aktiviteSuresi)/60;
                    yakilanKalori = parseFloat(yakilanKalori.toFixed(2));
                    setAktiviteKalori(oncekiYakilanKaloriler => oncekiYakilanKaloriler + yakilanKalori );
                  });
                } catch (error) {
                    Alert.alert('Aktivite verileri getirilemedi lütfen internet bağlantınızı kontrol ediniz');
                }
                setAktivitelerGetirildiMi(true); 
            } 
        }
        getUserActivity();
    },[]);

    function yemekKaydet(){
        navigation.navigate('YemekKaydetEkrani');
    }
    function aktiviteKaydet(){
        navigation.navigate('AktiviteKaydetEkrani');
    }

    function uygulamadanCik(){
        userActivityCtx.UserActivities = [];
        userFoodCtx.UserFoods = [];
        authCtx.logout();
    }

    if(!besinlerGetirildiMi || !aktivitelerGetirildiMi){
        return(
          <LoadingOverlay message="Veriler Getiriliyor..."/>
        );
    }

    let message = '';
    if(yemekKalori > 0 || aktiviteKalori > 0){
        if(yemekKalori>aktiviteKalori){
            message = 'Lütfen daha fazla aktivite yapınız daha az kalori tüketiniz.'
        }else{
            message = 'Bu şekilde devam ediniz bravo'
        }
    
    }
   
    return(
       
        <LinearGradient 
            style={styles.mainContainer}
            colors={['#fe3434dc','#fff200f8']}
        >
            <View style={styles.exitContainer}> 
                <ExitButton 
                    size={22}
                    icon="exit-outline"
                    color={Colors.colors.dark}
                    onPress={uygulamadanCik}
                />
            </View>
        
            <Text style={styles.today}>{today}</Text>
            <View style={styles.infoContainer}>   
                <Text style={styles.circleProgressTitle}>Tüketilen Toplam Kalori</Text>
                <View style={styles.circleProgressContainer}>
                    <CircularProgress
                        value={yemekKalori}
                        radius={72}
                        activeStrokeWidth={12}
                        activeStrokeColor={'#7e00e6'}
                        activeStrokeSecondaryColor={'#0854ed'}
                        inActiveStrokeWidth={24}
                        duration={800}
                        progressValueColor={'#000000'}
                        progressValueStyle={{fontWeight: '500',fontSize: 24,fontFamily: 'monospace'}}
                        maxValue={2000}
                        title={'cal'}
                        titleColor={'#0d1010'}
                        titleStyle={{fontWeight: '500',fontFamily: 'monospace'}}
                    />
                </View>              
                <AwesomeButton 
                    onPressIn={yemekKaydet}
                    backgroundColor={'#9310ff'}
                    backgroundDarker={'#131010e1'}
                    borderRadius={10}
                    height={40}
                    width={100}
                    paddingBottom={20}
                    raiseLevel={5}
                    textColor={'#090909dc'}
                    textFontFamily={'monospace'}
                >Yemek Kaydet</AwesomeButton>                           
            </View>

            <View style={styles.infoContainer}>   
                <Text style={styles.circleProgressTitle}>Yakılan Toplam Kalori</Text>
                <View style={styles.circleProgressContainer}>
                    <CircularProgress
                        value={aktiviteKalori}
                        radius={72}
                        activeStrokeWidth={12}
                        activeStrokeColor={'#7e00e6'}
                        activeStrokeSecondaryColor={'#0854ed'}
                        inActiveStrokeWidth={24}
                        duration={800}
                        progressValueColor={'#000000'}
                        progressValueStyle={{fontWeight: '500',fontSize: 24,fontFamily: 'monospace'}}
                        maxValue={2000}
                        title={'cal'}
                        titleColor={'#0d1010'}
                        titleStyle={{fontWeight: '500',fontFamily: 'monospace'}}
                    />
                </View>                  
                <AwesomeButton 
                    onPressIn={aktiviteKaydet}
                    backgroundColor={'#9310ff'}
                    backgroundDarker={'#131010e1'}
                    borderRadius={10}
                    height={40}
                    width={100}
                    paddingBottom={20}
                    raiseLevel={5}
                    textColor={'#090909dc'}
                    textFontFamily={'monospace'}
                >Aktivite Kaydet</AwesomeButton>
            </View>   
            <Text style={styles.endInfoText}>{message}</Text>  
        </LinearGradient>
        
    );

}

export default AnaEkran;

const styles = StyleSheet.create({

    mainContainer:{
        flex: 1,
        paddingTop: 40,
    },
    exitContainer:{
        alignItems: 'center',
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse'
    },
    today:{
        textAlign: 'center',
        fontSize: 19,
        paddingBottom: 15,
        fontFamily: 'monospace'
    },
    circleProgressTitle:{
        fontSize: 16,
        paddingBottom: 10,
        fontFamily: 'monospace'
    },
    infoContainer:{
        alignItems: 'center',
        margin: 10,
    },
    circleProgressContainer:{
       paddingBottom: 10
    },
    endInfoText:{
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'monospace',
        color: '#000000',
        fontWeight: '700'
    }

});