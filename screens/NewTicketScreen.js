import React, {useState, useContext} from "react";
import {Text,View, StyleSheet,Button,TextInput, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config/Config";
import { useNavigation } from '@react-navigation/native';

const NewTicketScreen = () => {
    const [tituloTicket, setTituloTicket] = useState({})
    const [descripcionTicket, setDescripTicket] = useState({})
    const {tokenUsuario} = useContext(AuthContext);
    const [selectedValue, setSelectedValue] = useState(3)
    const [alertVisible, setAlertVisible] = useState(false);
    const navegator = useNavigation();

    const enviarTicket= (tituloTicket,descipcionTicket,selectedValue,tokenUsuario) =>{

      var data = {
        "input": {
          "name": "" + tituloTicket,
          "content": "" + descipcionTicket,
          "priority": "5",
          "impact": "3",
          "urgency": + selectedValue,
          "type": "2",
          "itilcategories_id": "1"
        }
      };
    
      axios.post(BASE_URL + '/Ticket/',data,{
        headers: {
          'Session-Token': '' + tokenUsuario,
        }
        })
      .then((response) => {
        console.log("Envie el Ticket: " + tituloTicket)
        console.log(response.data)
        splashTicket(response.data.message)
        navegator.navigate('Mis Tickets')
      })
      .catch(e => {
        console.log('Error en el envio del Ticket '+ tituloTicket);
      })
    }

    const splashTicket = (texto) => {
      Alert.alert('Crear Ticket',texto)
     }

    return (
        <View>
          <CustomAlert 
          visible={alertVisible}
          titulo={'Carga Correcta'}
                mensaje={'Ha ingresado correctamente el nuevo ticket. \n\nIntentelo nuevamente o contactese con un Administrador'}
                aceptarButton={() => setAlertVisible(false)}
          />
            <View style={styles.card}>
                <Text style={styles.campoTitulo}>Titulo</Text>
                
                <TextInput
                    style={styles.titulo} 
                    //placeholder="Titulo"
                    value={tituloTicket}
                    onChangeText={titulo => setTituloTicket(titulo)}
                />
                <Text style={styles.campoTitulo}>Criticidad</Text>

                <Picker 
                  selectedValue={selectedValue}
                  style={styles.criticidad}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                  <Picker.Item label = 'Media' value= '3'/>
                  <Picker.Item label = 'Muy Urgente' value="5" />
                  <Picker.Item label = 'Urgente' value= '4'/>
                  <Picker.Item label = 'Baja' value= '2'/>
                  <Picker.Item label = 'Muy Baja' value= '1'/>
                </Picker>

                <Text style={styles.campoTitulo}>Descripcion</Text>
                
                <TextInput 
                    style={styles.descipcion}
                    value={descripcionTicket}
                    //onChangeText={descripcion => setDescripTicket({value:descripcion})}
                    onChangeText={descripcion => setDescripTicket(descripcion)}
                    multiline={true}
                    numberOfLines={10}
                />
                <Button style={styles.colorBtn}  title="Crear" onPress={() => enviarTicket(tituloTicket,descripcionTicket,selectedValue,tokenUsuario)}/>

            </View>
           
        </View>

    );
};

const styles = StyleSheet.create({
    
    formulario: {
      color: 'black',
      fontSize: 18,
      marginTop: 20,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'center',
    },

    criticidad:{
      height:43,
      width: 200,
      color: "midnightblue",
    },
   
    campoTitulo: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 12,
        fontWeight: "bold",
        color: "midnightblue"
    },

    titulo: {
      color: 'black',
      fontSize: 18,
      marginTop: 20,
      marginLeft: 5,
      marginRight: 5, 
      fontWeight: '600',
      paddingLeft: 5,
      borderWidth: 1,
      borderRadius: 2,
      borderColor: 'black',
      paddingRight: 12,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
    }, 
   
    descipcion: {
      color: 'black',
      fontSize: 18,
      marginTop: 10,
      marginBottom: 20,
      marginLeft: 5,
      marginRight: 5, 
      fontWeight: '300',
      paddingLeft: 5,
      borderWidth: 1,
      borderRadius: 2,
      borderColor: 'black',
      paddingRight: 12,
      height: 200,
      textAlignVertical: 'top',
    },
   
    colorBtn: {
      borderWidth: 1,
      borderColor: 'midnightblue',
      backgroundColor: 'midnightblue',
      padding: 15,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 7,
    },
   
    colorTxtBtn: {
      color: '#FFFFFF',
      fontSize: 20,
      textAlign: 'center'
    },

    card: {
        backgroundColor: "gainsboro",
        borderWidth: 1,
        borderColor: "#333",
        padding: 5,
        paddingTop: 5,
        borderRadius: 7,
    },
   
  });

export default NewTicketScreen;