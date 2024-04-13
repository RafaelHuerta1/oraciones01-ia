import { View, Text, TouchableOpacity, StyleSheet} from "react-native"

/**
 * 
 * @returns UserName and counter of oracioensCreadas touchable logOut
 */

export default function Perfil() {
  return(
    <View style={styles.container}  >
      <Text style={styles.txtName} >Rosa Huerta</Text>
      <Text style={styles.txtName}>Tus oraciones creadas: 2</Text>
      <TouchableOpacity style={styles.btnContainerLogOut}>
        <Text style={styles.txtName}>LogOut</Text>
      </TouchableOpacity>
    </View>
  )
} 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  txtName: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
  },
  btnContainerLogOut: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    width: 200,
    height: 80,
  }
})
