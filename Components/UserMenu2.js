import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { Icon, SpeedDial, FAB } from "react-native-elements";
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
    <FAB
      visible={true}
      icon={{ name: "log-out-outline", type: "ionicon", color: "#A6D1A1" }}
      color="#2B4A9A"
      style={{ position: "absolute", top: 10, right: 10 }}
      size="small"
      onPress={() => {
        handleSignOut();
      }}
    />
  );
}

const styles = StyleSheet.create({});
