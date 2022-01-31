import React, { useState } from "react";
import { ButtonGroup } from "react-native-elements";
import { Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const Nav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();

  const route = useRoute();

  const handleNavigate = (value) => {
    console.log(route);

    if (value === 0) {
      navigation.navigate("Home");
    }
    if (value === 1) {
      navigation.navigate("Chat_2");
    }
    if (value === 2) {
      navigation.navigate("ConfigureMeet");
    }
    if (value === 3) {
      navigation.navigate("UserAccount");
    }
  };

  return (
    <>
      <ButtonGroup
        buttons={["Home", "Chat", "Meet", "UserAccount"]}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          handleNavigate(value);
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
export default Nav;
