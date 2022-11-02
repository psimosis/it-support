import React, { useContext } from "react";
import {Text,View} from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "../DrawerNavigator";

const HomeScreen = () => {
    const user = useContext(AuthContext);
    const userToken = user.userToken.session_token;
    console.log(user);
     
    return (
        <NavigationContainer independent={true}>
           <DrawerNavigator />
            <View>
                <Text>User Token: {userToken} </Text>
            </View>

        </NavigationContainer>

    );
};

export default HomeScreen;