import React, { useEffect, useState, useContext } from "react";
import { ButtonGroup, ThemeProvider } from "react-native-elements";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { auth } from "../firebase";
import { UserContext, ThemeContext } from "../Context/Context";

const Nav = ({ type }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const [theseButtons, setTheseButtons] = useState([]);
  const { currentGroup } = useContext(UserContext);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    switch (type) {
      case "home":
        setTheseButtons(["New Group", "My Profile"]);
        break;
      case "group":
        setTheseButtons(["Chat", "Meet"]);
        break;
      case "map":
        setTheseButtons(["Chat", "Group"]);
        break;

      default:
        break;
    }
  }, []);

  const handleNavigate = (value) => {
    console.log(value);

    if (value === "New Group") {
      console.log("hey");
      navigation.navigate("CreateGroup");
    }
    if (value === "My Profile") {
      navigation.navigate("UserAccount", { user_id: auth.currentUser.uid });
    }
    if (value === "Chat") {
      navigation.navigate("Chat");
    }
    if (value === "Group") {
      navigation.navigate("Group", { group_id: currentGroup.id });
    }
    if (value === "Meet") {
      if (currentGroup.meets && currentGroup.meets.active) {
        navigation.navigate("MapContainer");
      } else {
        navigation.navigate("ConfigureMeet");
      }
    }
  };

  return (
    <View style={theme.navContainer}>
      <TouchableOpacity
        onPress={() => {
          handleNavigate(theseButtons[0]);
        }}
        style={[theme.button]}
      >
        <Text style={theme.buttonText}>{theseButtons[0]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleNavigate(theseButtons[1]);
        }}
        style={[theme.button]}
      >
        <Text style={theme.buttonText}>{theseButtons[1]}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Nav;
