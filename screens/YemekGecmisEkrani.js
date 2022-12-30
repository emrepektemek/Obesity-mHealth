import { useContext } from "react";
import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import { UserFoodsContext } from "../store/user-food-context";

import { getTodayDateWithClock } from "../util/date";

import { LinearGradient } from "expo-linear-gradient";


function YemekGecmisEkrani(){

  const userFoodsCtx = useContext(UserFoodsContext);

  return(
    <LinearGradient 
      style={styles.mainContainer}
      colors={['#fe3434dc','#fff200f8']}
    >
      <FlatList 
        data={userFoodsCtx.UserFoods}
        keyExtractor={(item, index) => item.eklemeTarihi}
        renderItem={(data)=>{
          
          let tarih = getTodayDateWithClock(data.item.eklemeTarihi.toDate());   
          return(
            <View style={styles.foodContainer}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{tarih}</Text>    
              </View>

              <View style={styles.foodNameContainer}>
                <Text style={styles.foodNameText}>{data.item.besinMiktari}</Text>
                <Text style={styles.foodNameText}>{data.item.besinAdi}</Text>
              </View>
              
              <View style={styles.foodInfoContainer}>
                <Text style={styles.foodCalorieText}>{data.item.kalori} Kalori</Text>
                <View style={styles.foodContentContainer}>
                  <Text style={styles.foodContentText}>{data.item.protein} protein</Text>
                  <Text style={styles.foodContentText}>{data.item.karbonhidrat} karbonhidrat</Text>
                  <Text style={styles.foodContentText}>{data.item.yag} yag</Text>
                </View>    
              </View>
              
            </View>
          );
        }}
      />
     </LinearGradient>
  );

}

export default YemekGecmisEkrani;

const styles = StyleSheet.create({

  mainContainer:{
    flex: 1,
    paddingTop: 70,
  },
  foodContainer:{
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
  foodNameContainer:{
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  foodNameText:{
    fontSize: 18,
    fontFamily: 'sans-serif-medium'
  },
  foodInfoContainer:{
    padding: 10,
    borderTopWidth: 2,
  },
  foodCalorieText:{
    fontSize: 19,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium'
  },
  foodContentContainer:{
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between'

  },
  foodContentText:{
    fontSize: 17,
    fontFamily: 'sans-serif-medium'
  }
});