import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useEffect , useState} from "react";
import { useLocalSearchParams } from "expo-router";
//import { useState, useEffect } from 'react';

import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from "firebase/auth";
import ButtonPer from "../componentes/ButtonPer";


export default function InfoOracion() {
  /*
  const { id , oracionCompleta} = useLocalSearchParams();
  console.log('ORACION COMPLETA: ', oracionCompleta);
  console.log('ID: ', id);
  */
  /*
  const { id , oracionCompleta} = useLocalSearchParams();
  console.log('ORACION COMPLETA: ', oracionCompleta);
  */
  
  const {oracionesCreadas, nombre} = useLocalSearchParams();
 // console.log('id:: ',id);
  console.log(oracionesCreadas);
/*
 const [nombres, setNombres] = useState([]);
  const [oracionesName, setOracionesName] = useState([]);
  const [OracionCompletaUsuario, setOracionCompletaUsuario] = useState([]);
  const uid = getAuth().currentUser.uid;
  const db = getDatabase();

  const oracionesRef = ref(db, "users/" + uid + "/oraciones/" + id + '/userId/' );

  useEffect(() => {
            const unsubscribe = onValue(oracionesRef, (snapshot) => {
              const data = snapshot.val();
              // console.log('DATA; ',data);
              // Extrae todos los nombres de las oraciones


              const nombresOraciones = Object.values(data).map(item => item.nombre);
              const oraciones = Object.values(data).map(item => item.oracion);
              const oracionCompletas = Object.values(data).map(item => item.oracionesCreadas);
              console.log('Nombres: ', nombresOraciones);
              console.log('Oraciones: ', oraciones);
              console.log('Oraciones completas: ', oracionCompletas);
              setNombres(nombresOraciones);
              setOracionesName(oraciones);
              setOracionCompletaUsuario(oracionCompletas);

              // Crea un array con los nombres y las oraciones
            // allData.push({ index: index ,  nombres: nombresOraciones, oracionesName: oraciones, oracionCompleta: oracionCompleta });
            //setAllData(nombresOraciones.map((nombre, index) => ({ index, nombres: nombre, oracionesName: oraciones[index] , oracionCompleta: oracionCompleta }))); // EST

              //console.log('All data: ', allData);
             
      });
         return () => unsubscribe();
  }, [id, oracionesCreadas]);

*/



  /*
  //const [oracionCompleta, setOracionCompleta] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState([]);

  const auth = getAuth();
  //console.log(auth);

  const db = getDatabase();
  //console.log(db);
  

  const uid = getAuth().currentUser.uid
  const reference = ref(db, "users/" + uid + "/oraciones/" + '/userId/');
  //console.log(oracionesRef);

 console.log('ID: ',uid);

    console.log('REF: ',reference);

  

  useEffect(() => {
    const unsubscribe = onValue(reference, (snapshot) => {
      const data = snapshot.val();
     console.log('DATA : ', data);

      // buscar el nombre del usuario mediante el id y traer oracionesCeadas 
      const oraciones = Object.values(data).map(item => item.oracionCreadas);
      const nombreUsuarioRef = Object.values(data).map(oracion => oracion.nombre); // y oracion.oracion); nos trae el nombre de la oracion
    
      console.log('ID: ',uid);
      console.log('ORACIONES COMPLETAS ---: ', oraciones);
      console.log('NOMBRE DEL USUARIO : ', nombreUsuarioRef);

      setOracionCompleta(oraciones);
      setNombreUsuario(nombreUsuarioRef); // nos regresa el nombre del usuario de la oracion
    });
    return () => unsubscribe();
  }, []);

/*
const searchOracion = (id) => {
  


  onValue(orderByChild(oracionesRef, 'nombre'), equalTo(id), (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let oracion = childSnapshot.val().oracion;
      console.log(oracion);
    });
  });

}

searchOracion(id);


*/
  return (

    <View>
      <View
        style={{ alignItems: 'center' }}
      >
   
      </View>
      <View>
        <Text style={styles.txtInfoOracionMain}> Esta oracion es para: {nombre} </Text>
       <ScrollView>
              <View  style={styles.containerMainOracionCompleta} >
                  <Text style={styles.oracionCompleta}  >  {oracionesCreadas} </Text>
              </View>
       </ScrollView>

      <View
        style={{ alignItems: 'center',flexDirection: 'row', justifyContent: 'space-around'}}

      >
        <ButtonPer text='Compartir Oracion'
        color='#03045E'
        />
        
      </View>


      </View>
    </View>
  );
  
}



const styles = StyleSheet.create({
  txtInfoOracionMain: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
  },
  txtInfoOracion: {
    fontSize: 25,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 20,
    padding: 10,
  },
  containerMainOracionCompleta: {
    marginTop: 12,
    padding: 10,
  },
  oracionCompleta: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    
  },
});