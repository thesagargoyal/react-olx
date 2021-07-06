import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import CreateAdScreen from "./screens/CreateAdScreen";
import ListItemScreen from "./screens/ListItemScreen";
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';

export default function MainApp() {

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'deepskyblue',
    },
  };

  return (
  <>
    <PaperProvider theme={theme}>
    <StatusBar barStyle="dark-content" backgroundColor="deepskyblue"/>
    <View style={styles.container}>
        {/* <LoginScreen></LoginScreen> */}
        {/* <SignupScreen></SignupScreen> */}
        {/* <CreateAdScreen/> */}
        <ListItemScreen />
    </View>
    </PaperProvider>
  </>
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    }
})