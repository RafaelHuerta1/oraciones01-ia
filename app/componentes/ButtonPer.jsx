import { TouchableOpacity, Text, StyleSheet } from "react-native";

//TouchableOpacity

export default function ButtonPer(props) {
     // Añade esta línea
    return (

                <TouchableOpacity
             //   onPress={  () => console.log(props.link)}
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
        fontSize: 20,
        fontWeight: '400',
    },
});