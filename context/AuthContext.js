import React, {createContext, useState} from "react";
import axios from 'axios';
import base64 from 'react-native-base64'
import { BASE_URL } from "../config/Config";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userToken, setUserToken] = useState({}); 
    const [userData, setUserData] = useState({}); 
    
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
          .then(function (response) {
            let userToken = response.data;
            console.log('UserToken 1: ' + JSON.stringify(userToken))
            setUserToken(userToken);
            AsyncStorage.setItem('userToken', JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });

          console.log('UserToken 2: ' + JSON.stringify(userToken))
          var config = {
            method: 'get',
            url: BASE_URL + '/getFullSession/',
            headers: { 
              'Session-Token': '' + userToken.session_token
            }}

          await axios(config)
          .then(function (response) {
            let userData = response.data;
            setUserData(userData);
          })
          .catch(function (error) {
            console.log('Error en la data de usuario')
            console.log(error);
          });


    }

    const logout = () => {
      axios.post( BASE_URL + '/killSession/',
        {},
        {
          headers: {'Session-Token': '' + userToken},
        }
      ).then(res => {
        console.log(res.data)
        AsyncStorage.removeItem('userToken');
        setUserToken({});
      })
    }


    return (
        <AuthContext.Provider 
            value={{
                userToken,
                userData,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;