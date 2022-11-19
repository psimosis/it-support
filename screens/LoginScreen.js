import React, { useContext, useState } from 'react';
import {Text,View,TextInput,Button,StyleSheet, Image, Dimensions} from 'react-native';
import {AuthContext } from '../context/AuthContext';
import imagen from '../images/logo.png'
import imagenOrt from '../images/logoort.png'
import CustomAlert from '../components/CustomAlert';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginScreen = ({navigation}) => {
    const [usuario, setUsuario] = useState(null);
    const [password, setPassword] = useState(null);
    const {login, removeToken} = useContext(AuthContext);
    const [alertVisible, setAlertVisible] = useState(false);
    
    return (
        <View style={styles.container}>
            <CustomAlert
                visible={alertVisible}
                titulo={'Acceso Incorrecto'}
                mensaje={'USUARIO O CONTRASEÑA INCORRECTO. \n\nIntentelo nuevamente o contactese con un Administrador'}
                aceptarButton={() => setAlertVisible(false)}
            />
            
            <Image
                source={imagen}
                style={styles.image}
            />
            <Text> </Text>
            <Text> </Text>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input} 
                    placeholder="Ingrese Usuario"
                    value={usuario}
                    onChangeText={text => setUsuario(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese Password" secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Button title="Login" onPress={() => {login(usuario,password)}}/>
            </View>
            <Text> </Text>
            <Text> </Text>
            <Image
                source={imagenOrt}
                style={styles.imageOrt}
            />
        </View>
    );
};

const pantalla = Dimensions.get('screen');



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper:{
        width: '80%',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    image: {
        height:300,
        width:pantalla.width,
        resizeMode: 'contain',
      },
    imageOrt: {
       height:50,
       width:90,
       resizeMode: 'contain',
    },
})


export default LoginScreen;