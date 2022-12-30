import { useContext, useState } from "react";
import { View, StyleSheet} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

import BesinEkleInput from "../components/ui/BesinEkleInput";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { getFood } from "../util/foodapirequest";

import { Notifier, NotifierComponents } from "react-native-notifier";

import { getDbObject } from "../firebase/FireBaseObjects";

import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { AuthContext } from "../store/auth-context";
import { UserActivityContext } from "../store/user-activity-context";

import axios from "axios";

import { LinearGradient } from "expo-linear-gradient";


function AktiviteKaydetEkrani(){

    const authCtx = useContext(AuthContext);
    const userActivityCtx = useContext(UserActivityContext);

    const [kayitEdildiMi , setKayitEdildiMi ] = useState(true);

    const [aktiviteAdi,setAktiviteAdi] = useState();
    const [aktiviteSuresi,setAktiviteSuresi] = useState(0);

    function AktiviteAdiStateKaydet(data){
        setAktiviteAdi(data);
    }

    function AktiviteSuresiStateKaydet(data){
        setAktiviteSuresi(data);
    }


    async function aktiviteKaydet(){
        setKayitEdildiMi(false);
        const config = {
            method: 'get',
            url: 'https://api.api-ninjas.com/v1/caloriesburned?activity='+aktiviteAdi,
            headers: { 
                'X-Api-Key': 'uY13GCUyCxN58V5edjMGwA==eKPH4Nf9AhNWRkxg'
            },
        }

        try {
            let veri = await axios(config);
            let aktiviteVerisi = veri.data[0];
    
            if(aktiviteVerisi=== undefined || aktiviteSuresi<1){
                setKayitEdildiMi(true);
                Notifier.showNotification({
                    title: 'Ekleme Başarısız',
                    description: 'Aktivite eklenemedi lütfen tekrar deneyiniz',
                    Component: NotifierComponents.Alert,
                    componentProps: {
                        alertType: 'error',
                    },
              });
            }
            else{
                setKayitEdildiMi(true);    
                const db = getDbObject();

                const docRef = await addDoc(collection(db, "useractivity"), {
                    userId: authCtx.uid,
                    aktiviteAdi: aktiviteAdi,
                    aktiviteSuresi: aktiviteSuresi,
                    yakilanKalori: aktiviteVerisi.total_calories,
                    eklemeTarihi: Timestamp.fromDate(new Date())
                  });

                userActivityCtx.addUserActivities({
                    userId: authCtx.uid,
                    aktiviteAdi: aktiviteAdi,
                    aktiviteSuresi: aktiviteSuresi,
                    yakilanKalori: aktiviteVerisi.total_calories,
                    eklemeTarihi: Timestamp.fromDate(new Date())
                });
                
                Notifier.showNotification({
                    title: 'Ekleme Başarılı',
                    description: 'Aktivite başarıyla eklendi',
                    Component: NotifierComponents.Alert,
                    componentProps: {
                        alertType: 'success',
                    },
              });
            }

          
        } catch (error) {
            console.log(error.toString());
            setKayitEdildiMi(true);  
            Notifier.showNotification({
                title: 'Ekleme Başarısız',
                description: 'Aktivite eklenemedi lütfen tekrardan deneyiniz',
                Component: NotifierComponents.Alert,
                componentProps: {
                    alertType: 'error',
                },
          });
        }
    }

    if(!kayitEdildiMi){
        return(
          <LoadingOverlay message="Aktivite Ekleniyor..."/>
        );
    }

    return(
        <LinearGradient 
            style={styles.mainContainer}
            colors={['#fe3434dc','#fff200f8']}
        >
        <BesinEkleInput 
            onChangeText={AktiviteAdiStateKaydet}
            value={aktiviteAdi}
            title="Lütfen Aktivite Adı Giriniz"
            placeHolderMessage="Örnek: skiing,football,run "
        />
        <BesinEkleInput 
            onChangeText={AktiviteSuresiStateKaydet}
            value={aktiviteSuresi}
            title="Lütfen Aktivite Suresini Giriniz"
            placeHolderMessage="Dakika"
            keyboardType="number-pad"
        />
        <View style={styles.buttonContainer}>
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
            >
                Aktivite Kaydet
            </AwesomeButton>
        </View>
            
    </LinearGradient>
    );
}

export default AktiviteKaydetEkrani;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        paddingTop: 50
    },
    buttonContainer:{
        marginTop: 20,
        alignItems: 'center'
    }
});