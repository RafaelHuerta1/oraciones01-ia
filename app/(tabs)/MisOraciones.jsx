import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
//import { reproducirOracion } from '../logic/reproducirOracion';
//import  { oracionesCreadas } from "../logic/createOracion";
//import { Audio } from 'expo-av';

//console.log(oracionesCreadas)
function MisOraciones({ route }) {
    //const { oracionesCreadas } = route.params;
   // const [sound, setSound] = useState();

    const oracionesCreadas = route.params ? route.params.oracionesCreadas : [];
    //console.log(oracionesCreadas);
    //    console.log(oracionesCreadas);
    //console.log(setOracionesCreadas);
    //  console.log('Estoy en oracionesCreadas:', oracionesCreadas);
    /*
    async function playTextAsAudio() {
        try {
            const XI_API_KEY = "5de65ebd0a5267b4659bb99ce38297a1";
            const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
            const TEXT_TO_SPEAK = "Hola, este es un texto de prueba...";

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': XI_API_KEY
                },
                body: JSON.stringify({
                    "model_id": "eleven_multilingual_v2",
                    "text": TEXT_TO_SPEAK,
                    "voice_settings": {
                        "similarity_boost": 0.8,
                        "stability": 0.5,
                        "style": 0.0,
                        "use_speaker_boost": true
                    }
                })
            };

            fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, options)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));
        } catch (error) {
            console.log("Error: " + error.message);
        }
    }

*/

    const eliminarOracion = () => {
        console.log('Eliminando oracion');
        //setOracionesCreadas(nuevasOraciones);
    }

    const createCard = (oracion, index) => {
        return (
            <View key={index} style={styles.containerCard}>
                <TouchableOpacity

                    onPress={eliminarOracion}
                    style={styles.btnEliminarOracion}
                >
                    <Text
                        style={styles.txtMain}

                    >Eliminar Oracion</Text>
                </TouchableOpacity>

                <Text style={styles.infoCard}>{oracion}</Text>
                <View style={styles.containerbtnsCard}>
                    <TouchableOpacity
                        style={styles.btnEscucharOracion}
                        onPress={playTextAsAudio}
                    >
                        <Text
                            style={styles.txtMain}
                        >Reproducir Oracion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity

                        style={styles.btnCompartirOracion}

                    >
                        <Text style={styles.txtMain}
                        >Pausar Oracion</Text>

                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    return (

        oracionesCreadas === undefined ?
            <View><Text style={styles.infoCard}>No hay oraciones creadas</Text></View>
            :
            <ScrollView style={styles.containerMainCard}>
                {oracionesCreadas.map((oracion, index) => {
                    return createCard(oracion, index);
                })}
            </ScrollView>


    );
}

export default MisOraciones;

const styles = StyleSheet.create({
    containerMainCard: {
        flex: 1,
        backgroundColor: 'white',
        padding: 12,
        marginTop: 40,
        width: '100%',
        height: 100,
    },
    infoCard: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        margin: 20,
    },
    containerCard: {
        borderBlockColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        padding: 7,
        marginBottom: 45,
    },
    containerbtnsCard: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnEliminarOracion: {
        backgroundColor: '#03045E',
        padding: 12,
        borderRadius: 12,
    },
    btnEscucharOracion: {
        backgroundColor: '#0077B6',
        padding: 12,
        borderRadius: 12,

    },
    btnCompartirOracion: {
        backgroundColor: '#00B4D8',
        padding: 12,
        borderRadius: 12,
    },
    txtMain: {
        fontSize: 17,
        fontWeight: '400',
        textAlign: 'center',
        margin: 0,
        color: 'white',
    },
});