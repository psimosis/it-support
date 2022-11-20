import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from '@expo/vector-icons/Ionicons'

export default function ActionCard(props){
    var content = props.item.content.substring(9);
    console.log('Hola')
    console.log(props.titulo)
    return(
          <View style = {styles.card}>
            <Text style={{backgroundColor:'grey', padding: 3,fontSize: 15,fontWeight: "bold",color: "white", textAlign: 'left'}}>{props.title}</Text>
            <Text style={{padding:3}}><Icon name="calendar-outline" size={17} color="#3143e8" />  {item.date}</Text>
            <Text style={{fontSize:15}}>{content.split('&lt;/p&gt;')}</Text>
          </View>
        )
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
  });