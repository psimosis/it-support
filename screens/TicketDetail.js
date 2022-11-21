import React, {useEffect, useState, useContext, FlatList} from "react";
import {Text,View, StyleSheet,ScrollView, RefreshControl} from 'react-native';
import Axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config/Config";
import Icon from '@expo/vector-icons/Ionicons'
import ActionCard from '../components/ActionCard'

const TicketDetail = ({route}) => {

  const[data, setData] = useState({});
  const {getToken} = useContext(AuthContext);
  const {itemID} = route.params
  const[seguimientos, setSeguimientos] = useState([])     
  const[tareas, setTareas] = useState([])
  const[soluciones, setSoluciones] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(()=> {
      getData()
    },[]);

    const getData = () =>{
      const fetchTikcets = async () =>{
        var config = {
          method: 'get',
          url: BASE_URL + '/Ticket/' + itemID,
          headers: { 
            'Session-Token': '' + await getToken()
          }}
      Axios(config)
      .then(async({ data }) => {
          setData(data)
          getSeguimientos(await getToken(), itemID)
          getTareas(await getToken(), itemID)
          getSoluciones(await getToken(), itemID)        
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
      //console.log('Criticidad Texto: ' + value)
      //return texto;
    }
    const getSeguimientos = (token,itemID)=>{
      var config2 = {
        method: 'get',
        url: BASE_URL + '/Ticket/' + itemID + '/ITILFollowup/',
        headers: { 
          'Session-Token': '' + token}
      }

      Axios(config2)
        .then((response)=> {
          //console.log('Respuesta de Axios para el Seguimiento:')
          //console.log(response)
          setSeguimientos(response.data)
        })
        .catch(function (error) {
          console.log('Error: ')
          //console.log(error);
        });
    }
    const getTareas = (token,itemID)=>{
      var config2 = {
        method: 'get',
        url: BASE_URL + '/Ticket/' + itemID + '/TicketTask/',
        headers: { 
          'Session-Token': '' + token}
      }

      Axios(config2)
        .then((response)=> {
          setTareas(response.data)
        })
        .catch(function (error) {
          console.log('Error: ')
        });
    }
    const getSoluciones = (token,itemID)=>{
      var config2 = {
        method: 'get',
        url: BASE_URL + '/Ticket/' + itemID + '/ITILSolution/',
        headers: { 
          'Session-Token': '' + token}
      }

      Axios(config2)
        .then((response)=> {
          setSoluciones(response.data)
        })
        .catch(function (error) {
          console.log('Error: ')
        });
    }
    const pullMe = () =>{
      setRefresh(true)
      getData()
      setTimeout(()=>{
          setRefresh(false)
      },1000)
  }

  const formatText = (text)=>{
    if (text != null){
      const tag1= '&lt;p&gt;'
      const tag2= '&lt;/p&gt;'
      const text1 = text.replace(tag1,"")
      return text1.replace(tag2,"")
    }
  }

    return (
    <View style={styles.container}>
      <ScrollView
        refreshControl = {
          <RefreshControl refreshing={refresh} onRefresh={()=>pullMe()}/>
        }
      >
        <View style = {styles.card}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex:1}}>Estado: {estado(data.status)}</Text>
            <Text style={{padding:1, borderRadius: 0.8,flex:0,backgroundColor:'cornflowerblue'}}>Incidente: #{data.id}</Text>
          </View>
        
          <Text style={styles.titleText}>{data.name}</Text>
          <View style={styles.horizontalLine}/>

          <Text style={{padding:3}}><Icon name="calendar-outline" size={20} color="#3143e8" />  {data.date}</Text>
          <View style={styles.horizontalLine}/>
          <Text style={{color:'midnightblue'}}>Criticidad :  
            <Text style={criticidadColor(data.urgency)}> 
              {criticidad(data.urgency)}
            </Text>
          </Text>

          <View style={styles.horizontalLine}/>
          <Text style={{backgroundColor:'midnightblue', padding: 3,fontSize: 15,fontWeight: "bold",color: "white", textAlign: 'center'}}>Descripcion</Text>
          <Text style={{padding:5, fontSize:16}}>{formatText(data.content)}</Text>
        
          <View style={{flex: 1, height: 7}} />
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <View>
            {seguimientos.map((item) => {
              var content = item.content;
              return (
                <ActionCard
                  key= {item.id}
                  content={content}
                  title = 'Seguimiento'
                  date = {item.date}
                />
              )
            })}
        </View>
        <View>
            {tareas.map((item) => {
              var content = item.content;
            return (
              <ActionCard
                  key= {item.id}
                  content={content}
                  title = 'Tarea'
                  date = {item.date}
                />
            )
            })}
        </View>
        <View>
            {soluciones.map((item) => {
              var content = item.content;
            return (
              <ActionCard
                  key= {item.id}
                  content={content}
                  title = 'Solucion'
                  date = {item.date_creation}
                />
            )
            })}
        </View>


        </ScrollView> 
    </View>
    );
}

export default TicketDetail;

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
    card: {
        backgroundColor: "gainsboro",
        borderWidth: 1,
        borderColor: "#333",
        padding: 5,
        paddingTop: 5,
        borderRadius: 7,
    },
    titleText: {
        padding: 3,
        fontSize: 20,
        fontWeight: "bold",
        color: "midnightblue"
    },
    horizontalLine: {
      padding: 3, 
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    EmptytextHeader: {
      paddingTop: 10,
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    EmptyMassage: {
      color:'lightgrey',
      fontWeight: '700',
      fontSize: 12,
      fontStyle: 'normal',
    },
  });