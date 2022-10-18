import React, { useContext, useState } from 'react';
import {Text,View,TextInput,Button,StyleSheet} from 'react-native';
import { AuthContext } from './AuthContext';

const LoginScreen = ({navigation}) => {
    const [usuario, setUsuario] = useState(null);
    const [password, setPassword] = useState(null);
    const {isLoading, login} = useContext(AuthContext);
    

    return (
        <View style={styles.container}>
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
        </View>
    );
};

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
})


export default LoginScreen;