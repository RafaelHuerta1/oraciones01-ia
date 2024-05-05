import React from "react";
import { router, Link } from 'expo-router';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
//import OracionesFeed from "../screens/Oraciones";
//import GenerarOraciones from "../screens/GenerarOraciones";
//import GenerarOraciones from "../screens/GenerarOraciones";
import registerNNPushToken from 'native-notify';

import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId3 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3715029693544325~7134076253';

const interstitial = InterstitialAd.createForAdRequest(adUnitId3, {
  keywords: ['fashion', 'clothing'],
});

const data = [
  { id: 1, title: 'Enfermos', img: 'https://th.bing.com/th/id/OIG4.0pLCXS0M5OzhBn5vjASk?w=1024&h=1024&rs=1&pid=ImgDetMain' }, // enfermos
  /* { id: 2, title: 'Agradecimiento' }, */
  { id: 3, title: 'Difuntos', img: 'https://th.bing.com/th/id/OIG4.3esNRz0gFrjz1OByu.3r?pid=ImgGn' }, // Oraciones por los difuntos
  /*{ id: 4, title: 'Fortaleza ' }, */
  { id: 5, title: 'Depresion', img: 'https://th.bing.com/th/id/OIG2.iaNwgTTQeqTMLKIaMXKy?w=1024&h=1024&rs=1&pid=ImgDetMain' }, // 
  { id: 6, title: 'Oraciones Por la Mañana y Noche', img: 'https://th.bing.com/th/id/OIG2.qtLAelwclSMnI_xJTv83?w=1024&h=1024&rs=1&pid=ImgDetMain' },
  { id: 7, title: 'Padre Nuestro', img: 'https://th.bing.com/th/id/OIG2.soO7WIZ6HqmJtVxhjMys?pid=ImgGn' }, // Protección y Seguridad
  { id: 8, title: 'Ave María', img: 'https://th.bing.com/th/id/OIG2.nVvFTicG87SkdqjFdJp0?pid=ImgGn' }, // Protección y Seguridad
  { id: 9, title: 'Gloria al Padre', img: 'https://th.bing.com/th/id/OIG4.LkEWvid8lWJ.PULvFJIU?pid=ImgGn' }, // Protección y Seguridad
  { id: 10, title: 'La Salve (Salve Regina)', img: 'https://th.bing.com/th/id/OIG4.gr_MOur6gEHyi0cUsR7o?w=1024&h=1024&rs=1&pid=ImgDetMain' }, // Protección y Seguridad
  // { id: 11, title: 'Angel de mi guarda' , img : 'https://th.bing.com/th/id/OIG1.6q1lBI.xdpQ4dq6Xly5D?w=1024&h=1024&rs=1&pid=ImgDetMain'}, // Protección y Seguridad
  /*
  'Padre Nuestro': 'https://th.bing.com/th/id/OIG2.soO7WIZ6HqmJtVxhjMys?pid=ImgGn',
  'Ave María': 'https://th.bing.com/th/id/OIG2.nVvFTicG87SkdqjFdJp0?pid=ImgGn',
  'Gloria al Padre': 'https://th.bing.com/th/id/OIG4.LkEWvid8lWJ.PULvFJIU?pid=ImgGn',
  'La Salve (Salve Regina)': 'https://th.bing.com/th/id/OIG4.gr_MOur6gEHyi0cUsR7o?w=1024&h=1024&rs=1&pid=ImgDetMain',
  ' Angel de mi guarda': 'https://th.bing.com/th/id/OIG1.6q1lBI.xdpQ4dq6Xly5D?w=1024&h=1024&rs=1&pid=ImgDetMain',
   */

];
const Item = ({ title, img }) => (
  <View style={styles.item}>
      <Link href="/pantallas/Plantilla" asChild>
      <TouchableOpacity>

      <View>
          <Text style={styles.title}>{title}</Text>
          <Image
        source={{ uri: img }}
        style={{ width: 180, height: 130, marginTop: 0, padding: 0 }}
      />
      </View>
      </TouchableOpacity>

      </Link>


 

    </View>
);

const OracionesMain = () => {
  let numColumns = 2;
  const renderItem = ({ item }) => <Item title={item.title} img={item.img} />;
  //const [loaded, setLoaded] = useState(false);

  registerNNPushToken(21092, 'Th4CXZCquGVl2Wohx0VZ8s');
  console.log('Token registrado');



  return (
    <View style={styles.containerMainGrid}>

      <FlatList
        //  onPress={() => router.push('/pantallas/Plantilla')}
        style={styles.cardList}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        key={numColumns}
        numColumns={numColumns}
        ListHeaderComponent={
          <View>
            <Text style={{ margin: 7, fontSize: 22, fontWeight: "400" }}>Puedes orar por alguna de las siguientes Intenciones.</Text>

          </View>
        }


      />
    </View>
  );




};


export default OracionesMain;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    width: 160,
    height: 'auto',
    //minHeight: 140,
    backgroundColor: '#CAF0F8',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },

  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
    fontStyle: 'normal',

  },
  containerMainGrid: {
    marginTop: -20,
    width: '100%',
    height: 'auto',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',

  },
  containerBtnGenerate: {
    backgroundColor: '#03045E',
    borderRadius: 20,
    width: 290,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    // marginLeft: 15,
    marginTop: -3,
    padding: 2,
  },
  txtMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtGenerarOracion: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginRight: 40,
  },
  cardList: {
    marginTop: 10,
    width: '100%',
    height: 'auto',
  },
});