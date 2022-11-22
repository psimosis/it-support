import React, { useContext, useState, useEffect } from "react";
import {Text,View,RefreshControl} from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "../navigation/DrawerNavigator";

const HomeScreen = () => {
    const {tokenUsuario} = useContext(AuthContext);
    //console.log('Token Home: ' + tokenUsuario)
    return (
        <NavigationContainer independent={true}>
           <DrawerNavigator />
        </NavigationContainer>
    );
};

export default HomeScreen;