import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from '@expo/vector-icons/Ionicons'

function ActionCard(props){
  
    return(
          <View style = {styles.card}>
            <Text style={cardColor(props.title)}>{props.title}</Text>
            <Text style={styles.date}><Icon name="calendar-outline" size={17} color="#3143e8" />  {props.date}</Text>
            <Text style={styles.content}>{formatText(props.content)}</Text>
          </View>
        )
        
   }

   const formatText = (text)=>{
    if (text != null){
      const tag1= '&lt;p&gt;'
      const tag2= '&lt;/p&gt;'
      console.log(text)
      const text1 = text.replace(tag1,"")
      return text1.replace(tag2,"")
    }
  }

   const cardColor = (value) =>{

    switch(value) {
      case 'Seguimiento':
        return styles.titleSeguimiento;
        break;
      
      case 'Tarea':
        return styles.titleTarea;
  
      case 'Solucion':
        return styles.titleSolucion;
        break;

      default:
        return ''
    }
  }

    const styles = StyleSheet.create({
    card: {
        backgroundColor: "gainsboro",
        borderWidth: 1,
        borderColor: "#333",
        padding: 5,
        paddingTop: 5,
        borderRadius: 7,
    },
    content:{
      fontSize:15,
    },
    date: {
      padding:3,  
    },
    titleSeguimiento:{
      backgroundColor:'grey',
      padding: 3,
      fontSize: 15,
      fontWeight: "bold",
      color: "white",
      textAlign: 'left',
    },
    titleTarea:{
      backgroundColor:'goldenrod',
      padding: 3,
      fontSize: 15,
      fontWeight: "bold",
      color: "white",
      textAlign: 'left',
    },
    titleSolucion:{
      backgroundColor:'limegreen',
      padding: 3,
      fontSize: 15,
      fontWeight: "bold",
      color: "white",
      textAlign: 'left',
    },
  });

  export default ActionCard;