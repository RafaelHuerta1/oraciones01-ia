import { View, Text , StyleSheet} from "react-native";



export default function InfoOracion({oracion} ) {
  console.log(oracion);
  return (
    <View>
      <Text style={styles.txtInfoOracionMain}>  {oracion} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    txtInfoOracionMain: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 70,
    },  
});