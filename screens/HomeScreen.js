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
import { auth } from "../firebase";
// import NavBar from "../Components/NavBar";
import InviteTest from "../Components/InviteTest";
import { ThemeContext, UserContext } from "../Context/Context";
import UserMenu2 from "../Components/UserMenu2";
import ViewMyGroups from "../Components/ViewMyGroups";
import Nav from "../Components/Nav";

const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const { user, setUser, groups, setGroups } = useContext(UserContext);

  useEffect(() => {
    console.log("homepage render", groups);
  }, [groups]);

  return (
    <>
      <UserMenu2 style={{ position: "absolute" }} />
      <View style={theme.homeContainer}>
        <Text style={theme.header}>Welcome {user.name}</Text>

        <View>
          <Text style={theme.header2}>Invites</Text>
          <InviteTest />
          <Text style={theme.header2}>My Groups</Text>
          <ViewMyGroups />
        </View>
        <Nav type={"home"} />
      </View>
    </>
  );
};

export default HomeScreen;
