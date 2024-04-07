import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Welcome from './pantallas/Welcome';
//import ButtonPer from "../src/componentes/ButtonPer";

//import { Router } from 'expo-next-react-navigation';
//import SignUpScreen from '../src/pantallas/SingUp';

//import	 {useAuth} from "./hooks/userAuth";
import TabLayout from './pantallas/_layout';
import Tab from './(tabs)/_layout';


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
              <Text style={styles.btnCreateCuenta} >Crear Cuenta</Text>
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
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  btnCreateCuenta: {
    backgroundColor: '#00B4D8',
    padding: 10,
    borderRadius: 10,
    width: 270,
    alignItems: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 10,
  },
  containerMainBtnsWelcome: {
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

