import React from "react";
import Navigation from "./navigation/Navigation";
import { PaperProvider } from "react-native-paper";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";



const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: "transparent",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
        <Navigation  />
        <StatusBar style="light" />
    </PaperProvider>
  );
}
