import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import MisOraciones from '../(tabs)/MisOraciones';
import { router } from "expo-router";

export default function TabLayout() {
  return (
    <Stack
    // https://reactnavigation.org/docs/headers#sharing-common-options-across-screens
 
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    
    >
    {/* Optionally configure static options outside the route. */}
    <Stack.Screen name="Home"  />
  
  </Stack>
  );
}
