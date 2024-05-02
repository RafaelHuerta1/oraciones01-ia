import React from 'react';
import { Text, View, StyleSheet, Button, Alert} from 'react-native';
import { useAuth } from '../hooks/userAuth';
import OracionesFeed from "./Oraciones";
import { Stack, router } from 'expo-router';
import { getAuth, signOut } from "firebase/auth";
import firebaseConfig from '../../src/firebase';
import { initializeApp } from 'firebase/app';
const app = initializeApp(firebaseConfig);
const auth = getAuth();
import FontAwesome from '@expo/vector-icons/FontAwesome';
import registerNNPushToken from 'native-notify';

export default function HomeScreen() {

  //registerNNPushToken(21040, 'lBM3RME0997q7b4f7QRq3O');
  registerNNPushToken(21093, 'vHJB5qYrvgofyIvhA4qhbd');
  console.log('Token registrado');  
  
 const logout = () => {

     signOut(auth).then(() => {
         // Sign-out successful.
         setTimeout(() => {
           Alert.alert('Sesión cerrada');
           router.push('/signIn');
         }, 1000);
       }).catch((error) => {
         // An error happened.
         console.log('Error al cerrar sesión', error);
         Alert.alert('Error al cerrar sesión');
       });
       
      //router.push('/pantallas/Plantilla');
 }

  return (
    <View style={styles.mainContainerHome}>
            <Stack.Screen
              options={{
                headerTitle: 'Inicio',
                headerTitleAlign: 'start',
                headerRight:  () => (
                  <Button onPress={logout} title="Cerrar Sesion"  />
                  ),
               // headerLeft: () => <FontAwesome.Button size={20} name="arrow-left" backgroundColor="#3b5998"  onPress={() => {router.push('/pantallas/Home') }} />,
                }}
              /> 
              
      <OracionesFeed />
    </View>
  );
  
}

const styles = StyleSheet.create({
  mainContainerHome: {
      marginTop: 10,
  },
});