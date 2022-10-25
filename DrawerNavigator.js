import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import NewTicketScreen from "./screens/NewTicketScreen";

const Drawer = createDrawerNavigator()

export function DrawerNavigator() {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name = "NewTicketScreen" component = {NewTicketScreen}/>
        </Drawer.Navigator>
    )
}