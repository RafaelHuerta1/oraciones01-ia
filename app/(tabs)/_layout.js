import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import MisOraciones from './MisOraciones';


/** MVP:
 * mis oraciones tab layout 
 * perfil tab layout
 * @returns 
 */


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="MisOraciones"
        //component={MisOraciones}
        options={{
          title: 'Mis oraciones',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
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


          {props => <MisOraciones {...props} />}

    </Tabs>
    
  );
}
