import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import MainApp from "./src/MainApp"
import _ from 'lodash';


LogBox.ignoreLogs(['Setting a timer']);
export default function App() {
  return (
  <>
    <MainApp/>
  </>
  );
}

