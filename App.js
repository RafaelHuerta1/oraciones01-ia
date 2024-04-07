import { View, Text, StatusBar, StyleSheet } from "react-native";
import index from "./app/index";

export default function App() {
  return (
      <View style={styles.containerMainWelcome} >
          <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
          <index />

      </View>
    );
}
// singIn screen , signUp screen

const styles = StyleSheet.create({
  containerMainWelcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});


