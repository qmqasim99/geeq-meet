import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/core";
import { UserContext } from "../Context/Context";

const ContextTest1 = () => {
  const navigation = useNavigation();
  const { user, setUser, groups } = useContext(UserContext);

  const handlePress = () => {
    // setUser({ name: "info passed through context" });
    // console.log("user", user);
    // console.log("groups", groups);
    navigation.navigate("2");
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

export default ContextTest1;
