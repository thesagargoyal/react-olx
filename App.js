import React from 'react';
import { LogBox } from 'react-native';
import MainApp from "./src/MainApp"
import _ from 'lodash';


import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([""]);

export default function App() {
  return (
  <>
    <MainApp/>
  </>
  );
}

