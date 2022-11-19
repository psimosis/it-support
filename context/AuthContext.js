import React, {createContext, useState} from "react";
import axios from 'axios';
import axios2 from 'axios';
import base64 from 'react-native-base64'
import { BASE_URL } from "../config/Config";
import {Alert, AsyncStorage, View} from 'react-native'
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [tokenUsuario, setTokenUsuario] = useState();
    const [datosUsuario, setDatosUsuario] = useState({
      nombre: '',
      perfil: '',
      entidad: '',
    });
    const setToken = async (token) =>{
       await AsyncStorage.setItem('userToken', token);
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
      axios (config)
        .then(async(response)=> {
          setToken(response.data.session_token);
          setTokenUsuario(response.data.session_token);
          axiosNombre(await getToken());
        })
        .catch(function (error) {
          console.log("Error: "+ error);
          Alert.alert ('Login: Error', 'Usuario o Contraseña Incorrecta')
        });
    }
    
    const axiosNombre = (token)=>{
      var config2 = {
        method: 'get',
        url: BASE_URL + '/getFullSession/',
        headers: { 
          'Session-Token': '' + token
        }
      }

      axios(config2)
        .then((response)=> {
          datosUsuario.nombre = response.data.session.glpifriendlyname
          const idProfle = '' +response.data.session.glpiactiveprofile.id
          datosUsuario.perfil = response.data.session.glpiprofiles[idProfle].name
          const idEntidad = '' + response.data.session.glpiactive_entity
          
          datosUsuario.entidad = response.data.session.glpiprofiles[idProfle].entities[idEntidad].name
          setDatosUsuario(datosUsuario)

          console.log('USUARIO LOGUEADO')
          console.log('================')
          console.log('Nombre Usuario:' + response.data.session.glpifriendlyname);
          console.log('Token del Usuario: ' + token)
          console.log('Perfil del Usuario: ' + response.data.session.glpiprofiles[idProfle].name) 
          console.log('Entidad del Usuario: ' + response.data.session.glpiprofiles[idProfle].entities[idEntidad].name)
        })
        .catch(function (error) {
          console.log('Error en la data de usuario:')
          console.log(error);
        });
    }
 
    const logout = async() => {
      var config = {
        method: 'get',
        url: BASE_URL + '/killSession/',
        headers: { 
          'Session-Token': '' + tokenUsuario
        }}
      axios2(config)
      .then((response) => {
        removeToken()
        setTokenUsuario("")
      })
      .catch(e => {
        console.log('Error en el Logout '+ {e});
      })
    }

    return (
       <AuthContext.Provider 
            value={{
                removeToken,
                getToken,
                login,
                logout,
                tokenUsuario,
                datosUsuario,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;