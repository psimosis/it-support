import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import NewTicketScreen from "./screens/NewTicketScreen";
import MisTickets from "./screens/MisTickets";

const Drawer = createDrawerNavigator()

export function DrawerNavigator() {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name = "Mis Tickets" component = {MisTickets}/>
            <Drawer.Screen name = "Nuevo Ticket" component = {NewTicketScreen}/>
        </Drawer.Navigator>
    )
}