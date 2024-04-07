import React from "react";

import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from '../src/firebase';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
app
const provider = new GoogleAuthProvider();

import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  Modal,
  Button,
  Alert,
  TouchableOpacity
} from "react-native";






const auth = getAuth();

function signIn() {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const [modalVisible, setModalVisible] = React.useState(false);
  const [errorCredencial, setErrorCredencial] = React.useState(null);
  

const onRequestClose = () => {
  console.log("Modal cerrado");
  setModalVisible(false);
};

  async function signInUser() {
   // console.log(value.email);
    //console.log("Hola mundo")
    console.log(modalVisible);
    //console.log(value.password);
    if (value.email === "" || value.password === "") {
        setModalVisible(true);
        setErrorCredencial("Los campos son obligatorios. Por favor, verifica tus datos y vuelve a intentarlo.");
        //Alert.alert("Hola mundo");
      }
      else {

        try {
          await signInWithEmailAndPassword(auth, value.email, value.password);

        } catch (error) {
          console.log(error);
          let errorMessage = '';
         if (error.code === 'auth/invalid-credential') {
            errorMessage = 'Hmm, parece que tus credenciales no son válidas. Por favor, verifica tus datos y vuelve a intentarlo.';
            setModalVisible(true);
          } else {
            // Para otros tipos de errores, puedes usar un mensaje genérico
            errorMessage = 'Algo salió mal. Por favor, verifica tus datos y vuelve a intentarlo.';
            setModalVisible(true);
          }
          return setErrorCredencial(errorMessage);
        }
  }
    
  }

  return (
    <View style={{ flex: 1}}>
      <View>

          <Modal
             style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
           // onRequestClose={onRequestClose}
            >
              
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.modalText}> {errorCredencial} </Text>
                    <Button
                    title="Volver a intentar"
                    style={styles.btnCerrarModal}
                    onPress={onRequestClose}
                      >
                    </Button>
              </View>
            </View>
          </Modal>

      </View>
      <View style={styles.container}>

        <Text style={styles.txtIniciarSeccion}>
          Iniciar sesión
        </Text>

        <View style={styles.child}>
          <View >
            <View style={styles.containerEmail}>
              <MaterialCommunityIcons style={styles.icon} name="email" size={18} color="gray" />
              <TextInput
                placeholder="Correo electronico"
                style={styles.input}
                value={value.email}
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
            </View>

            <View style={styles.containerEmail}>
            <MaterialCommunityIcons style={styles.icon} name="lock" size={18} color="gray" />
              <TextInput
                placeholder="Contraseña"
                style={styles.input}

          
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
              />
            </View>
          </View>
          <TouchableOpacity
            // Cambia el color de fondo cuando se presiona el componente
            style={styles.btnIniciarSeccion}
           onPress={signInUser}
          >
            
            <Text style={styles.textoIniciarSeccion}>Iniciar sesión</Text>
       

          </TouchableOpacity>
        </View>
        <Text style={{marginTop:15}}
        //onPress={() => navigation.navigate("Sign Up")}
        >
          No tienes cuenta?{" "}
          <Text
            style={{ color: "blue", textDecorationColor: "#00B4D8", textDecorationLine: "underline", fontSize: 20}}
          >
            Crear Cuenta
          </Text>
        </Text>
        <Text 
        style={{marginTop:15}}
       // onPress={() => navigation.navigate("RecuperarContrasena") }
        >
          Olvidaste tu contraseña?{" "}
          <Text
            style={{ color: "blue", textDecorationColor: "#00B4D8", textDecorationLine: "underline", fontSize: 20}}
           
          >
            Recuperar Contraseña
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default signIn;

const styles = StyleSheet.create({
  txtIniciarSeccion: {
    color: "#03045E",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: -100,
  },
  child: {
    marginTop: 15,
  },
  containerEmail: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 12,
    width: 300,
    height: 40,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingLeft: 7,
    width: 100, // 'w-full' se traduce a un width de 100
    height: 50, // 'h-12' se traduce a un height de 50
  },
  btnIniciarSeccion: {
    backgroundColor: "#03045E",
    width: 300,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textoIniciarSeccion: {
    color: "white",
    fontSize: 20,
  },
  btnCerrarModal: {
    backgroundColor: "yellow",
    width: 300,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)', // This will give a semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});