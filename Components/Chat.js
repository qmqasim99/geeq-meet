import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const Chat = ({ navigation }) => {
  const [chatMessage, setChatMessage] = useState("Write Your Message Here");

  return (
    <View>
      <Text style={{ borderWidth: 1, height: 400 }}>Chat Page</Text>
      <TextInput
        value={chatMessage}
        style={{ borderWidth: 1, margin: 10 }}
      ></TextInput>
      <Button
        title="Meet"
        onPress={() => {
          console.log("Meet Pressed");
        }}
      />
      <Button
        title="Group Home"
        onPress={() => {
          navigation.navigate("Group");
        }}
      />
    </View>
  );
};

export default Chat;
