import React, {useEffect,  useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import CreateOracion from './CrearOracion';
import { Stack, router, Link } from 'expo-router';
import ModalInfo from "../componentes/ModalInf";
import registerNNPushToken from 'native-notify';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';


const androidID = 'ca-app-pub-3715029693544325/4857899724';


const interAndroidAd = 'ca-app-pub-3715029693544325/2303022605';

const interstitial = InterstitialAd.createForAdRequest(interAndroidAd, {
    keywords: ['fashion', 'clothing', 'apparel', 'shopping', 'lifestyle'],
  });

//console.log(CreateOracion);

function PlantillaOracion() {
    //console.log(navigation)
  //registerNNPushToken(21040, 'lBM3RME0997q7b4f7QRq3O');
  registerNNPushToken(21093, 'vHJB5qYrvgofyIvhA4qhbd');
  console.log('Token registrado');  
  
    const [selectedValue, setSelectedValue] = React.useState('padre nuestro'); // oraciones
    const [selectedName, setSelectName] = React.useState('');
    const [situacionSer, setSituacionSer] = React.useState('');

   // const [selectedValueVisibilidad, setSelectedValueVisibilidad] = React.useState(false); // oracion publica o privada
    const [oracionInfo, setOracionInfo] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);




    const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      interstitial.show();
    });

    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        setLoaded(false);
  
        // Load a new ad when the current ad is closed
        interstitial.load();
      });
  

      // Unsubscribe from events on unmount
      return () => {
        unsubscribe();
        unsubscribeClosed();
      };
  }, [loaded]); // revisar loaded, 


    // console.log(  { valorName, valorOracion } = oracionInfo  );
    //console.log('Oracion info: ', oracionInfo.valorName, oracionInfo.valorOracion)

    const options = [
        { label: 'Padre Nuestro', value: 'padre nuestro' },
        { label: 'Ave María', value: 'ave maria' },
        { label: 'Gloria al Padre', value: 'gloria al padre' },
        { label: 'La Salve', value: 'la salve' },
        { label: 'Angel de mi Guarda', value: 'angel de mi guarda' },
        { label: 'Oracion por la Mañana', value: 'oracion por la mañana' },
        { label: 'Oracion por la Noche', value: 'oracion por la noche' },
        { label: 'Oracion por los Enfermos', value: 'oracion por los enfermos' },
        { label: 'Oracion por los Difuntos', value: 'oracion por los difuntos' },
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
            Alert.alert('Ingrese el nombre de su ser querido para continuar.');
            return;
        }
        try {
            setOracionInfo({ valorName: selectedName, valorOracion: selectedValue, valorSituacion: situacionSer});
           // router.push('/pantallas/CrearOracion', { valorName: selectedName, valorOracion: selectedValue });
            // console.log('Oracion info: ', oracionInfo.valorName, oracionInfo.valorOracion);
            //Alert.alert('Listo oracion enviada', selectedName);
            setModalVisible(true);
            interstitial.load()

             // Add a one-time listener for the LOADED event
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            // Show the ad when it's loaded
            interstitial.show();

            // Unsubscribe from the event
            unsubscribe();
        });

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


                <BannerAd
      unitId={__DEV__ ? TestIds.BANNER : androidID}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      style={{alignSelf: 'center', backgroundColor: 'red'}}
    />
       


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
                        style={{ marginLeft: 10, marginTop: 15, textDecorationStyle: 'solid', textDecorationColor: 'black', fontSize: 20, fontWeight: '400' }}
                    >
                        Cual es la situacion por la que esta pasando tu ser querido? 
                    </Text>
                    <TextInput
                        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 15, padding: 10, height: 50 }}
                        placeholder="Situcion por la que esta pasando tu ser querido"
                        value={situacionSer}
                        onChangeText={text => setSituacionSer(text)}
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
                    
                    <Link href={'/(tabs)/MisOraciones'} asChild>
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
               
               //selectedName={selectedName}
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
        marginTop: 50,
        color: '#03045E',
    },
    containerValuesMain: {
        margin: 10,
    },
    containerBtns: {
        marginBottom: 40,
    },
});
