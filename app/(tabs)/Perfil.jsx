import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { useEffect } from "react"
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, signOut } from "firebase/auth";
import { router } from "expo-router";

// ...

const auth = getAuth();
signOut(auth).then(() => {
  console.log('User signed out');
}).catch((error) => {
  console.error('Error signing out: ', error);
});/**
 * 
 * @returns UserName and counter of oracioensCreadas touchable logOut
 */



export default function Perfil() {
  const auth = getAuth();
    if(!auth.currentUser){
      router.push('/signIn');
    }
  const uid = getAuth().currentUser.uid;
  
  
  const db = getDatabase();
  
  const reference = ref(db, "users/" + uid);
  //const auth = getAuth();

  const cerrarSesion = async () => {
    getAuth();
   await signOut(auth).then(() => {
      console.log('User signed out');
      router.push('/signIn');
      Alert.alert('Sesion cerrada');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };



  useEffect(() => {
    console.log('Perfil');

    console.log('Referencia: ', reference);
    const datas = onValue(reference, (snapshot) => {
      const data = snapshot.val();
      console.log('DATA: ', data);
      //const userName2 = data.map();
      //const oracionesCreadas = data.oracionesCreadas;
      //console.log('UserName: ', userName2);
    })
    return () => datas();
  }, [])


  return (
    <View style={styles.container}  >
      <Text style={styles.txtName} >Rosa Huerta</Text>
     {
        //<Text style={styles.txtName}>Tus oraciones creadas: 2</Text> 
     } 
      <TouchableOpacity style={styles.btnContainerLogOut}
        onPress={cerrarSesion}
      >
        <Text style={styles.txtName}>Cerrar Sesion</Text>
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
    backgroundColor: '#0077B6',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    width: 400,
    height: 80,
    justifyContent: 'center',
  }
})
