import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import CreateOracion from './CrearOracion';

//console.log(CreateOracion);

function PlantillaOracion() {
    //console.log(navigation)

    const [selectedValue, setSelectedValue] = React.useState('padre nuestro'); // oraciones
    const [selectedName, setSelectName] = React.useState('');
    const [selectedValueVisibilidad, setSelectedValueVisibilidad] = React.useState(false); // oracion publica o privada
    const [oracionInfo, setOracionInfo] = React.useState(null);


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
        
        try {
            setOracionInfo({ valorName: selectedName, valorOracion: selectedValue, navigation: navigation });
            //Alert.alert('Oracion enviada con exito');
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
                <Text style={styles.txtMainPlantilla}>Pide por tu ser querido</Text>

                <View style={styles.containerValuesMain}>
                    <Text
                        style={{ marginLeft: 15, marginTop: 15, textDecorationStyle: 'solid', textDecorationColor: 'black', fontSize: 20, fontWeight: '400' }}
                    >Nombre de tu ser querido:</Text>
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
                    <Text
                        style={{ marginTop: 12, marginLeft: 10, textDecorationStyle: 'solid', fontSize: 20, fontWeight: '400' }}
                    >Quieres que mas personas oren por tus plegarias.. Enviar a la RED</Text>
                    <View style={{ borderColor: 'gray', borderWidth: 1, padding: 0, marginTop: 10 }}>

                        <Picker
                            selectedValue={selectedValueVisibilidad}
                            onValueChange={(itemValue) => setSelectedValueVisibilidad(itemValue)}
                            style={{ marginTop: 0, borderColor: 'gray', borderWidth: 1, width: '100%', height: 'auto' }}
                        >

                            {options2.map((option) => (
                                <Picker.Item label={option.label} value={option.value} key={option.value} />
                            ))}
                        </Picker>
                    </View>

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

                </View>


            </View>
            <View>
                {oracionInfo && <CreateOracion {...oracionInfo} />}

            </View>
        </View>





    );
}

export default PlantillaOracion;

const styles = StyleSheet.create({
    txtMainPlantilla: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 70,
    },
    containerValuesMain: {
        margin: 10,
    },

});
