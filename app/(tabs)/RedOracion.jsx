import { View, Text, StyleSheet, Button, TextInput } from "react-native"
import { Linking } from 'react-native';



export default function RedOracion() {
    const openFacebookGroup = async () => {
        const url = 'https://m.me/j/AbYbEEx4Oq2Tjyry/';
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.error('No se puede abrir el enlace');
        }
      };
    
    return (
        <View>
            <Text style={styles.txtRedOracionMain}>Próximamente: la evolución de nuestra app</Text>
            <Text style={styles.txtCopyParrafo}>
                Estamos explorando las opciones más valiosas para ti. Entre ellas:
            </Text>
            <Text style={styles.txtCopyParrafo}>
                1. Una Red Social de Oraciones Públicas donde podrás comentar y ofrecer ánimos en las peticiones de otros usuarios, creando una comunidad de apoyo y esperanza.
            </Text>
            <Text style={styles.txtCopyParrafo}>
                2. Espacios de Oración Privados en una Red Social de Oraciones Privadas, diseñados para que tu grupo de oración comparta peticiones y oraciones especiales, uniendo fuerzas en una intención común.
            </Text>

                <View>
                    <Text style={styles.txtDespedida}>
                    Únete a nuestra vibrante comunidad de oración. Comparte tus peticiones y sugerencias; tu voz es importante para nosotros.


                        </Text>     
                </View>        
                    
                    <View style={styles.containerBtnsButton}>
                       <Button title="Ir al grupo de Fb" onPress={openFacebookGroup} />
                    </View>
                
            

        </View>
    )
}

const styles = StyleSheet.create({
    txtRedOracionMain: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    txtCopyParrafo: {
        fontSize: 22,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 20,
    },
    txtDespedida: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 20,
        color: 'grey',

    },
    containerBtnsButton: {
        marginTop: 20,
       //idth: 200,
        alignSelf: 'center',
    }
});