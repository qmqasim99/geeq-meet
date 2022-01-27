import * as React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();

function HomeNavButton() {
  return <View />;
}

function MapNavButton() {
  return <View />;
}

function HomeStackScreen({}) {
  return (
    <View>
      <h1>home</h1>
    </View>
  );
}

function MapStackScreen() {
  return (
    <MapStack.Navigator>
      <MapStack.Screen name="MapButton" component={MapNavButton} />
    </MapStack.Navigator>
  );
}

const home = () => {
  return <View></View>;
};

function NavBar() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Home" }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      />

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ tabBarLabel: "Map" }}
        onPress={() => {
          navigation.navigate("Map");
        }}
      />
    </Tab.Navigator>
  );
}

export default NavBar;
