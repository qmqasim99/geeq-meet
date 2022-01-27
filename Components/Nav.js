import React, { useState } from "react";
import { ButtonGroup } from "react-native-elements";
import { Text, StyleSheet } from "react-native";

export default () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <ButtonGroup
        buttons={["Home", "Groups", "Map", "UserAccount"]}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        containerStyle={{ marginBottom: 20 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
  },
});
