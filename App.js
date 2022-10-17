import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import imagen from './img/mesaayuda.png'



export default function App() {
  return (
    
    /* Contenedor */
    <View style={styles.container}>
      
      
      {/* Imgaen */}
      <Image
        source={imagen}
        style={styles.image}
      />

      {/* Textos */}
      <Text style={styles.title}>IT Support-e</Text>
      <Text style={styles.subtitle}>Bienvenidos a la app de Soporte IT</Text>

      {/* Botones */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Hello')}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dimgray',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title:{
    fontSize: 30,
    color: 'white',
  },
  subtitle:{
    fontSize: 20,
    color: 'red',
  },
  image: {
    height:300,
    width:300,
    borderRadius: 150,
  },
  button: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }

});
