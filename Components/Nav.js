import React, { useEffect, useState, useContext } from "react";
import { ButtonGroup, ThemeProvider } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
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
    console.log(route);

    if (theseButtons[value] === "New Group") {
      navigation.navigate("CreateGroup");
    }
    if (theseButtons[value] === "My Profile") {
      navigation.navigate("UserAccount", { user_id: auth.currentUser.uid });
    }
    if (theseButtons[value] === "Chat") {
      navigation.navigate("Chat");
    }
    if (theseButtons[value] === "Group") {
      navigation.navigate("Group", { group_id: currentGroup.id });
    }
    if (theseButtons[value] === "Meet") {
      if (currentGroup.meets && currentGroup.meets.active) {
        navigation.navigate("MapContainer");
      } else {
        navigation.navigate("ConfigureMeet");
      }
    }
  };

  return (
    <>
      <ButtonGroup
        buttons={theseButtons}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          handleNavigate(value);
        }}
        containerStyle={theme.navbarStyle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
  },
});
export default Nav;
