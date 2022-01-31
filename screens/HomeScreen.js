import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect } from "react";
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
import { ThemeContext, UserContext } from "../Context/Context";
import UserMenu from "../Components/UserMenu";
import ViewMyGroups from "../Components/ViewMyGroups";

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
      <UserMenu style={{ position: "absolute" }} />
      <Text style={theme.header}>Welcome {auth.currentUser?.email}</Text>

      <ScrollView>
        <Text style={theme.header2}>My Groups</Text>
        <ViewMyGroups />
        <Text style={theme.header2}>Invites</Text>
        <InviteTest />
        <CreateGroup />
      </ScrollView>
      <Nav />
    </View>
  );
};

export default HomeScreen;
