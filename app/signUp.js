
import React from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Text, View, Modal, Button } from 'react-native';
import { Link, router } from 'expo-router';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from 'firebase/app';

import firebaseConfig from '../src/firebase';

const app = initializeApp(firebaseConfig);

const db = getDatabase();

const auth = getAuth();

function signUp() {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [errorCredencial, setErrorCredencial] = React.useState(null);

    const [value, setValue] = React.useState({
        email: '',
        password: '',
        name : '',
        error: ''
    })

    const onPress = () => { 
        signUp();
        router.push('/signIn');
    }

    // al crear la cuenta se crea la referencia con el nombre del usuario y se almacena en la base de datos
    function almacenarUsuarioDb(uid, name, email) {
        console.log('Almacenando usuario en la base de datos...', name , email)
        const reference = ref(db, "users/" + uid);
        set(reference, {
            username: value.name,
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
        else {
            try {
                console.log('Creando usuario...');
                const userCredencial = await createUserWithEmailAndPassword(auth, value.email, value.password);
                console.log(userCredencial);
                const user = userCredencial.user;
                console.log('Usuario creado con éxito', user);
                console.log('Usuario creado con éxito', user.uid);
                console.log('Usuario creado con éxito', user.email);
                console.log('Usuario creado con éxito', value.name);
                almacenarUsuarioDb(user.uid, value.name, user.email);  // Usa el UID del usuario como referencia


                // navigation.navigate('Sign In');
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
                return setErrorCredencial(errorMessage);

            }
        }



    }


    return (
        <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: "center", marginBottom: 100 }}>

            <Text style={styles.txtMain}>Crear Cuenta</Text>

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
            <View style={styles.child}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                    value={value.email}
                    placeholder="Ingresa su correo electronico."
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setValue({ ...value, name: text })}
                    value={value.name}
                    placeholder="Ingresa su nombre de usuario."
                    keyboardType="username"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    value={value.password}
                    secureTextEntry={true}
                    placeholder="Ingresa su contraseña."
                    keyboardType="password"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.txtCrearCuenta}>Crear Cuenta</Text>
            </TouchableOpacity>


            
       
                     <Link href="/signIn" asChild>
                        <Text style={styles.goIniciarSesion}>Tienes cuenta? {' '}
                        <Text style={{ color:'blue', textDecorationLine:"underline", fontSize:20 }}>Iniciar Sesion</Text>
                        
                        </Text>
                </Link>

            


        </View>
    );
}

export default signUp;

const styles = StyleSheet.create({
    txtMain: {
        fontSize:30,
        textAlign:"center" , 
        color:'#03045E',
        fontWeight:'bold',
        marginBottom:15,

    },
    txtCrearCuenta: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400',
    },
    containerMain: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    },
    input: {
        height: 45,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: "#03045E",
        borderRadius: 10,
        width: 300,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,

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
    },
    btnCerrarModal: {
        backgroundColor: "yellow",
        width: 300,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }

});