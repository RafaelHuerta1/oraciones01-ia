/**
 * @nombre: este parametro es el nombre de la persona por la que se esta orando
 * @situacion: este parametro es la situacion por la que esta pasando la persona
 */
import { useState, useEffect } from 'react';
//import { Text } from 'react-native';
//import { Modal, View, Text, StyleSheet } from 'react-native';

//export  let oracionesCreadas = [];
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import firebaseConfig from '../../src/firebase';
import { initializeApp } from 'firebase/app';
//import { Alert } from 'react-native';
import { useNavigation, router } from 'expo-router';
import MisOraciones from '../(tabs)/MisOraciones';
import ModalInfo from '../componentes/ModalInf';
import React from 'react';

const app = initializeApp(firebaseConfig);

// createOracion
export default function CreateOracion({ oracionInfo }) {

  // console.log('Si se pasan los valores a create oracion!', oracionInfo.valorName );
  //console.log('Si se pasan los valores a create oracion!',oracionInfo.valorOracion );
  // valorNombre = {valorName: 'Juan', valorOracion: 'padre nuestro'};  

  console.log('Si se pasan los valores a create oracion!', oracionInfo);


  const { valorName, valorOracion } = oracionInfo;
  console.log('Valor name: ', valorName, 'Valor oracion: ', valorOracion);

  const [oracionesCreadas, setOracionesCreadas] = useState([]);
  //const [isTrue, setIsTrue] = useState(false); 

  const [modalVisible, setModalVisible] = useState(false);

  console.log('MODAL VISIBLE:  ', modalVisible);

  function almacenarOracionUsuario(oracionesCreadas, valorName, valorOracion) {
    const db = getDatabase();
    const uid = getAuth().currentUser.uid;
    //const nombre2 = valorName;
    //console.log(uid);
    // fc traer el userName
    const userName = getAuth().currentUser.displayName;
    console.log(userName);
    const reference = ref(db, "users/" + uid + "/oraciones/");

    // console.log('Referencia: ', reference, 'Oraciones creadas: ', oracionesCreadas);

    const oracionData = {
      nombre: valorName,
      oracionesCreadas: oracionesCreadas,
      oracion: valorOracion
    };

    push(reference, oracionData);




  }

  /** 
   *  - Credo de los apostoles
   *  - Salve reina
   *  - Gloria al padre
   *  - Oracion a san miguel arcangel
   * - Oracion a san benito
   * - Oracion a san judas tadeo
   * - Coronilla de la divina misericordia
   * 
   * 
   *  ** Oraciones por intencion 
   *  - Enfermos 
   *  - agradecimiento
   * - difuntos
   *  * Fortaleza
   * * Depresion
   * * Familia y amigos
   * * Esperanza
   * * Protección y Seguridad
   * 
   */



  useEffect(() => {
    let oracion = null;
    //let mensajeDeAliento = null;

    switch (valorOracion) {
      case 'padre nuestro':
        // mensajeDeAliento = `Recuerda,   ${valorName}  , que siempre estás en las manos de Dios y nunca estás solo. Él te guiará a través de estos tiempos difíciles.`;

        oracion = `Hoy, ${new Date().toLocaleDateString()}, nos reunimos en oración por ${valorName}. 
        Sabemos que está pasando por problemas difíciles, por eso le ofrecemos la siguiente oración el ${valorOracion}. Ademas queremos elevar nuestras voces en su nombre.` + `Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a 
        los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén... ,`;

        setOracionesCreadas((prevOraciones) => [...prevOraciones, oracion]);
        //console.log(valorName, valorOracion)
        //console.log('Array de oraciones.. ', oracionesCreadas);
        break;
      case 'ave maria':
        oracion = `Hoy, ${new Date().toLocaleDateString()}, nos reunimos en oración por ${valorName}. 
        Sabemos que está pasando por problemas difíciles, es por eso que le ofrecemos la siguiente oración el ${valorOracion} , 
        Dios te salve, María, llena eres de gracia, el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.
        Santa María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén.

        `;

        setOracionesCreadas((prevOraciones) => [...prevOraciones, oracion]);
        // console.log('Array de oraciones.. ', oracionesCreadas);
        //console.log(valorName, valorOracion)

        break;

      default:
        console.log("No se ha seleccionado ninguna oración");
        break;
    }




  }, [valorName, valorOracion]);

  useEffect(() => {
    if (oracionesCreadas.length > 0) {
      console.log('Oraciones creadas: ', oracionesCreadas);

      almacenarOracionUsuario(oracionesCreadas, valorName, valorOracion);
    }
    // router.push('../(tabs)/MisOraciones', { oracionesCreadas: oracionesCreadas });


  }, [oracionesCreadas]);


  //{ oracionesCreadas  ? <MisOraciones valorName={ valorName }  valorOracion={valorOracion}  /> : null  }  


  return null;
}

