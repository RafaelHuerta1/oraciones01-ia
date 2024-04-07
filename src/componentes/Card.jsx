import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

//import { useNavigation } from '@react-navigation/native';

 
const Card = ({title, navigation}) => {
    //console.log(title)

    return (
        <View style={styles.card}>
            <TouchableOpacity 
           onPress={ () => navigation.navigate("Orar")}
            style={styles.containerCardMain}
            
            >
                
              <Text style={styles.title}>{title}</Text>
             
        

          

            </TouchableOpacity>
    
        </View>
    );
};

const styles = {
    card: {
        backgroundColor: '#90E0EF',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        width: 300,
        height: 100,
        minWidth: 100,
        maxWidth: 200,
        minHeight: 100,
        maxHeight: 200,
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
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        margin: 10,
    },
    
};

export default Card;