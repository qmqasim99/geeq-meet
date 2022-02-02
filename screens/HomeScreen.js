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
import Nav from "../Components/Nav";
import InviteTest from "../Components/InviteTest";
import { ThemeContext, UserContext } from "../Context/Context";
import UserMenu from "../Components/UserMenu";
import ViewMyGroups from "../Components/ViewMyGroups";

const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const { user, setUser, groups, setGroups } = useContext(UserContext);

  useEffect(() => {
    console.log("homepage render", groups);
  }, [groups]);

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
      <Text style={theme.header}>Welcome {user.name}</Text>

      <View>
        <Button
          title="setuserchange"
          onPress={() => {
            setUser((user) => {
              const obj = { ...groups, wig: "big" };
              return obj;
            });
          }}
        />
        <Text style={theme.header2}>Invites</Text>
        <InviteTest />
        <Text style={theme.header2}>My Groups</Text>
        <ViewMyGroups />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CreateGroup");
          }}
        >
          <Text style={theme.buttonText}>Create new group</Text>
        </TouchableOpacity>
      </View>
      <Nav />
    </View>
  );
};

export default HomeScreen;
