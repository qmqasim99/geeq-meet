import React, { useContext, useEffect } from "react";
import { UserContext, ThemeContext } from "../Context/Context";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ViewMyGroups = () => {
  const navigation = useNavigation();
  const { user, groups, setCurrentGroup } = useContext(UserContext);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    console.log("VIEWWWWWWWW", groups);
  }, [user, groups]);

  const renderGroupList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={(ev) => {
          navigation.navigate("Group", { group_id: item.group_id });
          //set current group
        }}
      >
        <View style={theme.fListCard}>
          <Text style={theme.fListText} key={item.group_id}>
            {item.group_name}
          </Text>
          {/* <Text style={theme.fListText2}>({item.users.length} members)</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={user.groups}
        renderItem={renderGroupList}
        keyExtractor={(item) => item.group_id}
        style={theme.fListArea}
      />
    </View>
  );
};

export default ViewMyGroups;
