import React, {useEffect, useState, useContext} from "react";
import {TouchableOpacity, FlatList, Text,View, StyleSheet, useWindowDimensions} from 'react-native';
import Axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config/Config";
import RenderHtml from 'react-native-render-html';
import Icon from '@expo/vector-icons/Ionicons'

const MisTickets = () => {
    const[data, setData] = useState({});
    const {getToken} = useContext(AuthContext);
   
    useEffect(()=> {
      const fetchTikcets = async () =>{
        var config = {
          method: 'get',
          url: BASE_URL + '/Ticket/',
          headers: { 
            'Session-Token': '' + await getToken()
          }}
      Axios(config)
      .then(({ data }) => {
          setData(data)
        })
      .catch(function (error) {
          console.log(error);
        })
      }
      fetchTikcets()
    },[]);
 
    const { width } = useWindowDimensions();

    const criticidad = (value) =>{

      switch(value) {
        case 1:
          return 'Muy Baja';
          break;
        
        case 2:
          return 'Baja';
          break;
    
        case 3:
          return 'Media';
          break;
    
        case 4:
          return 'Urgente';
          break;
        
        case 5:
          return 'Muy Urgente';
          break;

        default:
          return ''
      }
      console.log('Criticidad Texto: ' + value)
      return texto;
    }

    const estado = (value) =>{

      switch(value) {
        case 1:
          return 'Nuevo';
          break;
        
        case 2:
          return 'En curso (Asignado)';
          break;
    
        case 3:
          return 'En curso (Planificado)';
          break;
    
        case 4:
          return 'En Epera';
          break;
        
        case 5:
          return 'Resuelto';
          break;

        case 6:
          return 'Cerrado';
          break;


        default:
          return ''
      }
      console.log('Criticidad Texto: ' + value)
      return texto;
    }
    


    return (
              
    <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{height: 7}} />}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => alert("Abriste el ticket nro:" + item.id)}> 
            <View style = {styles.card}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex:1}}>Estado: {estado(item.status)}</Text>
                  <Text style={{flex:0,backgroundColor:'cornflowerblue'}}>Incidente: #{item.id}</Text>
                </View>
                <Text style={styles.titleText}>{item.name}</Text>
                <View style={{flex: 1, height: 7}} />
                <Text>
                  <Icon name="calendar-outline" size={20} color="#3143e8" />  {item.date}
                </Text>
                <View style={{flex: 1, height: 7}} />
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                <Text style={{color:'blue'}}>Criticidad: {criticidad(item.urgency)}</Text>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                <Text>
                  <RenderHtml
                    contentWidth={width}
                    source={{html: item.content }}
                  />
                  </Text>
            </View>
            </TouchableOpacity>
          )}
        />
    </View>
    );
}

export default MisTickets;




const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        paddingTop: 5,
        flex:1,
        justifyContent: "space-between",
      },
    card: {
        backgroundColor: "gainsboro",
        borderWidth: 1,
        borderColor: "#333",
        padding: 5,
        paddingTop: 5,
        borderRadius: 7,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "midnightblue"
    },
  });