import react from 'react';

import { Text, View, StyleSheet, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native';





function GenerarOraciones({titulo, navigation}) {
   //console.log(navigation)
    return (
        <View style={styles.containerGenerarOracion}>
            <TouchableOpacity style={styles.btnGenerarOracion} onPress={() => navigation.navigate("Orar") }> 
            
            <Text style={styles.txtMain}> {titulo} </Text>
            </TouchableOpacity>
        </View>
    );
}

export default GenerarOraciones;

const styles = StyleSheet.create({
    txtMain: {
        color: 'black',
        fontSize: 22,
        textAlign: 'auto',
        margin: 10,
        fontWeight: 'bold'
    },
    containerGenerarOracion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
    },
    btnGenerarOracion: {

        marginRight:30,
    },
    txtGenerarOracion: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
        textDecorationLine: 'underline',
    }
});

