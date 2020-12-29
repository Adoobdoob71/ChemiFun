import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, Provider } from "react-native-paper";
import StackNavigator from "./src/navigation/StackNavigator";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD3tOVqJzbrykr68ciGLpPZusVmPHE2xw0",
  authDomain: "chemifun-66fe8.firebaseapp.com",
  databaseURL: "https://chemifun-66fe8.firebaseio.com",
  projectId: "chemifun-66fe8",
  storageBucket: "chemifun-66fe8.appspot.com",
  messagingSenderId: "143919091051",
  appId: "1:143919091051:web:658d9e4c1dead4cd7e902e",
  measurementId: "G-N3VMTBMSV0",
};
firebase.default.initializeApp(firebaseConfig);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF4646",
    accent: "#FF7474",
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer theme={theme}>
        <Provider theme={theme}>
          <StackNavigator />
        </Provider>
      </NavigationContainer>
    );
  }
}
