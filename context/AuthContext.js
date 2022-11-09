import React, {createContext, useState} from "react";
import axios from 'axios';
import base64 from 'react-native-base64'
import { BASE_URL } from "../config/Config";
import {AsyncStorage} from 'react-native'


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    //const [userData, setUserData] = useState({}); 
    const [estaLogueado, setEstaLogueado] = useState(false);
    const [nombreUsuario, setNombre] = useState();

    const setToken = async (token) =>{
       await AsyncStorage.setItem('userToken', token);
       setEstaLogueado(true);
    }
    
    const getToken = async () =>{
      return await AsyncStorage.getItem('userToken');
    }
    
    const removeToken = async () =>{
      return await AsyncStorage.removeItem('userToken');
    }

    const login = async (usuario,password) => {
        var usrPass64 = base64.encode(usuario + ':' + password);
        
        var config = {
            method: 'get',
            url: BASE_URL + '/initSession/',
            headers: { 
              'Authorization': 'Basic ' + usrPass64
            }
          };
          
          axios(config)
          .then((response)=> {
            setToken(response.data.session_token);
          })
          .catch(function (error) {
            console.log(error);
          });
         
          console.log("GetToken() Session: " + await getToken())
          var config2 = {
            method: 'get',
            url: BASE_URL + '/getFullSession/',
            headers: { 
              'Session-Token': '' + await getToken()
            }}

          axios(config2)
          .then((response)=> {
            //let userData = response.data;
            setNombre(response.data.session.glpifriendlyname)
            console.log('FullSession:' + response.data.session.glpifriendlyname);
            //console.log(userData)
            //setUserData(userData);
          })
          .catch(function (error) {
            console.log('Error en la data de usuario')
            console.log(error);
          });


    }
    

    const logout = () => {
      
      var config = {
        method: 'get',
        url: BASE_URL + '/killSession/',
        headers: { 
          'Session-Token': '' + getToken()
        }}
      axios(config)
      .then((response) => {
        console.log(response.data)
        removeToken()
      })
      .catch(e => {
        console.log(value);
        console.log('Error en el Logout '+ {e});
      })
    }


    return (
        <AuthContext.Provider 
            value={{
                getToken,
                login,
                logout,
                setEstaLogueado,
                nombreUsuario,
                estaLogueado,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;