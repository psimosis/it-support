import React, { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { AuthContext } from "./context/AuthContext";
import { DrawerNavigator } from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {userToken} = useContext(AuthContext);
    return (

    <NavigationContainer independent={true}>
            <Stack.Navigator>
                {userToken.session_token ? (
                    
                    <Stack.Screen
                        name="Home" component={HomeScreen}
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