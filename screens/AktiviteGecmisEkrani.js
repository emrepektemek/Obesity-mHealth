import { useEffect, useContext } from "react";
import { View, StyleSheet, Text, Alert, FlatList } from "react-native";

import { UserActivityContext } from "../store/user-activity-context";

import { getTodayDateWithClock } from "../util/date";

import { LinearGradient } from "expo-linear-gradient";


function AktiviteGecmisEkrani(){

   const activityCtx = useContext(UserActivityContext);

    return(
      <LinearGradient 
        style={styles.mainContainer}
        colors={['#fe3434dc','#fff200f8']}
      >
        <FlatList 
          data={activityCtx.UserActivities}
          keyExtractor={(item, index) => item.eklemeTarihi}
          renderItem={(data)=>{
            let tarih = getTodayDateWithClock(data.item.eklemeTarihi.toDate());
            let yakilanKalori = (data.item.yakilanKalori*data.item.aktiviteSuresi)/60;
            return(
              <View style={styles.activityContainer}>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{tarih}</Text>    
                </View>

                <View style={styles.activityNameContainer}>
                  <Text style={styles.activityNameText}>{data.item.aktiviteSuresi} dakika</Text>
                  <Text style={styles.activityNameText}>{data.item.aktiviteAdi}</Text>      
                </View>
                
                <View style={styles.caloriesBurnedContainer}>
                  <Text style={styles.caloriesBurnedText}>{yakilanKalori.toFixed(2)} kalori</Text>
                </View>
                
              </View>
            );
          }}
        />
      </LinearGradient>
    );

}

export default AktiviteGecmisEkrani;

const styles = StyleSheet.create({
  mainContainer:{
      flex: 1,
      paddingTop: 70,
    },
    activityContainer:{
      marginHorizontal: 4,
      marginBottom: 20,
      borderWidth: 4,
      borderRadius: 10,
    },
    dateContainer:{
      padding: 10,
      alignItems: 'center'
    },
    dateText:{
      fontSize: 19,
      fontFamily: 'sans-serif-medium'
    },
    activityNameContainer:{
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    activityNameText:{
      fontSize: 18,
      fontFamily: 'sans-serif-medium'
    },
    caloriesBurnedContainer:{
      padding: 10,
      alignItems: 'center',
      borderTopWidth: 2,
    },
    caloriesBurnedText:{
      fontSize: 18,
      fontFamily: 'sans-serif-medium'
    }
});