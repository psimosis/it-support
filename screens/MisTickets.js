import React, {useEffect, useState, useContext} from "react";
import {ActivityIndicator, FlatList, Text,View, StyleSheet} from 'react-native';
import Axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config/Config";
import { render } from "react-dom";

const MisTickets = () => {
    const[isLoading, setLoading] = useState(true);
    const[data, setData] = useState({});
    const user = useContext(AuthContext);
    const userToken = user.userToken.session_token;
    console.log(userToken);
    

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
            console.log("Tickets del Usuario:", data)
          })
        .catch(function (error) {
            console.log(error);
          })
        .finally(() => setLoading(false));
    },[]);

    return (
        
    <View style={styles.container}>
        <FlatList
          data={data}
          ðkeyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style = {styles.card}>
                <Text>{item.date}</Text>
                <Text style={styles.titleText}>{item.name}</Text>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                <Text>{item.content}</Text>
            </View>
          )}
        />
    </View>
    );
}

export default MisTickets;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 16,
        paddingTop: 5,
      },
    card: {
        backgroundColor: "gainsboro",
        borderWidth: 1,
        borderColor: "#333",
        padding: 5,
        paddingTop: 5,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "blue"
    },
  });