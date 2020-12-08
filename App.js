import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Login from './pages/Login';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Autenticado = () => {
    return(
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    )
}

const Logout = ( {navigation} ) => {
    return (
      <View>
        <Button onPress={() => {
          AsyncStorage.removeItem('@jwt');
          navigation.push('Login');
        }}title="SAIR"></Button>
      </View>
    )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown : false }}>
        <Stack.Screen name="Login" component={Login} /> 
        <Stack.Screen name="Cadastro" component={Cadastro} /> 
        <Stack.Screen name="Autenticado" component={Autenticado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
