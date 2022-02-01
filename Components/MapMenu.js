import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { Icon } from "react-native-elements";

export default function MapMenu({ setDestinationSelected }) {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);

  const handleChangeButton = () => {
    setDestinationSelected(false);
    setVisible(false);
  };
  const handleEndMeeting = () => {
    //change daatabase
    //update context
  };

  const showMenu = () => setVisible(true);
  /*
  to-do
  - sort out menu buttons for change transport
  - sort out menu buttons for live updates
  - sort out menu buttons for end meeting
   */

  return (
    <View
      style={{
        height: "10%",
        alignItems: "right",
        justifyContent: "right",
      }}
    >
      <Menu
        visible={visible}
        anchor={
          <Text onPress={showMenu}>
            <Icon reverse name="map" type="ionicon" color="#517fa4" />
          </Text>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={handleChangeButton}>Change meeting point</MenuItem>
        <MenuItem disabled onPress={hideMenu}>
          Change transport
        </MenuItem>
        <MenuItem disabled>Live Updates</MenuItem>
        <MenuDivider />
        <MenuItem onPress={handleEndMeeting}>End Meeting</MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({});
