import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
//import ModalInformativo from '../components/ModalInformativo';

import { Link } from 'expo-router';

import { initializeApp } from 'firebase/app';



import firebaseConfig from '../src/firebase';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

function RecuperarContrasena() {


    const [showModal, setShowModal] = React.useState(false);
    const [text, onChangeText] = React.useState('');

    const validarEmail = (text) => {
        /**
         *  validaremos el formato para no hacer consultas inecesarias, 
         */

        if (text === "") {
            Alert.alert("El campo esta vacio")
        }
        else {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)*[a-zA-Z]{2,}))$/;
        emailRegex.test(text) ? enviarCorreo(text) : Alert.alert("El correo es incorrecto");
        onChangeText("");
    }
}


const enviarCorreo = async (text) => {
    console.log("Validando correo electronico.... ")
    sendPasswordResetEmail(auth, text)
    .then(() => {
      // Password reset email sent!
      //console.log("Correo enviado")
  
      setShowModal(true)

      // ..
    })
    .catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error: ", errorCode, errorMessage)
      // ..
    });
}

    return (
        <View style={styles.containerMainRecuperarContrasena}>
            <Text style={styles.txtMain}>Recuperar contraseña</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Ingrese su Correo Electronico"

            />
            <TouchableOpacity
                         style={styles.btnEnviar}
                onPress={() => validarEmail(text)}
            >
                <Text style={{color: '#CAF0F8' }} >Enviar</Text>
            </TouchableOpacity>
            {/*<ModalInformativo accion={showModal} setAccion={setShowModal} />*/}

            {/* showModal ? <View> <Text>Gracias hemos enviado un correo</Text> <Button title="Cerrar" onPress={() => setShowModal(false)} /> </View> : null */}


                <View style={styles.containerRegresarSignIn}>
                    <Link href={'/signIn'}>
                    <Text
                    style={{textAlign: "auto", color: "#03045E", fontSize: 20, textDecorationColor: "#03045E", textDecorationLine: "underline", marginHorizontal: 10,}}
                    >
                    Regresar a login
                    </Text>                    
                    </Link>
                </View>


        </View>
    )

}

export default RecuperarContrasena;

const styles = StyleSheet.create({
    containerMainRecuperarContrasena: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    txtMain: {
        color: "#03045E",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        marginTop: 145,
    },
    input: {
        height: 40,
        width: 300,
        marginTop: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    btnEnviar: {
        alignItems: "center",
        backgroundColor: "#03045E",
        padding: 10,
        marginTop: 17,
        width: 300,
        borderRadius: 10,
    },
    containerRegresarSignIn: {
        
        marginTop: 20,
       
    },
})