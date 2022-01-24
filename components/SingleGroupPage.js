import { View, Text, Image, FlatList, ScrollView, Button } from "react-native";

const groupMembers = [
  { user_id: 1, name: "Frosty" },
  { user_id: 2, name: "Toasty" },
  { user_id: 3, name: "Boney" },
  { user_id: 4, name: "Gusty" },
];
const SingleGroupPage = () => {
  const renderName = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        padding: 50,
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 16,
      }}
    >
      <Text>Group Name Here</Text>
      <Image
        source={{
          uri: "https://www.clipartkey.com/mpngs/m/9-93815_daisy-flower-petals-yellow-cartoon-flower-png.png",
        }}
        style={{ width: 200, height: 200 }}
      />

      <Text>Group Members</Text>
      <FlatList
        data={groupMembers}
        renderItem={renderName}
        keyExtractor={(item) => item.user_id}
      />
      <View styles={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          title="Chat"
          onPress={() => {
            console.log("Chat Pressed");
          }}
        />
        <Button
          title="Meet"
          onPress={() => {
            console.log("Meet Pressed");
          }}
        />
      </View>
    </View>
  );
};

export default SingleGroupPage;
