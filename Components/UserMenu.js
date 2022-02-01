import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../Context/Context";
import { auth } from "../firebase";

export default function UserMenu({}) {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);

  const handleAccountNav = () => {
    navigation.navigate("UserAccount", { user_id: auth.currentUser.uid });
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
  /*
  to-do
  - sort out menu buttons for change transport
  - sort out menu buttons for live updates
  - sort out menu buttons for end meeting
   */

  return (
    <View>
      <Menu
        visible={visible}
        anchor={
          <Text onPress={showMenu}>
            <Icon
              reverse
              name="md-options-outline"
              type="ionicon"
              color={theme.icon.color}
            />
          </Text>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={handleAccountNav}>My Account</MenuItem>
        <MenuDivider />
        <MenuItem onPress={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({});
