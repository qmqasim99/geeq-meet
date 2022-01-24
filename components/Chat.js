import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const Chat = () => {
  const [chatMessage, setChatMessage] = useState("Write Your Message Here");

  return (
    <View>
      <Text style={{ borderWidth: 1, height: 600 }}>Chat Page</Text>
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
          console.log("Group Home Pressed");
        }}
      />
    </View>
  );
};

export default Chat;
