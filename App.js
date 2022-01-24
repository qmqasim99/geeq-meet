import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
} from 'firebase/firestore';
import { db } from './firebase';

import { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export default function App() {
  const collRef = collection(db, 'books');

  const gettingDocs = async () => {
    try {
      const fdocs = await getDocs(collRef);

      let books = [];

      fdocs.docs.map((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });
      console.log('in gettingDocs', books);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    gettingDocs();
  }, []);



export default function App() {
  const Stack = createNativeStackNavigator();

  function MyStack() {
    function ExampleScreen({ navigation }) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>EXAMPLE PAGE</Text>
        </View>
      );
    }

    return (
      <Stack.Navigator>
        <Stack.Screen name="Example" component={ExampleScreen} />
        {/* e.g. ..... 
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} /> */}
      </Stack.Navigator>
    );
  }


  return (
    <NavigationContainer>
      <MyStack />
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
