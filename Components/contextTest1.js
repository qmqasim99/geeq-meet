import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import { UserContext } from "../Context/Context";

const contextTest1 = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);

  const handlePress = () => {
    setUser({ name: "info passed through context" });
    // console.log(UserContext);
    navigation.navigate("test2");
  };
  return (
    <View>
      <Button
        title="test 2"
        onPress={() => {
          handlePress();
        }}
      />
    </View>
  );
};

export default contextTest1;
