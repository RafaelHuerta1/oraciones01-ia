import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';

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
      headerTitleAlign: 'start',
    }} />
    <Stack.Screen name="MisOraciones" options={{
      headerTitle: 'Mis Oraciones',
      headerTitleAlign: 'start',
    }} />

  </Stack>
  );
}
