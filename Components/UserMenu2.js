import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { Icon, SpeedDial } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../Context/Context";
import { auth } from "../firebase";

export default function UserMenu2({}) {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);

  const handleAccountNav = () => {
    navigation.navigate("Home", { user_id: auth.currentUser.uid });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  const showMenu = () => setVisible(true);

  const [open, setOpen] = React.useState(false);
  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: "edit", color: "#fff" }}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
    >
      <SpeedDial.Action
        icon={{ name: "add", color: "#fff" }}
        title="Add"
        onPress={() => console.log("Add Something")}
      />
      <SpeedDial.Action
        icon={{ name: "delete", color: "#fff" }}
        title="Delete"
        onPress={() => console.log("Delete Something")}
      />
    </SpeedDial>
  );
}

const styles = StyleSheet.create({});
