/**
 * @nombre: este parametro es el nombre de la persona por la que se esta orando
 * @situacion: este parametro es la situacion por la que esta pasando la persona
 */
import { useState, useEffect } from 'react';
import MisOraciones from '../(tabs)/MisOraciones';
//import { Text } from 'react-native';
//import { Modal, View, Text, StyleSheet } from 'react-native';

//export  let oracionesCreadas = [];
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import firebaseConfig from '../../src/firebase';
import { initializeApp } from 'firebase/app';
//import { Alert } from 'react-native';
import { useNavigation } from 'expo-router';

const app = initializeApp(firebaseConfig);

// createOracion
export default function CreateOracion({ valorName, valorOracion}) {


    const navigation = useNavigation();



    //console.log(navigation)
    const [oracionesCreadas, setOracionesCreadas] = useState([]);
    //const [isTrue, setIsTrue] = useState(false); 
    
    function almacenarOracionUsuario(oracion) {
      const db = getDatabase();
      const uid = getAuth().currentUser.uid;

console.log(uid);
      const reference = ref(db, "users/" + uid + "/oraciones");
    
      // Aquí estamos usando 'push' en lugar de 'set' para agregar la oración a una lista existente de oraciones.
      push(reference, oracion);
    }

    useEffect(() => {
      let oracion = null;

        switch (valorOracion) {
          case 'padre nuestro':
            oracion = `Hoy, ${new Date().toLocaleDateString()}, nos reunimos en oración por ${valorName}. Sabemos que está pasando por problemas difíciles, por eso le ofrecemos la siguiente oración: ${valorOracion}, y queremos elevar nuestras voces en su nombre.` +
              `Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén`;
    
           // setOracionesCreadas((prevOraciones) => [...prevOraciones, oracionPadre]);
            // console.log(oracionesCreadas, 'Oraciones creadas', oracionPadre);
            break;
    
          default:
            console.log("No se ha seleccionado ninguna oración");
            break;
        }

        if (almacenarOracionUsuario !== null) {

          setOracionesCreadas((prevOraciones) => [...prevOraciones, oracion]);
          almacenarOracionUsuario(oracion);
      }


      }, [valorName, valorOracion]);

      useEffect(() => {
        /*setTimeout(() => {
          Alert.alert('Oración enviada con éxito, puedes verla en Mis Oraciones');
          navigation.navigate('MisOraciones', { oracionesCreadas });
        }, 2000);*/
       //navigation.navigate('MisOraciones', { oracionesCreadas });
       //<MisOraciones oracionesCreadas />
      }, [oracionesCreadas]);
    
      // Navega a la pantalla "Mis Oraciones" y pasa las propiedades
    
      // No es necesario devolver nada aquí
      return null;
    
}