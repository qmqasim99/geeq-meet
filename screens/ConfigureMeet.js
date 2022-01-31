import { StyleSheet, Text, Picker, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ConfigureMeet() {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("java");
  const meetTypeList = ["cafe", "restaurant", "cinema", "park", "pub"];

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
      <TouchableOpacity
        onPress={(e) => {
          navigation.navigate("MapContainer");
        }}
      >
        <Text>go to maps</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
