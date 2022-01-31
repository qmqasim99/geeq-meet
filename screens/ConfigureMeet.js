import { StyleSheet, Text, Picker, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { UserContext, ThemeContext } from "../Context/Context";

export default function ConfigureMeet() {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const { currentGroup, user } = useContext(UserContext);

  const [selectedValue, setSelectedValue] = useState("java");
  const meetTypeList = ["Cafe", "Restaurant", "Cinema", "Park", "Pub"];
  let memberAr = [];
  useEffect(() => {
    console.log(currentGroup.users);
    //onload create array for checkbox list
    // memberAr = currentGroup.user.map((user, i) => {
    //   const member = { ...user };
    //   member.id = i;
    //   return member;
    // });
  }, [currentGroup]);

  const handleConfigureMeet = (e) => {
    navigation.navigate("MapContainer");
  };

  return (
    <View style={theme.container}>
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
