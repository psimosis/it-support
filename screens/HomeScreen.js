import React, { useContext, useState, useEffect } from "react";
import {Text,View,RefreshControl} from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "../DrawerNavigator";

const HomeScreen = () => {
    const {getToken} = useContext(AuthContext);
    //const userToken = user?.userToken?.session_token;
    //const userName = user?.userData?.session?.glpiname;
    //const token = await getToken();

    const [token, setToken] = useState({})
    
    //useEffect(async()=> {
    //  const token = await getToken()
    //  setToken(token)
    //},[])

    //const navTheme = {
    //    colors: {
    //      background: "#171717"
    //    }
    //  };

    return (
        <NavigationContainer independent={true}>
           
           <DrawerNavigator />
            <View>
            <Text>SessionToken: </Text>
            </View>

        </NavigationContainer>

    );
};

export default HomeScreen;