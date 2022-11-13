import React, {useState, useContext} from "react";
import {Text,View, StyleSheet,Button,TouchableOpacity,TextInput, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config/Config";
import { useNavigation } from '@react-navigation/native';

const NewTicketScreen = () => {
    const [tituloTicket, setTituloTicket] = useState({})
    const [descripcionTicket, setDescripTicket] = useState({})
    const {tokenUsuario} = useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Muy Urgente', value: '1'},
      {label: 'Urgente', value: '2'},
      {label: 'Media', value: '3'},
      {label: 'Baja', value: '4'},
      {label: 'Muy Baja', value: '5'},
    ]);

    

    return (
    
        <View>
            <View style={styles.card}>
                <Text style={styles.campoTitulo}>Titulo</Text>
                <TextInput
                    style={styles.titulo} 
                    //placeholder="Titulo"
                    value={tituloTicket}
                    onChangeText={titulo => setTituloTicket(titulo)}
                />
                <Text style={styles.campoTitulo}>Criticidad</Text>
                <DropDownPicker style={styles.criticidad}
                    listMode="FLATLIST"
                    language="ES"
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
                <Text style={styles.campoTitulo}>Descripcion</Text>
                
                <TextInput 
                    style={styles.descipcion}
                    value={descripcionTicket}
                    //onChangeText={descripcion => setDescripTicket({value:descripcion})}
                    onChangeText={descripcion => setDescripTicket(descripcion)}
                    multiline={true}
                    numberOfLines={10}
                />
                <Button style={styles.colorBtn}  title="Crear" onPress={() => enviarTicket(tituloTicket,descripcionTicket,tokenUsuario)}/>

            </View>
           
        </View>

    );
};

const enviarTicket= (tituloTicket,descipcionTicket,tokenUsuario) =>{

  var data = {
    "input": {
      "name": "" + tituloTicket,
      "content": "" + descipcionTicket,
      "priority": "1",
      "impact": "4",
      "urgency": "5",
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
    alert(response.data.message)
    //alert("Crear Ticket:",response.data.message)
    //splashTicket(response.data.message)
  })
  .catch(e => {
    console.log('Error en el envio del Ticket '+ tituloTicket);
    console.log("Descripcion del Ticket: " + descipcionTicket)
    console.log('Session Token Envio: '+ tokenUsuario);
  })
}

const splashTicket = (texto) => {
 //const navegator = useNavigation();
 Alert.alert('Crear Ticket',texto)
 //navegator.navigate('Mis Tickets')
}



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
      marginTop: 10,
      marginBottom: 5,
      height:43,
      width: 200,
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