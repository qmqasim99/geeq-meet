import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
} from "react-native";
import CreateGroup from "../Components/CreateGroup";
import { auth } from "../firebase";
// import NavBar from "../Components/NavBar";
import Nav from "../Components/Nav";
import ViewGroups from "../Components/ViewGroups";
import InviteTest from "../Components/InviteTest";
import { ThemeContext } from "../Context/Context";
import UserMenu from "../Components/UserMenu";

const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);

  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.replace("Login");
  //     })
  //     .catch((error) => alert(error.message));
  // };

  return (
    <View style={theme.homeContainer}>
      <Text style={theme.header}>Welcome {auth.currentUser?.email}</Text>
      <UserMenu />

      <ScrollView>
        <Text style={theme.header2}>My Groups</Text>
        {/* MOVED INTO USER MENU
      <View style={theme.buttonContainer}>
        <Button
          title="My Account"
          onPress={() => {
            navigation.navigate("UserAccount");
          }}
        />
        <TouchableOpacity
          onPress={handleSignOut}
          style={(theme.button, theme.buttonOutline)}
        >
          <Text style={theme.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View> */}
        <Text style={theme.header2}>Invites</Text>
        <InviteTest />
        <CreateGroup />
      </ScrollView>
      <Nav />
    </View>
  );
};

export default HomeScreen;
