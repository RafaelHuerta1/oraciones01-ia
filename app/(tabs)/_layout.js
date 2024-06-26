import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import MisOraciones from './MisOraciones';

//import RedOracion from './RedOracion';
//import Perfil from './Perfil';

/** MVP:
 * mis oraciones tab layout 
 * perfil tab layout
 * @returns 
 */
import { router } from "expo-router";


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="MisOraciones"
        //component={MisOraciones}
        options={{
          title: 'Mis Oraciones ',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
          headerLeft: () => ( 
            <FontAwesome.Button
              size={20}
              name="arrow-left"
              backgroundColor="#3b5998"
              onPress={() => { router.push('/pantallas/Plantilla') }}
              style={{
                // Aquí puedes agregar tus estilos personalizados
                margin: 1,
                padding: 10,
                
                // etc.
              }}
            />
          ),
        }}
        initialParams={{ oracionesCreadas: [] }}

      />
      <Tabs.Screen
        name="RedOracion"
        //component={RedOracion}
        options={{
          title: 'Red de Oracion',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Perfil"
        //component={Perfil}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
