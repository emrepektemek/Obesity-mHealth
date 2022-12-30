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
import { UserFoodsContext } from "../store/user-food-context";

import { LinearGradient } from "expo-linear-gradient";



function YemekKaydetEkrani(){

    const authCtx = useContext(AuthContext);

    const userFoodCtx = useContext(UserFoodsContext);

    const [kayitEdildiMi , setKayitEdildiMi ] = useState(true);

    const [besinAdi,setBesinAdi] = useState();
    const [besinMiktari,setBesinMiktari] = useState();

    function YemekAdiStateKaydet(data){
        setBesinAdi(data);
    }

    function YemekMiktariStateKaydet(data){
        setBesinMiktari(data);
    }

    async function BesinKaydet(){

        setKayitEdildiMi(false);
        
        try {
            const besinVerisi = await getFood(besinAdi);
            if(besinVerisi === undefined || besinMiktari<=0){
                setKayitEdildiMi(true);
                Notifier.showNotification({
                    title: 'Ekleme Başarısız',
                    description: 'Yemek eklenemedi lütfen tekrar deneyiniz',
                    Component: NotifierComponents.Alert,
                    componentProps: {
                        alertType: 'error',
                    },
              });
            }
            else{
                setKayitEdildiMi(true);       
                const BesinVerisi = besinVerisi.food.nutrients;
                const db = getDbObject();

                const docRef = await addDoc(collection(db, "userfoods"), {
                    userId: authCtx.uid,
                    besinAdi: besinAdi,
                    besinMiktari: besinMiktari,
                    kalori: BesinVerisi.ENERC_KCAL,
                    karbonhidrat:BesinVerisi.CHOCDF,
                    yag:BesinVerisi.FAT,
                    protein:BesinVerisi.PROCNT,
                    eklemeTarihi: Timestamp.fromDate(new Date())
                  });

                  userFoodCtx.addUserFoods({userId: authCtx.uid,
                    besinAdi: besinAdi,
                    besinMiktari: besinMiktari,
                    kalori: BesinVerisi.ENERC_KCAL,
                    karbonhidrat:BesinVerisi.CHOCDF,
                    yag:BesinVerisi.FAT,
                    protein:BesinVerisi.PROCNT,
                    eklemeTarihi: Timestamp.fromDate(new Date())});

                Notifier.showNotification({
                    title: 'Ekleme Başarılı',
                    description: 'Yemek başarıyla eklendi',
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
                description: 'Yemek eklenemedi lütfen tekrardan deneyiniz',
                Component: NotifierComponents.Alert,
                componentProps: {
                    alertType: 'error',
                },
          });
        }
    }

    if(!kayitEdildiMi){
        return(
          <LoadingOverlay message="Yemek Ekleniyor..."/>
        );
    }

    return(
       
        <LinearGradient 
            style={styles.mainContainer}
            colors={['#fe3434dc','#fff200f8']}
        >
            <BesinEkleInput 
                onChangeText={YemekAdiStateKaydet}
                value={besinAdi}
                title="Lütfen Yemek Adı Giriniz"
                placeHolderMessage="Besin Adı"
            />
            <BesinEkleInput 
                onChangeText={YemekMiktariStateKaydet}
                value={besinMiktari}
                title="Lütfen Yemek Miktarı Giriniz"
                placeHolderMessage="Miktar, Kg, Litre"
                keyboardType="number-pad"
            />
            <View style={styles.buttonContainer}>
                <AwesomeButton 
                    onPressIn={BesinKaydet}
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
                    Yemek Kaydet
                </AwesomeButton>
            </View>
                
        </LinearGradient>
    );

}


export default YemekKaydetEkrani;

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