
//import { createRouter, StackLayout } from 'expo-router';

// pantallas a navegar


import { Stack } from 'expo-router';
import { router } from 'expo-router';
import { Alert, Button } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import firebaseConfig from '../../src/firebase';
import { initializeApp } from 'firebase/app';
const app = initializeApp(firebaseConfig);
const auth = getAuth();


export default function Layout() {
    console.log(auth)
    /*
    const { user } = useAuth();
    console.log(user)
*/
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
    <Stack
    >

    <Stack.Screen name="Home"  options={{
        headerTitle: 'Ora por tu ser querido',
        headerTitleAlign: 'left',
        headerRight: () => (
            <Button
              onPress={logout}
              title="Cerrar sesión"
              color="#03045E"
            />
          ), // Agrega un botón a la derecha del encabezado
    }}/>

    <Stack.Screen name="Plantilla"  options={{
        headerTitle: 'Pide por su ser querido',
        headerTitleAlign: 'left',
        headerRight: () => (
            <Button
             // onPress={logout}
              title="Cerrar sesión"
              color="#03045E"
            />
          ), // Agrega un botón a la derecha del encabezado
    }}/>

    </Stack>
  );
}
