import React from "react";
import HomeScreen from "../pantallas/Home";
//import PlantillaOracion from "../screens/PlantillaOracion";
//import MisOraciones from "../screens/MisOraciones";
//import OracionesPublicas from "../screens/OracionesPublicas";

import { Stack } from 'expo-router';




export default function UserStack() {
  return (
    <Stack>
    
    <Stack.Screen name={HomeScreen}  
    options={{ headerTitle: 'Oraciones', headerTitleAlign: 'center'}}
/>
    
      
    </Stack>
  );
}