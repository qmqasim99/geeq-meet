import {
  StyleSheet,
  CheckBox,
  Text,
  Picker,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { UserContext, ThemeContext } from "../Context/Context";

export default function ConfigureMeet() {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const { currentGroup, user } = useContext(UserContext);

  const [selectedValue, setSelectedValue] = useState("java");
  const meetTypeList = ["cafe", "restaurant", "cinema", "park", "pub"];
  let memberAr = [];
  // useEffect(() => {
  //   //onload create array for checkbox list
  //   memberAr = currentGroup.user.map((user, i) => {
  //     const member = { ...user };
  //     member.id = i;
  //     return member;
  //   });
  // }, [currentGroup]);

  const handleConfigureMeet = (e) => {
    navigation.navigate("MapContainer");
  };

  return (
    <View>
      <Text>Configure Meetup</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 20, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {meetTypeList.map((type, i) => {
          return <Picker.Item key={i} label={type} value={type} />;
        })}
      </Picker>
      <View style={theme.container}>
        <View style={theme.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={theme.checkbox}
          />
          <Text style={theme.label}>Do you like React Native?</Text>
        </View>
        <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text>
      </View>

      <TouchableOpacity
        onPress={(e) => {
          handleConfigureMeet;
        }}
      >
        <Text>Let's Meet!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
