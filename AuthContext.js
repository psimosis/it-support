import React, {createContext, useState} from "react";
import axios from 'axios';
import base64 from 'react-native-base64'
import { BASE_URL } from "./config";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});    
    const [isLoading, setIsLoading] = useState(false);    
        
    const login = (usuario, password) => {
        setIsLoading(true);
        var usrPass64 = base64.encode('glpi:Lamparita2015');
        
        axios.post('${BASE_URL}/initSession/',  {
            headers:{
                'Authorization':' Basic Z2xwaTpMYW1wYXJpdGEyMDE1'
            }
        })
        .then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            console.log(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
        })
        .catch(e => {
            console.log('Login Error ${e}'); 
        })
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
