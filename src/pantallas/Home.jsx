import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
//import { useAuth } from '../hooks/userAuth';
import OracionesFeed from "./Oraciones";

export default function HomeScreen({ navigation }) {
 // console.log(navigation)

  return (
    <View style={styles.mainContainerHome}>
      <OracionesFeed navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
 
});