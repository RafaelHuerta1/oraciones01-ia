import React from "react";
import { router, Link } from 'expo-router';
import { View, Text,FlatList, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
//import OracionesFeed from "../screens/Oraciones";
//import GenerarOraciones from "../screens/GenerarOraciones";
//import GenerarOraciones from "../screens/GenerarOraciones";


const data = [
  { id: 1, title: 'Enfermos' }, // enfermos
  { id: 2, title: 'Agradecimiento' }, //
  { id: 3, title: 'Difuntos' }, // Oraciones por los difuntos
  { id: 4, title: 'Fortaleza ' }, // 
  { id: 5, title: 'Depresion' }, // 
  { id: 6, title: 'Familia y Amigos' }, // 
  { id: 7, title: 'Esperanza' }, // 
  { id: 7, title: 'Protección y Seguridad' },
  // Protección y Seguridad

];
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const OracionesMain = () => {
  let numColumns = 2;
 const renderItem = ({ item }) => <Item title={item.title} />;

return (
  <TouchableOpacity >
   
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
                              <Text style={{margin:7, fontSize:22, fontWeight:"300", }}>Puedes orar por alguna de las siguientes Intenciones.</Text>

                </View>
              }
              /> 
              <Text >{""}</Text>
              <Link href="/pantallas/Plantilla" asChild>
              <TouchableOpacity  style={styles.containerBtnGenerate}>
              <Text style={{margin:15, fontSize:21, fontWeight:"500", color:"white", textAlign:"center"  }}>Orar por su ser Querido</Text>
              </TouchableOpacity>
              </Link>
            
          </View>


  </TouchableOpacity>
    
);

};




export default OracionesMain;

const styles = StyleSheet.create({
    item: {
      flex: 1,
      margin: 3,
      backgroundColor: '#CAF0F8',
      padding: 12,
      borderColor: 'grey',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginRight: 15,
      marginLeft:15,
      marginBottom: 10,
      width: 50,
        height: 60,
        borderRadius: 12,
        flexDirection: 'row',
    },
    cardList: {
      marginTop: 10,
      width: '100%',
      padding: 3,
    },
    title: {
      fontSize: 14,
    },
    containerMainGrid: {
      marginTop: 10,
      width: '100%',
      height: 'auto',
      padding: 3,
      
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
     marginTop: -12,
     padding: 2,
    },
    txtMain: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    txtGenerarOracion: {
      color: 'black',
      fontSize: 18,
      textAlign: 'center',
      textDecorationLine: 'underline',
      marginRight: 30,
  }
});