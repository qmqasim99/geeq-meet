import React, { useContext, useEffect, useState } from "react";
import { UserContext, ThemeContext } from "../Context/Context";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import {
  View,
  Image,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";

const ViewMyGroups = () => {
  const navigation = useNavigation();
  const { user, groups, setCurrentGroup } = useContext(UserContext);
  const theme = useContext(ThemeContext);

  useEffect(() => {}, [user, groups]);

  const renderGroupList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={(ev) => {
          navigation.navigate("Group", { group_id: item.id });
        }}
      >
        <View style={theme.fListCard}>
          <Image
            source={
              item.avatar
                ? { uri: item.avatar }
                : { uri: "https://picsum.photos/200" }
            }
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              borderRadius: 100,
            }}
          />
          <Text style={theme.fListText} key={item.id}>
            {item.group_name}
          </Text>
          <Button
            title={"Exit Group"}
            onPress={() => ExitGroup(item.id, item.group_name)}
          ></Button>
        </View>
      </TouchableOpacity>
    );
  };

  const ExitGroup = async (group_id, group_name) => {
    const uid = auth.currentUser.uid;
    const removeGroup = {
      group_name: group_name,
      group_id: group_id,
    };
    const removeUserFromGroups = {
      name: user.name,
      uid: uid,
    };

    const userRef = doc(db, "users", uid);
    const groupRef = doc(db, "groups", group_id);

    await updateDoc(groupRef, {
      users: arrayRemove(removeUserFromGroups),
    });

    await updateDoc(userRef, {
      groups: arrayRemove(removeGroup),
    });
  };

  return (
    <>
      <View>
        <FlatList
          data={groups}
          renderItem={renderGroupList}
          keyExtractor={(item) => item.id}
          style={theme.fListArea}
          contentContainerStyle={{ justifyContent: "center" }}
        />
      </View>
    </>
  );
};

export default ViewMyGroups;
