import React, {createContext, useState} from "react";
import axios from 'axios';
import base64 from 'react-native-base64'
import { BASE_URL } from "./config";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});    
    const [isLoading, setIsLoading] = useState(false);    
        
    const login = async (usuario,password) => {
        setIsLoading(true);
        var usrPass64 = base64.encode(usuario + ':' + password);
        
        var config = {
            method: 'get',
            url: 'http://200.32.43.32/glpi/apirest.php//initSession/',
            headers: { 
              'Authorization': 'Basic ' + usrPass64
            }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <AuthContext.Provider 
            value={{
                isLoading,
                userInfo,
                login,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
