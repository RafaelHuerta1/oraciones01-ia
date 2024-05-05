import React from 'react';
import { View, Text, ScrollView,  } from 'react-native';
import Card from '../componentes/Card'; //
import OracionesMain from './OracionesMain';
//import GenerarOraciones from './GenerarOraciones';
//import PlantillaOracion from './PlantillaOracion';
import { Stack, router, Link } from 'expo-router';

let data  = require('../data/oracionesMain.json');




const OracionesFeed = (  ) => {
   /// console.log(navigation)
    //console.log(data.oracionesMain[0].uri)


    
    return (
        <View>
             
            <OracionesMain
             //navigation={navigation}
            />
           
            
        </View>


                
     
    );
};

export default OracionesFeed;