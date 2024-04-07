import React from 'react';
import { View, Text, ScrollView,  } from 'react-native';
import Card from '../components/Card'; //
import OracionesMain from '../pantallas/OracionesMain';
import GenerarOraciones from './GenerarOraciones';
//import PlantillaOracion from './PlantillaOracion';


let data  = require('../data/oracionesMain.json');




const OracionesFeed = ( { navigation } ) => {
   /// console.log(navigation)

    return (
        <View>
            <View>
                <View style={{ backgroundColor:"white" }}>
                
                <GenerarOraciones
                titulo="Oraciones Populares"
                navigation={navigation}
                />
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {data && data.oracionesMain && data.oracionesMain[0] ? (

                        data.oracionesMain.map((oracion, index) => {
                            return (
                                <View key={index}>
                                    
                                    <Card  imageUrl={oracion.uri} title={oracion.title} navigation={navigation}/>
                                </View>
                            );
                        })
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </ScrollView>
            </View>

            <OracionesMain
             navigation={navigation}
            />
           
            
        </View>


                
     
    );
};

export default OracionesFeed;