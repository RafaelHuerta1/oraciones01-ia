import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Stack, router, Link } from 'expo-router';

//import { useNavigation } from '@react-navigation/native';

 
const Card = ({title}) => {
    //console.log(title)

    return (
        <View style={styles.card}>
           <Link href={'/pantallas/Plantilla'} asChild>
           <TouchableOpacity 
          // onPress={ () => navigation.navigate("Orar")}
            style={styles.containerCardMain}
            
            >
                
              <Text style={styles.title}>{title}</Text>
             
        
            </TouchableOpacity>

           </Link>
 
    
        </View>
    );
};

const styles = {
    card: {
        backgroundColor: '#90E0EF',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        width: 100,
        height: 200,
       // padding: 10,
        margin: 10,
        overflow: 'hidden',  
      
    },
    containerCardMain: {
        flex: 1,
        justifyContent: 'center',
      },
    image: {
        flex: 1,
        alignItems: 'center',
        width:'100',
        height: '100',
        resizeMode: "cover",
        justifyContent: "center",
        borderRadius: 25,
      },
    title: {
        color: 'black',
        opacity: 1,
        fontSize: 22,
        fontWeight: '400',
        textAlign: 'center',
        fontWeight: '400',
        //marginTop: 50,
    },
    imgCard: {
        width: 100,
        height: 100,
        //borderRadius: 25,
        alignSelf: 'center',

        //margin: 10,
        
    },
    
};

export default Card;