import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Welcome from '../src/pantallas/Welcome';
//import ButtonPer from "../src/componentes/ButtonPer";

//import { Router } from 'expo-next-react-navigation';
//import SignUpScreen from '../src/pantallas/SingUp';


// signin
// signup
export default function index() {
 




  return (
    <View>
      <Welcome />

      <View  >
          <Link  href="/signIn" asChild >
            <TouchableOpacity style={styles.containerMainBtnsWelcome} >
              <Text style={styles.btnMain} >Iniciar Sesion</Text>
            </TouchableOpacity>
          </Link>
          
          <Link  href="/signUp" asChild >
            <TouchableOpacity style={styles.containerMainBtnsWelcome} >
              <Text style={styles.btnMain} >Crear Cuenta</Text>
            </TouchableOpacity>
          </Link>
      </View>    


      
    </View>
  );
}

const styles = StyleSheet.create({
  btnMain: {
    backgroundColor: '#0077B3',
    padding: 10,
    borderRadius: 10,
    width: 270,
    alignItems: 'center',
    margin: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
  },
  containerMainBtnsWelcome: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

