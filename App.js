import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "./components/Chat";
import SingleGroupPage from "./components/SingleGroupPage";

export default function App() {
  const Stack = createNativeStackNavigator();

  function MyStack() {
    function ExampleScreen({ navigation }) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>EXAMPLE PAGE</Text>
          <Button
            title="Chat"
            onPress={() => {
              navigation.navigate("Chat");
            }}
          />
          <Button
            title="Group"
            onPress={() => {
              navigation.navigate("Group");
            }}
          />
        </View>
      );
    }

    return (
      <Stack.Navigator>
        <Stack.Screen name="Example" component={ExampleScreen} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Group" component={SingleGroupPage} />

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
