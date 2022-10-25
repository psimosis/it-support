import React, {createContext, useState} from "react";
import axios from 'axios';
import base64 from 'react-native-base64'
import { BASE_URL } from "../config/Config";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userToken, setUserToken] = useState({});    
            
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
            setUserToken(userToken);
            AsyncStorage.setItem('userToken', JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <AuthContext.Provider 
            value={{
                userToken,
                login,
            }}>
            {children}
        </AuthContext.Provider>
    );
};