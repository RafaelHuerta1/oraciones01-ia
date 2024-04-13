import React, { useState, useEffect }  from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { router } from "expo-router";
import { getDatabase, ref, onValue} from "firebase/database";
import { getAuth } from "firebase/auth";
import firebaseConfig from '../../src/firebase';
import { initializeApp } from 'firebase/app';


const app = initializeApp(firebaseConfig);

app;

//console.log(oracionesCreadas)
export default function MisOraciones( ) {
   

    const [nombres, setNombres] = useState([]);
    const [oracionesName, setOracionesName] = useState([]);
    const [allData, setAllData] = useState([]);

    const db = getDatabase();

    useEffect(() => {

      const uid = getAuth().currentUser.uid;
      const oracionesRef = ref(db, "users/" + uid + "/oraciones");
  
      // Escucha los cambios en la referencia de las oraciones
      const unsubscribe = onValue(oracionesRef, (snapshot) => {
        const data = snapshot.val();
        //console.log('DATA; ',data);
        // Extrae todos los nombres de las oraciones
        const nombresOraciones = Object.values(data).map(oracion => oracion.nombre);

        const oraciones = Object.values(data).map(oracion => oracion.oracion);

        // Actualiza el estado con los nuevos nombres
        setNombres(nombresOraciones);
        setOracionesName(oraciones);
      //  setAllData([...nombresOraciones, ...oraciones]);
      setAllData(nombresOraciones.map((nombre, index) => ({ index, nombres: nombre, oracionesName: oraciones[index] }))); // EST
    });
  
      // Limpia la suscripción al desmontar el componente
      return () => unsubscribe();
    }, []);


    /** verMas router nav a new page,  */
    const verMas = () => {
        router.push('/pantallas/InfoOracion', oracion= {nombres});
    }


    const createCard = (index, nombres, oracionesName)  => {
        return (
            <View key={index} style={styles.containerCard}>

                <View style={styles.containerOracionName} >
                    <Text style={styles.txtMain}>Esta oracion es para: </Text>
                    <Text style={styles.txtMain}> {nombres} </Text>
                </View>

                <View style={styles.containerOracion}>
                    <Text style={styles.txtMain}>Oracion: </Text>
                    <Text style={styles.txtMain}> {oracionesName}</Text>
                </View>

                <View style={styles.containerOracion}>
                    <TouchableOpacity onPress={verMas}>
                        <Text style={styles.txtVerMas}>Ver mas</Text>
                    </TouchableOpacity>
                    <Text style={styles.txtVerMas}>Eliminar Oracion.</Text>

                </View>

            </View>
        );
    }

  
        
      




    return (

    
        db === null || nombres === null || oracionesName === null  ?
            <View>
              <Text style={styles.infoCard}>No hay oraciones creadas</Text>
            </View>
          :
          <View>
            <ScrollView >
                {allData.map(( {index, nombres , oracionesName} ) => {
                    return createCard(index, nombres, oracionesName);
                })}
            </ScrollView>
          </View>
      






    );
}


const styles = StyleSheet.create({

    containerCard   : {
        backgroundColor: 'white',
        padding: 25,
        margin: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'grey',
    },
    txtMain: {
        fontSize: 17,
        fontWeight: '400',
        textAlign: 'center',
        margin: 0,
        color: 'black',
    },



    containerOracionName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    containerOracion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    txtVerMas: {
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'center',
        margin: 0,
        color: 'blue',
    },

});