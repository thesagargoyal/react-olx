import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import Constants from 'expo-constants';
import {StyleSheet, View} from 'react-native';
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import HomeScreen from "./screens/ListItemScreen";
import AccountScreen from './screens/AccountScreen';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme as DefaultThemeNav } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD6BfxmyMhCi4gudz-7At5_HaiGgtBJcKw",
  authDomain: "sagar-goyal.firebaseapp.com",
  databaseURL: "https://sagar-goyal-default-rtdb.firebaseio.com",
  projectId: "sagar-goyal",
  storageBucket: "sagar-goyal.appspot.com",
  messagingSenderId: "209383659507",
  appId: "1:209383659507:web:920213bfcf9639aa086486"
};

if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig);
}
export default function MainApp() {


  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'deepskyblue',
    },
  };

  const MyTheme = {
    ...DefaultThemeNav,
    colors:{
      ...DefaultTheme.colors,
      background: '#fff'
    }
  }

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const AuthNavigator = ()=>{
    return(
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="signup" component={SignupScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
  const TabNavigator = ()=>{
    return(
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home'
             
          }else if(route.name === 'Create'){
            iconName = 'plus-circle'
          }else{
            iconName= 'user'
          }
          return <View><Feather name={iconName} size={25} color={color} /></View>;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'deepskyblue',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{title:""}}/>
        <Tab.Screen name="Create" component={CreatePostScreen} options={{title:""}} />
        <Tab.Screen name="Account" component={AccountScreen} options={{title:""}} />
      </Tab.Navigator>
    );
  }
  const Navigation = ()=>{
    
    const [user, setUser]= useState('');

    useEffect(()=>{
      const unsuscribe = firebase.auth().onAuthStateChanged((userExist)=>{
        if(userExist){
          setUser(userExist);
        }else{
          setUser('');
        }
      });
      return unsuscribe;
    }, []);

    return(
      <NavigationContainer>
      {user?<TabNavigator />:
      <AuthNavigator />}
    </NavigationContainer>
    );
  }

  return (
  <>
    <PaperProvider theme={theme}>
    <StatusBar barStyle="dark-content" backgroundColor="deepskyblue"/>
    <View style={styles.container}>
        <Navigation/>
    </View>
    </PaperProvider>
  </>
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        paddingTop: Constants.statusBarHeight,
    },
    
})