import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { useEffect } from "react"
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, signOut } from "firebase/auth";
import { router } from "expo-router";
import { useState } from "react";



export default function Perfil() {
  const [userName, setUserName] = useState('');
  
  let uid = '';
  if (getAuth().currentUser) {
    uid = getAuth().currentUser.uid;
  }
  
  
  const db = getDatabase();
  
  const reference = ref(db, "users/" + uid);
  //const auth = getAuth();

  const cerrarSesion = async () => {
   const auth = getAuth();

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
      console.log('Data: 1', data);
      if (data) {
          console.log('Data: 2', data.username);
          setUserName(data.username);
      }
    })
    return () => datas();
  }, [])

  console.log('UserName: ', userName);

  return (
    <View style={styles.container}  >
      <View style={styles.containerTxtBienvenida} >
      <Text style={styles.txtBienvenida} >  Hola Bienvenido/a a su perfil,  estimado/a.  {userName}  </Text>

      </View>


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
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  containerTxtBienvenida: {
    borderBottomWidth: 20,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#0077B6',
    padding: 20,
  },
  txtBienvenida: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: '#03045E',
    opacity: 0.8,

  },
  txtName: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: '#CAF0F8',
  },
  btnContainerLogOut: {
    backgroundColor: '#0077B6',
    padding: 15,
    borderRadius: 12,
    marginTop:40,
    width: 400,
    height: 'auto',
    justifyContent: 'center',
  }
})
