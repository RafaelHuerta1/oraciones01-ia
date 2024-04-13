import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import MisOraciones from '../(tabs)/MisOraciones';
import { router } from "expo-router";

export default function TabLayout() {
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
    <Stack.Screen name="Plantilla" options={{
      headerTitle: 'Espacio de Oración',
      headerTitleAlign: 'center',
      headerLeft: () => <FontAwesome.Button size={20} name="arrow-left" backgroundColor="#3b5998"  onPress={() => {router.push('/pantallas/Home') }} />,
    }} />

        <Stack.Screen name="InfoOracion" options={{
      headerTitle: 'Oracion Completa',
     // component: MisOraciones,
      headerTitleAlign: 'center',
     // tabBarIcon: ({ color }) => <FontAwesome size={30} name="book" color={color} />,
      headerLeft: () => <FontAwesome.Button size={20} name="arrow-left" backgroundColor="#3b5998"  onPress={() => {router.push('/(tabs)/MisOraciones') }} />,
    }} />
  </Stack>
  );
}
