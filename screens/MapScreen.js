import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Map_test</Text>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
