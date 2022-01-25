import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import CreateGroup from "../Components/CreateGroup";
import { auth } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>HomePage of groups and invites will go here</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>
          Sign out = need to discuss how to sign out from page. not in wireframe
        </Text>
      </TouchableOpacity>

      <Button
        title="My Account"
        onPress={() => {
          navigation.navigate("UserAccount");
        }}
      />

      <CreateGroup />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
