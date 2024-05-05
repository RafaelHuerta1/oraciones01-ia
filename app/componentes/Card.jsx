import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Stack, router, Link } from 'expo-router';

//import { useNavigation } from '@react-navigation/native';


/* traer imags de algo relacionado a la oracion
  Padre nuestro
  Ave Maria
  Gloria al padre
  La salve (salve regina)
  Angel de mi guarda
*/
const Card = ({ title }) => {
  console.log(title)

  const imgsCardsMain = {
    'Padre Nuestro': 'https://th.bing.com/th/id/OIG2.soO7WIZ6HqmJtVxhjMys?pid=ImgGn',
    'Ave María': 'https://th.bing.com/th/id/OIG2.nVvFTicG87SkdqjFdJp0?pid=ImgGn',
    'Gloria al Padre': 'https://th.bing.com/th/id/OIG4.LkEWvid8lWJ.PULvFJIU?pid=ImgGn',
    'La Salve (Salve Regina)': 'https://th.bing.com/th/id/OIG4.gr_MOur6gEHyi0cUsR7o?w=1024&h=1024&rs=1&pid=ImgDetMain',
    ' Angel de mi guarda': 'https://th.bing.com/th/id/OIG1.6q1lBI.xdpQ4dq6Xly5D?w=1024&h=1024&rs=1&pid=ImgDetMain',
  };


  return (
    <Link href={'/pantallas/Plantilla'} asChild>
    <View style={styles.card}>
          <Text style={styles.txtOracion}>{title}</Text>
          <Image source={{ uri: imgsCardsMain[title] }} style={styles.image} />






    </View>
    </Link>
  );
};

const styles = {
  card: {
    width: 150,
    height:200,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#CAF0F8',
   
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'center',
    
  },
  txtOracion: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
    marginTop: 0,
  },
  image: {
    resizeMode: "cover",
    with: 100,
    height: 110,
  },
};

export default Card;