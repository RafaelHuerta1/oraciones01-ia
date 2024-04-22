import { TouchableOpacity, Text, StyleSheet } from "react-native";

//TouchableOpacity

export default function ButtonPer(props) {
     // Añade esta línea
    return (

                <TouchableOpacity
              onPress={props.func}
                    style={{
                        backgroundColor: props.color,
                        padding: 10,
                        borderRadius: 10,
                        width: 200,
                        alignItems: 'center',
                        marginTop:0,
                    }}
                
                >
                    <Text style={styles.txtInicio}  >
                        {props.text}
                    </Text>
                
                </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    txtInicio: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        padding: 5,
    },
});