import React from 'react';
import { LogBox } from 'react-native';
import MainApp from "./src/MainApp"
import _ from 'lodash';


LogBox.ignoreLogs(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message: string) => {
if (message.indexOf("Setting a timer") <= -1) {
_console.warn(message);
}
};

export default function App() {
  return (
  <>
    <MainApp/>
  </>
  );
}

