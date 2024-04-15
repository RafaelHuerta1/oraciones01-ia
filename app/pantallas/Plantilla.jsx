import React, {useEffect} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import CreateOracion from './CrearOracion';
import { Stack, router, Link } from 'expo-router';
import ModalInfo from "../componentes/ModalInf";



//console.log(CreateOracion);

function PlantillaOracion() {
    //console.log(navigation)

    const [selectedValue, setSelectedValue] = React.useState('padre nuestro'); // oraciones
    const [selectedName, setSelectName] = React.useState('');
   // const [selectedValueVisibilidad, setSelectedValueVisibilidad] = React.useState(false); // oracion publica o privada
    const [oracionInfo, setOracionInfo] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);



    // console.log(  { valorName, valorOracion } = oracionInfo  );
    //console.log('Oracion info: ', oracionInfo.valorName, oracionInfo.valorOracion)

    const options = [
        { label: 'Padre Nuestro', value: 'padre nuestro' },
        { label: 'Ave María', value: 'ave maria' },
        { label: 'Enfermos', value: 'enfermos' },
        { label: 'Agradecimiento', value: 'agradecimiento' },
        { label: 'Difuntos', value: 'difuntos' },
        { label: 'Fortaleza', value: 'fortaleza' },
        { label: 'Depresion', value: 'depresion' },
        { label: 'Familia y Amigos', value: 'familia y amigos' },
        { label: 'Esperanza', value: 'esperanza' },
        { label: 'Protección y Seguridad', value: 'protección y seguridad' },

    ];

    const options2 = [
        { label: 'Oracion Publica', value: true },
        { label: 'Oracion Privada', value: false },

    ];
    //<CreateOracion  valorName={selectedName} />;

    // crear una funcion para crear la oracion con la api de openai, y enviarla a la base de datos
    const orar = () => {
        //setOracionInfo({ valorName: selectedName, valorOracion: selectedValue, navigation: navigation });
        if (selectedName === '' || selectedName === null || selectedName === undefined) {
            Alert.alert('Por favor, ingrese el nombre de su ser querido');
            return;
        }
        try {
            setOracionInfo({ valorName: selectedName, valorOracion: selectedValue });
           // router.push('/pantallas/CrearOracion', { valorName: selectedName, valorOracion: selectedValue });
            // console.log('Oracion info: ', oracionInfo.valorName, oracionInfo.valorOracion);
            //Alert.alert('Listo oracion enviada', selectedName);
            setModalVisible(true);

            // router.push('/(tabs)/MisOraciones');
        } catch (error) {
            console.log(error);
            Alert.alert('Error al enviar la oracion');
        }

    }

    const borrarCampos = () => {
        console.log('Borrando campos...');
        setSelectName('')
    }
    

    

    return (
        <View>
            <View>




                <Text style={styles.txtMainPlantilla}>Ora por tu ser querido</Text>

                <View style={styles.containerValuesMain}>
                    <Text
                        style={{ marginLeft: 15, marginTop: 15, textDecorationStyle: 'solid', textDecorationColor: 'black', fontSize: 20, fontWeight: '400' }}
                    >
                        Nombre de tu ser querido:
                    </Text>
                    <TextInput
                        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 15, padding: 10, height: 50 }}
                        placeholder="Nombre de tu ser querido"
                        value={selectedName}
                        onChangeText={text => setSelectName(text)}
                    />

                    <Text
                        style={{ marginTop: 12, marginLeft: 10, textDecorationStyle: 'solid', textDecorationColor: 'black', fontSize: 20, fontWeight: '400' }}
                    >Selecciona una Oracion:</Text>
                    <View style={{ borderColor: 'gray', borderWidth: 1, padding: 0, marginTop: 10 }}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            style={{ marginTop: 0, backgroundColor: 'white', width: '100%', height: 'auto' }}
                        >

                            {options.map((option) => (
                                <Picker.Item label={option.label} value={option.value} key={option.value} />
                            ))}
                        </Picker>

                    </View>
                    
                  

                    <View  style={styles.containerBtns}>
                    <TouchableOpacity
                        onPress={orar}
                        style={{ backgroundColor: '#03045E', marginTop: 35, padding: 10, borderRadius: 10 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Orar</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={borrarCampos}
                        style={{ backgroundColor: '#0077B6', marginTop: 15, padding: 10, borderRadius: 10 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Orar por otro ser Querido</Text>
                    </TouchableOpacity>
                    
                    <Link href={{ screen: '/(tabs)/MisOraciones', params: { id: selectedName} }} asChild>
                                <TouchableOpacity
                                
                                style={{ backgroundColor: '#00B4D8', marginTop: 15, padding: 10, borderRadius: 10 }}>
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Ver mis Oraciones</Text>
                            </TouchableOpacity>
                    </Link>
                    </View>        
              

                </View>


            </View>
            <View>
                <ModalInfo modalVisible={modalVisible} setModalVisible={setModalVisible} 
                selectedName={selectedName}
                />
                {oracionInfo && <CreateOracion oracionInfo={oracionInfo} />}
       

            </View>
    

        </View>

                            



    );



}

export default PlantillaOracion;

const styles = StyleSheet.create({
    txtMainPlantilla: {
        fontSize: 33,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 100,
        color: '#03045E',
    },
    containerValuesMain: {
        margin: 10,
    },
    containerBtns: {
        marginBottom: 40,
    },
});
