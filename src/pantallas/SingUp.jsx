import React from 'react';
import { Image, Pressable, StyleSheet, TextInput, Text, View, Modal, Button} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
const db = getDatabase();

const auth = getAuth();

function SignUpScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [errorCredencial, setErrorCredencial] = React.useState(null);

  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })


  function almacenarUsuarioDb(referencId, user, email) {
    const reference = ref(db, "users/" + referencId);
    set(reference, {
      username: value.user,
      email: value.email,
    });
  }

      
const onRequestCloseModal = () => {
  console.log("Modal cerrado");
  setModalVisible(false);
};

  async function signUp() {
    if (value.email === '' || value.password === '') {
      console.log('El correo y la contraseña son obligatorios.');
      setErrorCredencial('El correo y la contraseña son obligatorios.');
      setModalVisible(true);
    }
    else{
      try {
          const userCredencial = await createUserWithEmailAndPassword(auth, value.email, value.password);
          console.log(userCredencial);
          const user = userCredencial.user;
          console.log('Usuario creado con éxito', user);
          almacenarUsuarioDb(user.uid, value.user, value.email);  // Usa el UID del usuario como referencia


        navigation.navigate('Sign In');
      } catch (error) {
        console.log(error);
        let errorMessage = '';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = '¡Vaya! Este correo ya está asociado con otra cuenta. ¿Quieres iniciar sesión en su lugar?';
          setModalVisible(true);
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = '¡Ups! Parece que el formato de tu correo no es válido. ¿Puedes verificarlo?';
          setModalVisible(true);
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Tu contraseña parece ser un poco débil. ¿Podrías intentar con una contraseña más fuerte?';
          setModalVisible(true);
        } else if (error.code === 'auth/operation-not-allowed') {
          errorMessage = 'Lo siento, esta forma de autenticación no está habilitada. Por favor, contacta al soporte técnico.';
        } else {
          errorMessage = 'Algo salió mal. Por favor, verifica tus datos y vuelve a intentarlo.';
        }
       return  setErrorCredencial(errorMessage);
     
      }
    }


  
  }

  return (
    <View style={{flex:1, justifyContent:"center", alignContent:'center', alignItems:"center" /*marginTop:-250 */}}>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.modalText}> {errorCredencial} </Text>
                    <Button
                    title="Volver a intentar"
                    style={styles.btnCerrarModal}
                    onPress={onRequestCloseModal}
                      >
                    </Button>
              </View>
            </View>
      </Modal>
      
      
      <View style={{    marginTop: -100,}}>
        <Image  style={{ width: 100, height: 100, alignSelf: "center" }} />
        <Text style={{fontSize:30,
           textAlign:"center" , 
           color:'#03045E',
           fontWeight:'bold',
           marginBottom:20,
           }}>
          Crear Cuenta
        </Text>

        <View style={{marginTop:10}} >
          <View className="mt-1 space-y-4">
            <View style={styles.containerEmail}>
            <MaterialCommunityIcons style={styles.icon} name="email" size={18} color="gray" />

              <TextInput
                placeholder='Email'
                value={value.email}
                style={{flex:1, padding: 5}}
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
            </View>
            <View style={styles.containerEmail}>
            <MaterialCommunityIcons style={styles.icon} name="account-box-multiple" size={18} color="gray" />
              <TextInput
                placeholder='Usuario'
                value={value.user}
                style={{flex:1, padding: 5}}
                onChangeText={(text) => setValue({ ...value, user: text })}
              />
            </View>
            <View  style={styles.containerEmail}>
            <MaterialCommunityIcons style={styles.icon} name="account-box-multiple" size={18} color="gray" />

              <TextInput
                placeholder="Password"
                style={{flex:1, padding: 5}}
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
              />
            </View>
          </View>
          <Pressable style={styles.btnCrearCuenta} ><Text style={{color:"white", fontSize:22}} onPress={signUp}>Crear Cuenta</Text></Pressable>
        </View>
        <Text style={{ textAlign:"center"}}>Tienes cuenta? <Text style={{ color:'blue', textDecorationLine:"underline", fontSize:20 }} onPress={() => navigation.navigate('Sign In')}>Iniciar Sesion</Text></Text>
      </View>
    </View>
  );
}

export default SignUpScreen;






const styles = StyleSheet.create({
  containerEmail: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 12,
    width: 300,
    height: 40,
    marginBottom: 20,
  },
  btnCrearCuenta: {
    backgroundColor: "#03045E",
    borderRadius: 10,
    width: 300,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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