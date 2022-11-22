import React, {Component} from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";

function CustomAlert(props){
    return(
        <Modal transparent visible={props.visible}>
            <View 
                style={{
                    flex: 1, 
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.2)',    
                }}>
                <View 
                    style={{
                    width: '90%', 
                    padding:10, 
                    borderRadius:8, 
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}>
                    <Text
                        adjustFontSizeToFit
                        numberOfLines={1}
                        style={styles.titulo}>
                        {props.titulo}
                    </Text>
                    <Text style ={{textAlign: 'center'}}>{props.mensaje}</Text>
                    <Text></Text>
                    
                    <TouchableOpacity
                    onPress={props.aceptarButton}
                        style={styles.boton}
                    >
                        <Text>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'red',
    },
    boton:{
        backgroundColor: '#87CEFA',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
        margin: 5,
    }
  });

export default CustomAlert;