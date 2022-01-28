import { StatusBar } from "expo-status-bar";

import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
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
import Chat from "./Components/Chat";
import SingleGroupPage from "./Components/SingleGroupPage";

import UserAccount from "./Components/UserAccount";
import MapContainer from "./Components/MapContainer";
import { UserProvider } from "./Context/Context";
import contextTest1 from "./Components/contextTest1";
import contextTest2 from "./Components/contextTest2";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="UserAccount" component={UserAccount} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Group" component={SingleGroupPage} />
          <Stack.Screen name="ConfigureMeet" component={ConfigureMeet} />
          <Stack.Screen name="MapContainer" component={MapContainer} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
