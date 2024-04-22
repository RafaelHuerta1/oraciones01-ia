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
             <ScrollView >
            <View>
                <View>
                    <Text style={{ fontSize: 22, fontWeight: "bold", margin: 7, textAlign: "left"}}>Oraciones Populares</Text>
            
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {data && data.oracionesMain && data.oracionesMain[0] ? (

                        data.oracionesMain.map((oracion, index) => {
                            return (
                                <View key={index}>

                                    <Card  imageUrl={oracion.uri} title={oracion.title}/>
                                </View>
                            );
                        })
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </ScrollView>
            </View>
            </ScrollView>
            <OracionesMain
             //navigation={navigation}
            />
           
            
        </View>


                
     
    );
};

export default OracionesFeed;