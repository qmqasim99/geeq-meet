import { StyleSheet, Text, Picker, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CheckboxList from "rn-checkbox-list";
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
      {/* <CheckboxList
        headerName="Movies"
        theme="red"
        listItems={data}
        onChange={({ ids, items }) => console.log("My updated list :: ", ids)}
        listItemStyle={{ borderBottomColor: "#eee", borderBottomWidth: 1 }}
        checkboxProp={{ boxType: "square" }} // iOS (supported from v0.3.0)
        onLoading={() => <LoaderComponent />}
      /> */}
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
