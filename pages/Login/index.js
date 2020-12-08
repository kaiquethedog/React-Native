import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ( {navigation} ) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const Salvar = async (value) => {
        try{
            await AsyncStorage.setItem('@jwt', value)
        } catch (e) {

        }
    }

    const Logar = () => {
        // alert(email + '-'+senha);
        // console.log('Foi')

        const corpo = {
            email : email,
            senha : senha
        }

        fetch('http://192.168.4.117:5000/api/Account/login', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(corpo)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status != 404){
                alert('Login efetaudo')
                console.log(data.token);

                Salvar(data.token);
                navigation.push('Autenticado');
            }else{
                alert('Dados incorretos')
            }
        })
        // .catch(error => alert('Falha na requisição'))
    }
 
    useEffect(() => {

    })

    return(
        <View style={styles.container}>
            <Text>Login</Text>

            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="Digite seu Email"
            />

            <TextInput
                style={styles.input}
                onChangeText={text => setSenha(text)}
                value={senha}
                placeholder="Digite sua Senha"
            />

            <TouchableOpacity style={styles.button} onPress={Logar}>
                    <Text style={{color: 'white'}}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={{color: 'white'}}>Cadrastre-se aqui</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    input: {
        width: '90%',
        height: 40,
        justifyContent: 'center', 
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginTop: 10
    },
    button: {
        width: '70%',
        height: 40,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#000000', 
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginTop: 10
    }
  });


export default Login; 