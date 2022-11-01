import React, { Fragment } from "react";

import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import NewTicketScreen from "./screens/NewTicketScreen";
import MisTickets from "./screens/MisTickets";
import Ionicons from '@expo/vector-icons/Ionicons'
import CustomDrawer from "./custom/CustomDrawer"
import { View, StyleSheet } from "react-native";

const Drawer = createDrawerNavigator()

export function DrawerNavigator() {
    return(
        <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props}/>}>
                            
                <Drawer.Screen 
                    name = "Mis Tickets" 
                    component = {MisTickets}
                    options={{
                        drawerActiveTintColor: '#2813F3',
                        headerTitleStyle: {fontFamily: 'normal'},
                        drawerLabel: "Mis Tickets",
                        drawerItemStyle: {backgroundColor: 'lightgrey'},
                        drawerIcon: ({focused, size}) => (<Ionicons
                                name="list"
                                size={size}
                                color={focused ? '#2813F3' : '#000000'}
                            />
                        ),
                    }}  
                />

                <Drawer.Screen name = "Crear Ticket" 
                component = {NewTicketScreen}
                options={{
                    drawerActiveTintColor: '#2813F3',
                    headerTitleStyle: {fontFamily: 'normal'},
                    drawerLabel: "Crear Ticket",
                    drawerItemStyle: {backgroundColor: 'lightgrey'},
                    drawerIcon: ({focused, size}) => (<Ionicons
                            name="duplicate-outline"
                            size={size}
                            color={focused ? '#2813F3' : '#000000'}  />
                    ),
                }}  />

                <Drawer.Screen name = "Cerrar Sesion" 
                component = {NewTicketScreen}
                options={{
                    drawerActiveTintColor: '#2813F3',
                    headerTitleStyle: {fontFamily: 'normal'},
                    drawerLabel: "Cerrar Sesion",
                    drawerItemStyle: {backgroundColor: 'lightgrey'},
                    drawerIcon: ({focused, size}) => (<Ionicons
                            name="exit-outline"
                            size={size}
                            color={focused ? '#2813F3' : '#000000'}                        />
                    ),
                }}  />
        </Drawer.Navigator>
    )
}