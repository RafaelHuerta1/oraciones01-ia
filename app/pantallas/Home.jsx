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
import _layout from '../(tabs)/_layout';

export default function HomeScreen() {
 // console.log(navigation)
 // const router = Router.useRouter();
 const logout = () => {
     signOut(auth).then(() => {
         // Sign-out successful.
         setTimeout(() => {
           Alert.alert('Sesión cerrada');
           router.push('/signIn');
         }, 1000);
       }).catch((error) => {
         // An error happened.
         console.log('Error al cerrar sesión')
       });
 }

  return (
    <View style={styles.mainContainerHome}>
            <Stack.Screen
              options={{
                headerTitle: 'Ora por su ser querido',
                headerTitleAlign: 'start',
                headerRight:  () => (
                <Button onPress={logout} title="Cerrar sesión"  />
                ),
              }}
              /> 
              
      <OracionesFeed />
    </View>
  );
  
}

const styles = StyleSheet.create({
 
});