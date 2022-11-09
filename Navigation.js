import React, { useContext, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { AuthContext } from "./context/AuthContext";

const Stack = createNativeStackNavigator();


const Navigation = () => {
    
    const {getToken, estaLogueado} = useContext(AuthContext);    
    
    return (

    <NavigationContainer independent={true}>
            <Stack.Navigator>
                {estaLogueado ? (
                    
                    <Stack.Screen
                        name="ORT - IT Support" 
                        component={HomeScreen}
                        options={{headerShown: false}}
                    />
                ) : (
                  <>
                    <Stack.Screen 
                        name="Login" 
                        component={LoginScreen}
                        options={{headerShown: false}}
                    />   
                  </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;