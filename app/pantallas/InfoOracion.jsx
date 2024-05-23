import { View, Text, StyleSheet, Button, ScrollView, Alert, Share} from "react-native";
import { useEffect , useState} from "react";
import { useLocalSearchParams } from "expo-router";
//import { useState, useEffect } from 'react';

import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from "firebase/auth";
import ButtonPer from "../componentes/ButtonPer";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';


const androidID = 'ca-app-pub-3715029693544325/2372364859';

export default function InfoOracion() {



  const {oracionesCreadas, nombre} = useLocalSearchParams();

  console.log(oracionesCreadas);


  // function with react native-share by messenger and whatsapp
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
         'Hola, te comparto esta oracion: ' + oracionesCreadas + ' - Oracion creada para: ' + nombre,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  return (

    <View>
      <View
      style={{ alignItems: 'center', height: 100, justifyContent: 'center', position: 'relative', top: 0, left: 0, right: 0, }}
      >
                        <BannerAd
      unitId={__DEV__ ? TestIds.BANNER : androidID}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      style={{alignSelf: 'center', backgroundColor: 'white'}}
    />
       </View>
       
  
   
          <View
          style={{ flexDirection: 'column',
            height: 600, width: 'auto', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
            padding: 10
          }}
          >

          


        <ScrollView
      
        //style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, height: '100%', width: '100%',}}
              
        >
        <Text style={styles.txtInfoOracionMain}> Esta oracion es para: {nombre} </Text>

        <View  style={styles.containerMainOracionCompleta} >
            <Text style={styles.oracionCompleta}  >  {oracionesCreadas} </Text>
        </View>

        <View
    style={{ alignItems: 'center', justifyContent: 'center', marginTop: -12,}}
    >
      <Text
      style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 10, padding: 10,}}
      >
        Comparta la oracion en su red social Favorita.
      </Text>
      
      <ButtonPer
        func={onShare}
        text="Compartir"
        color="#1B1464"
      />
       </View>
    </ScrollView>

 
                   
        

    </View>

    

    </View>


  );
  
}



const styles = StyleSheet.create({
  txtInfoOracionMain: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
  },
  txtInfoOracion: {
    fontSize: 25,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 20,
    padding: 10,
  },
  containerMainOracionCompleta: {
    marginTop: 12,
    padding: 22,
    marginHorizontal: 20,
    marginVertical: 40,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#03045E'
  },
  oracionCompleta: {
    fontSize: 20,
    lineHeight:35,
    fontWeight: '300',
    textAlign: 'center',
    
  },
});