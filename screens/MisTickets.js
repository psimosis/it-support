import React, {useEffect, useState, useContext} from "react";
import {TouchableOpacity, FlatList, Text,View, StyleSheet, useWindowDimensions} from 'react-native';
import Axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config/Config";
import RenderHtml from 'react-native-render-html';
import Icon from '@expo/vector-icons/Ionicons'

const MisTickets = () => {
    const[data, setData] = useState({});
    const user = useContext(AuthContext);
    const userToken = user.userToken.session_token;
    //console.log(userToken);
    

    useEffect(()=> {
        var config = {
            method: 'get',
            url: BASE_URL + '/Ticket/',
            headers: { 
              'Session-Token': '' + userToken
            }}
        Axios(config)
        .then(({ data }) => {
            setData(data)
          })
        .catch(function (error) {
            console.log(error);
          })
    },[]);
 
    const { width } = useWindowDimensions();

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
                  <Text style={{flex:1}}>Estado: {item.status}</Text>
                  <Text style={{flex:0,backgroundColor:'cornflowerblue'}}>Incidente: #{item.id}</Text>
                </View>
                <Text style={styles.titleText}>{item.name}</Text>
                <View style={{flex: 1, height: 7}} />
                <Text>
                  <Icon name="calendar-outline" size={20} color="#3143e8" />  {item.date}
                </Text>
                <View style={{flex: 1, height: 7}} />
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                <View style={{flex: 1, height: 7}} />
                <Text style={{color:'blue'}}>Criticidad: {item.urgency}</Text>

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