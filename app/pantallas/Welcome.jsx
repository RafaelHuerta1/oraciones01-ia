// welcome screen
//import { useNavigation } from '@react-navigation/native';

import { View, Text, Image, StyleSheet } from "react-native";
// 0077B6



export default function Welcome(props){
   // const navigation = useNavigation();
console.log(props)
    return (
        <View  style={styles.containerMain}>
            <Text style={styles.txtMain}  >Bienvenido a OracionesIA</Text>
            <Image
                source={require('../../src/assets/img2.png')}
                style={{ width: 305, height: 300 }}
            />
        
        </View>
    );
}

// signIn screen , signUp screen navegacion con expo router

const styles = StyleSheet.create({
    txtMain: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#03045E',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    containerMain: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    },
});