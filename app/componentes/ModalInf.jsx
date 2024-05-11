import { View, Text, StyleSheet, Button, Modal } from "react-native";
import React from 'react';
import { router } from "expo-router";

export default function ModalInfo({ modalVisible, setModalVisible , textModal}) {
    console.log('Estoy en fc ModalInfo,, ',modalVisible);
    console.log('Estoy en fc ModalInfo,, ',setModalVisible);
   
   // console.log('NAME : ',selectedName); // SI PASAMOS EL NOMBRE DE LA PERSONA QUE ORAMOS

    const inPage = () => {
        setModalVisible(false);
    }

    const goMisOraciones = () => {
        setModalVisible(false);
        router.push({
            pathname: "/(tabs)/MisOraciones",
            /*
            params: {
              token: selectedName
            }
            */
         });
    }
    const goPlantilla = () => {
        setModalVisible(false);
        router.push({
            pathname: "/pantallas/Plantilla",
            /*
            params: {
              token: selectedName
            }
            */
         });
    }

    return (
        <View  >
            <Modal
                style={styles.containerModalInfo}
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >

                <View
                   style={styles.containerModalInfo}
                >
                    <Text
                        style={styles.txtModalInfo}
                    >
                       {textModal}
                    </Text>

                    <View
                        style={styles.containerBtnsModalInfo}
                    >   
                    {
                        textModal === 'Oracion creada exitosamente, puedes ver tus oraciones en la seccion de mis oraciones.' ? 
                        <>
                        <Button title="Crear otra oracion" onPress={inPage} />
                        <Button title="Ver mis Oraciones" onPress={goMisOraciones} />
                        </>
                        :
                        <Button title="Crear Oracion" onPress={goPlantilla} />
                    }
                       
                    </View>

                </View>





            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    containerModalInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // 'rgba(0, 0, 0, 0.5)'
        width: '100%',
        height: 200,
    },
    txtModalInfo: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
       // marginTop: 350,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    containerBtnsModalInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },

})