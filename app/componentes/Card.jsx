import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, router, Link } from 'expo-router';

//import { useNavigation } from '@react-navigation/native';


/* traer imags de algo relacionado a la oracion
  Padre nuestro
  Ave Maria
  Gloria al padre
  La salve (salve regina)
  Angel de mi guarda
*/
const Card = ({ title, imageUrl }) => {
  //console.log(title)
  console.log(imageUrl)
  
  return (
    <View style={styles.card}>
      <Link href={'/pantallas/Plantilla'} asChild>
        <TouchableOpacity
          // onPress={ () => navigation.navigate("Orar")}
          style={styles.containerCardMain}

        >
         
            <Text
              style={styles.txtOracion}
            >  {title} </Text>






        </TouchableOpacity>

      </Link>


    </View>
  );
};

const styles = {
  card: {
    width: 200,
    height: 100,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#CAF0F8',
    borderWidth: 1,
    borderColor: 'black',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'center',
    backgroundImg: 'url(../assets/img2.png)',
  },
  txtOracion: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
    margin: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    with: 200,
    height: 100,
  },

};

export default Card;