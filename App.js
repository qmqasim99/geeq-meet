import { StatusBar } from "expo-status-bar";

import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { Text, View } from "react-native";
import MapScreen from "./screens/MapScreen.js";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ConfigureMeet from "./screens/ConfigureMeet";
import FirebaseTesting from "./Components/FirebaseTesting";
import Chat_2 from "./Components/Chat_2";

import SingleGroupPage from "./Components/SingleGroupPage";

import UserAccount from "./Components/UserAccount";
import MapContainer from "./Components/MapContainer";
import { ThemeProvider, UserProvider } from "./Context/Context";
import contextTest1 from "./Components/contextTest1";
import contextTest2 from "./Components/contextTest2";
import { testTheme } from "./Themes/Themes";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="UserAccount" component={UserAccount} />
            <Stack.Screen name="Chat_2" component={Chat_2} />
            <Stack.Screen name="Group" component={SingleGroupPage} />
            <Stack.Screen name="MapContainer" component={MapContainer} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="ConfigureMeet" component={ConfigureMeet} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
}
