import React from "react";
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import NewTicketScreen from "./screens/NewTicketScreen";
import MisTickets from "./screens/MisTickets";
import { View,StyleSheet } from "react-native-web";

const Drawer = createDrawerNavigator()

export function DrawerNavigator() {
    return(
        <Drawer.Navigator>
                            
                <Drawer.Screen 
                    name = "Mis Tickets" 
                    component = {MisTickets}
                    options={{
                        headerTitleStyle: {fontFamily: 'normal'},
                        drawerLabel: "Mis Tickets",
                        drawerItemStyle: {backgroundColor: 'lightgrey'},
                    }}
                />

                <Drawer.Screen name = "Crear Ticket" component = {NewTicketScreen}/>
                
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    separador: {
        marginVertical: 8,
        borderBottomColor: "Blue",
        borderBottomWidth: StyleSheet.hairlineWidth
    }

})