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
  const { token } = useLocalSearchParams();
  console.log(token); // eeror token udentificado, al navegar pantalals/InfoOracion y regresar a MisOraciones

   const [nombres, setNombres] = useState([]);
    const [oracionesName, setOracionesName] = useState([]);
    //const [allData, setAllData] = useState([]);
    const [oracionCompleta, setOracionCompleta] = useState([]);
    //const [oracionCompletaUsuario, setOracionCompletaUsuario] = useState([]);
    const db = getDatabase();
    let todasLasOraciones = [];

    // buscar el nodo en oraciones/ que conicida con el selectName  y traerlo de firebase
    const uid = getAuth().currentUser.uid;
    const oracionesRef = ref(db, "users/" + uid + "/oraciones/" + token + '/userId/' );
   console.log('Oraciones ref 1: ', oracionesRef);

    const referenceAllOraciones = ref(db, "users/" + uid );
    console.log('Oraciones ref: ', referenceAllOraciones);


    useEffect(() => {

        console.log('Entre  al useEfect');

        // funciona, solo trae la informacion de la oracion en especifico
        /*
        const unsubscribe = onValue(oracionesRef, (snapshot) => {
            const data = snapshot.val();
            // console.log('DATA; ',data);
            // Extrae todos los nombres de las oraciones


            const nombresOraciones = Object.values(data).map(item => item.nombre);
            const oraciones = Object.values(data).map(item => item.oracion);
            const oracionCompletas = Object.values(data).map(item => item.oracionesCreadas);
            console.log('Nombres: ', nombresOraciones);
            console.log('Oraciones: ', oraciones);
            console.log('Oraciones completas: ', oracionCompleta);
            setNombres(nombresOraciones);
            setOracionesName(oraciones);
            setOracionCompletaUsuario(oracionCompletas);

            // Crea un array con los nombres y las oraciones
           // allData.push({ index: index ,  nombres: nombresOraciones, oracionesName: oraciones, oracionCompleta: oracionCompleta });
           //setAllData(nombresOraciones.map((nombre, index) => ({ index, nombres: nombre, oracionesName: oraciones[index] , oracionCompleta: oracionCompleta }))); // EST

            //console.log('All data: ', allData);

        });
  */
        const unsubscribeAllOraciones = onValue(referenceAllOraciones, (snapshot) => {
            const data = snapshot.val();
            console.log('DATA: ', data);
        

            for (let oracion in data.oraciones) {
                if (data.oraciones.hasOwnProperty(oracion)) {
                    // Itera sobre cada objeto userId
                    for (let key in data.oraciones[oracion].userId) {
                        if (data.oraciones[oracion].userId.hasOwnProperty(key)) {
                            // Añade la oración a todasLasOraciones
                            
                            todasLasOraciones.push({
                                nombre: data.oraciones[oracion].userId[key].nombre,
                                oracion: data.oraciones[oracion].userId[key].oracion,
                                oracionesCreadas: data.oraciones[oracion].userId[key].oracionesCreadas
                            });
                            
                          
                        }
                    }
                }
            }
            setOracionCompleta(todasLasOraciones)
           // console.log('Todas las oraciones: ', todasLasOraciones);
        });
            return () => { 
              //  unsubscribe();
                unsubscribeAllOraciones();
            } 
    }, [uid]);


      
   // console.log('Todas las oraciones: 2', oracionCompleta);

  
 

  //  console.log('Nombres: ', nombres);
    /** verMas router nav a new page, 
    const verMas = () => {
        router.push('/pantallas/InfoOracion', oracion= {nombres});
    }

 */
       
    const createCard = (index, nombres, oracion, oracionesCreadas)  => {
        return (
            <View key={index} style={styles.containerCard}>

                <View style={styles.containerOracionName} >
                    <Text style={styles.txtMain}>Esta oracion es para: </Text>
                    <Text style={styles.txtMain}> {nombres} </Text>
                </View>

                <View style={styles.containerOracion}>
                    <Text style={styles.txtMain}>Oracion: </Text>
                    <Text style={styles.txtMain}> {oracion}</Text>
                </View>
                
                <View style={styles.containerOracion}>
                <Link  
                 href={{
                    pathname: "/pantallas/InfoOracion",
                    params: { id: token, oracionesCreadas: oracionesCreadas}
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
                
                    {oracionCompleta.map((oracion, index) => 
                    createCard(index, oracion.nombre, oracion.oracion, oracion.oracionesCreadas))
                    
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