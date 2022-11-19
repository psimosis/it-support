import React, { Fragment } from "react";

import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import NewTicketScreen from "./screens/NewTicketScreen";
import MisTickets from "./screens/MisTickets";
import TicketDetail from "./screens/TicketDetail"
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
                        headerStyle: {backgroundColor: 'midnightblue',                            
                        },
                        headerTintColor: 'white',
                        unmountOnBlur:true,
                        drawerActiveTintColor: 'midnightblue',
                        headerTitleStyle: {fontFamily: 'normal'},
                        drawerLabel: "Mis Tickets",
                        drawerItemStyle: {backgroundColor: 'lightgrey'},
                        drawerIcon: ({focused, size}) => (<Ionicons
                                name="list"
                                size={size}
                                color={focused ? 'midnightblue' : '#000000'}
                            />
                        ),
                    }}  
                />

                <Drawer.Screen name = "Crear Ticket" 
                component = {NewTicketScreen}
                options={{
                    headerStyle: {backgroundColor: 'midnightblue',},
                    headerTintColor: 'white',
                    unmountOnBlur:true,
                    drawerActiveTintColor: 'midnightblue',
                    headerTitleStyle: {fontFamily: 'normal'},
                    drawerLabel: "Crear Ticket",
                    drawerItemStyle: {backgroundColor: 'lightgrey'},
                    drawerIcon: ({focused, size}) => (<Ionicons
                            name="duplicate-outline"
                            size={size}
                            color={focused ? 'midnightblue' : '#000000'}  />
                    ),
                }}  />

                <Drawer.Screen name = "Detalle Ticket" 
                component = {TicketDetail}
                options={{
                    headerStyle: {backgroundColor: 'midnightblue',},
                    headerTintColor: 'white',
                    unmountOnBlur:false,
                    title: "Detalle del Ticket",
                }}  />
        </Drawer.Navigator>
    )
}