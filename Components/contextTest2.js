import { View, Text } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/core";
import { UserContext } from "../Context/Context";

const ContextTest2 = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  return (
    <View>
      <Text>{user.name}</Text>
    </View>
  );
};

export default ContextTest2;
