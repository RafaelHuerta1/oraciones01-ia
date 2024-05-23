import { View, Text, StyleSheet, Image, ScrollView, Alert, Share } from "react-native";
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
        //style={{ alignItems: 'center', height: 100, justifyContent: 'center', backgroundColor: '#03045E'}}
      >
                        <BannerAd
      unitId={__DEV__ ? TestIds.BANNER : androidID}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      style={{alignSelf: 'center', backgroundColor: 'white'}}
    />
       
      </View>
      <View
        style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20,}}
      >
      <ScrollView
      showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} // oculta la barra de scroll
      >
        <Text style={styles.txtInfoOracionMain}> Esta oracion es para: {nombre} </Text>

              <View  style={styles.containerMainOracionCompleta} >
                  <Text style={styles.oracionCompleta}  >  {oracionesCreadas} </Text>
              </View>


              <View
        style={{ alignItems: 'center',flexDirection: 'row', justifyContent: 'space-around', padding: -1}}

      >
    
         
  
            <ButtonPer text='Compartir Oracion'
        color='#0077B6'
        func={onShare}
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
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 20,
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