import React from 'react';
import { Text, View, StyleSheet, Button} from 'react-native';
//import { useAuth } from '../hooks/userAuth';
import OracionesFeed from "./Oraciones";
import { Stack } from 'expo-router';

export default function HomeScreen() {
 // console.log(navigation)

  return (
    <View style={styles.mainContainerHome}>
      <Stack.Screen
        options={{
          headerTitle: 'Ora por su ser querido',
          headerTitleAlign: 'center',
        }}
      />
      <OracionesFeed />
    </View>
  );
}

const styles = StyleSheet.create({
 
});