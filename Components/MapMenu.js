import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import { auth, db } from "../firebase";
import { UserContext, ThemeContext } from "../Context/Context";

import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  collectionGroup,
  document,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";

export default function MapMenu({ setDestinationSelected }) {
  const { currentGroup, setCurrentGroup } = useContext(UserContext);
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);

  const handleChangeButton = () => {
    setDestinationSelected(false);
    setVisible(false);
  };
  const handleEndMeeting = async () => {
    //update destination in database
    const docRef = doc(db, "groups", currentGroup.id);
    await updateDoc(docRef, {
      "meets.active": false,
    });

    //update destination in context
    const groupDeepCopy = JSON.parse(JSON.stringify(currentGroup));
    groupDeepCopy.meets.active = false;
    setCurrentGroup(groupDeepCopy);
    navigation.navigate("Home");
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
        // height: "10%",
        // alignItems: "right",
        // justifyContent: "right",
        top: 100,
        margin: 20,
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
        {/* <MenuItem disabled onPress={hideMenu}>
          Change transport
        </MenuItem>
        <MenuItem disabled>Live Updates</MenuItem> */}
        <MenuDivider />
        <MenuItem onPress={handleEndMeeting}>End Meeting</MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({});
