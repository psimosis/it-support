import React, { useContext, useState } from "react";
import {Text,View} from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "../DrawerNavigator";

const HomeScreen = () => {
    const user = useContext(AuthContext);
    const userToken = user.userToken.session_token;
    const userName = user.userData.glpiname;

    const navTheme = {
        colors: {
          background: "#171717"
        }
      };

    return (
        <NavigationContainer independent={true}>
           
           <DrawerNavigator />
            <View>
            <Text>SessionToken: {userToken}</Text>
            <Text>glpiname: {userName}</Text>
            </View>

        </NavigationContainer>

    );
};

export default HomeScreen;