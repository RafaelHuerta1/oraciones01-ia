import React, { useState, useEffect }  from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Link } from "expo-router";

import { router } from "expo-router";
import { getDatabase, ref, onValue} from "firebase/database";
import { getAuth } from "firebase/auth";
import firebaseConfig from '../../src/firebase';
import { initializeApp } from 'firebase/app';

import { useLocalSearchParams } from "expo-router";

const app = initializeApp(firebaseConfig);

app;

//console.log(oracionesCreadas)
export default function MisOraciones(    ) {

  
  // Acceder al parámetro selectedName
 

   const [nombres, setNombres] = useState([]);
    const [oracionesName, setOracionesName] = useState([]);
    //const [allData, setAllData] = useState([]);
    const [oracionCompleta, setOracionCompleta] = useState([]);
    //const [oracionCompletaUsuario, setOracionCompletaUsuario] = useState([]);
    const db = getDatabase();
    const [allOraciones, setAllOraciones] = useState([]);


    // buscar el nodo en oraciones/ que conicida con el selectName  y traerlo de firebase
    const uid = getAuth().currentUser.uid;
    const oracionesRef = ref(db, "users/" + uid + "/oraciones/"  );
   console.log('Oraciones ref 1: ', oracionesRef);

   // const referenceAllOraciones = ref(db, "users/" + uid );
    //console.log('Oraciones ref: ', referenceAllOraciones);


    useEffect(() => {
        const unsubscribe = onValue(oracionesRef, (snapshot) => {
            const data = snapshot.val();
            console.log('DATA: ', data);
            // Extrae todos los nombres de las oraciones
            
            //const nombresOraciones = Object.values(data).map(item => item.nombre);
            //const oraciones = Object.values(data).map(item => item.oracion);
            //const oracionCompletas = Object.values(data).map(item => item.oracionesCreadas);
            const allOraciones = Object.values(data).map(item => item);
            console.log('All oraciones: ', allOraciones);
            /*
            console.log('Nombres: ', nombresOraciones);
            console.log('Oraciones: ', oraciones);
            console.log('Oraciones completas: ', oracionCompletas);
            setNombres(nombresOraciones);
            setOracionesName(oraciones);
            setOracionCompleta(oracionCompletas);
            */
                
            setAllOraciones(allOraciones);

            console.log('All oraciones: ', allOraciones);

         });
         
        return () => unsubscribe();
}, []);




      
   // console.log('Todas las oraciones: 2', oracionCompleta);

  
 

  //  console.log('Nombres: ', nombres);
    /** verMas router nav a new page, 
    const verMas = () => {
        router.push('/pantallas/InfoOracion', oracion= {nombres});
    }

 */
       
    const createCard = (index, nombre, oracion, oracionesCreadas)  => {
        //console.log('Nombres: ', nombres);
        return (
            <View key={index} style={styles.containerCard}>

                <View style={styles.containerOracionName} >
                    <Text style={styles.txtMain}>Esta oracion es para: </Text>
                    <Text style={styles.txtMain}> {nombre} </Text>
                </View>

                <View style={styles.containerOracion}>
                    <Text style={styles.txtMain}>Oracion: </Text>
                    <Text style={styles.txtMain}> {oracion}</Text>
                </View>
                
                <View style={styles.containerOracion}>
                <Link  
                 href={{
                    pathname: "/pantallas/InfoOracion",
                    params: {nombre: nombre ,    oracionesCreadas: oracionesCreadas}
                  }}
                  asChild
                  >
                
                
                        <TouchableOpacity /*onPress={verMas} */>
                                <Text style={styles.txtVerMas}>Ver mas</Text>
                            </TouchableOpacity>
                </Link>
                   
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
                
                {
                    allOraciones.map((item, index) => {
                        return createCard(index, item.nombre, item.oracion, item.oracionesCreadas);
                    })
                }


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