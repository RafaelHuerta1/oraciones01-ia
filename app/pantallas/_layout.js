
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
      // https://reactnavigation.org/docs/headers#sharing-common-options-across-screens
      /*
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      */
      >
      {/* Optionally configure static options outside the route. */}
      <Stack.Screen name="Home" options={{}} />
      <Stack.Screen name="Plantilla" options={{}} />
    </Stack>
  );
}
