import { View, Text, StyleSheet} from "react-native"




export default function RedOracion() {
    return (
        <View>
            <Text style={styles.txtRedOracionMain}>RedOracion</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    txtRedOracionMain: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 70,
    },
});