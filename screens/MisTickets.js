import React, {useEffect, useState, useContext} from "react";
import {TouchableOpacity, FlatList, Text,View, StyleSheet, RefreshControl} from 'react-native';
import Axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config/Config";
import Icon from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

const MisTickets = () => {
    const[data, setData] = useState([]);
    const {getToken} = useContext(AuthContext);
    const navigator = useNavigation();
    const [refresh, setRefresh] = useState(false)

    useEffect(()=> {
      getData()
    },[]);

    const getData = () =>{
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
    }
    
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

    const criticidadColor = (value) =>{

      switch(value) {
        case 1:
          return styles.criticidadMuyBaja;
          break;
        
        case 2:
          return styles.criticidadBaja;
          break;
    
        case 3:
          return styles.criticidadMedia;
          break;
    
        case 4:
          return styles.criticidadUrgente;
          break;
        
        case 5:
          return styles.criticidadMuyUrgente;
          break;

        default:
          return ''
      }
    }

    const cardColor = (value) =>{

      switch(value) {
        case 'Resuelto':
          return styles.cardResuelto;
          break;
        
        case 'En curso (Asignado)':
          return styles.cardEnCurso;
          break;
    
        case 'Nuevo':
          return styles.cardNuevo;
          break;
    
        case 'En Espera':
          return styles.cardDemorado;
          break;
        
        case 'Cerrado':
          return styles.cardClose;
          break;

        default:
          return ''
      }
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
          return 'En Espera';
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

    const pullMe = () =>{
        setRefresh(true)
        getData()
        setTimeout(()=>{
            setRefresh(false)
        },1000)
    }

    return (
              
    <View style={styles.container}>
        <FlatList
          data={data.filter(data =>{ return data.status != '6'})}
          keyExtractor={(item) => item.id}
          refreshControl = {
            <RefreshControl refreshing={refresh} onRefresh={()=>pullMe()}/>
          }
          ListEmptyComponent={
            <View style= {styles.EmptytextHeader}>
              <Text style={styles.EmptyMassage}>NO HAY TICKETS PARA MOSTRAR</Text>
            </View>}
          ItemSeparatorComponent={() => <View style={{height: 7}} />}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() =>  navigator.navigate('Detalle Ticket', {itemID: item.id})}>
            <View style = {cardColor(estado(item.status))}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex:1}}>Estado: {estado(item.status)}</Text>
                  <Text style={{padding:1, borderRadius: 0.8,flex:0,backgroundColor:'cornflowerblue'}}>Incidente: #{item.id}</Text>
                </View>
                <Text style={styles.titleText}>{item.name}</Text>
                <View style={{flex: 1, height: 7}} />
                <Text>
                  <Icon name="calendar-outline" size={20} color="#3143e8" />  {item.date}
                </Text>
                <View style={{flex: 1, height: 7}} />
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                <Text style={{color:'blue'}}>Criticidad :  
                  <Text style={criticidadColor(item.urgency)}> 
                    {criticidad(item.urgency)}
                  </Text>
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

    criticidadMuyBaja:{
      color: 'green',
      fontWeight: 'bold',
    },
    criticidadBaja:{
      color:'green',
    },
    criticidadMedia:{
      color:'goldenrod',
      fontWeight: 'bold',
    },
    criticidadUrgente:{
      color:'red',
    },
    criticidadMuyUrgente:{
      color: 'red',
      fontWeight: 'bold',
    },
    container: {
        width: "100%",
        padding: 10,
        paddingTop: 5,
        flex:1,
        justifyContent: "space-between",
      },
    cardNuevo: {
        backgroundColor: "gainsboro",
        borderWidth: 1,
        borderColor: "#333",
        padding: 5,
        paddingTop: 5,
        borderRadius: 7,
    },
    cardResuelto: {
      backgroundColor: "lightgreen",
      borderWidth: 1,
      borderColor: "#333",
      padding: 5,
      paddingTop: 5,
      borderRadius: 7,
    },
    cardEnCurso: {
      backgroundColor: "powderblue",
      borderWidth: 1,
      borderColor: "#333",
      padding: 5,
      paddingTop: 5,
      borderRadius: 7,
    },
    cardDemorado: {
      backgroundColor: "wheat",
      borderWidth: 1,
      borderColor: "#333",
      padding: 5,
      paddingTop: 5,
      borderRadius: 7,
    },
    cardClose: {
      display: 'none',
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "midnightblue"
    },
    EmptytextHeader: {
      paddingTop: 200,
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    EmptyMassage: {
      color:'lightgrey',
      fontWeight: '700',
      fontSize: 16,
      fontStyle: 'normal',
    },
  });