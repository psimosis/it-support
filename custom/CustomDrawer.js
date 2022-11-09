import React, { useContext, useState } from "react";
import { View, Text, ImageBackground, Image, Button } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";

const CustomDrawer = (props) => {
    const {logout, nombreUsuario} = useContext(AuthContext);

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <ImageBackground
                    source={require('../images/back_fade2.jpg')}
                    style={{padding: 20}}>
                        <Image
                            source={require('../images/logoflor.png')}
                            style={{height:80, width: 80, borderRadius:40, marginBottom: 10}}
                        />
                        <Text style={{color: 'Black', fontSize: 18, fontWeight: 'bold'}}>{nombreUsuario}</Text>
                        <Text style={{color: 'Black', fontSize: 12, }}>Texnico Local</Text>
                        <Text style={{color: 'Black', fontSize: 12, fontWeight: 'bold'}}>Sede: Belgrano</Text>
                </ImageBackground>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            
            <View style={{padding:20,borderTopWidth:1,borderTopColor:'Grey'}}>
                <Button title="Logout" color="grey" onPress={logout} />
            </View>
            
        </View>
    )
}

export default CustomDrawer