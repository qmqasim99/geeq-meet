import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ConfigureMeet() {
  const navigation = useNavigation();

  return (
    <View>
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
