import React, { useContext, useEffect, useState } from "react";
import { UserContext, ThemeContext } from "../Context/Context";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  deleteField,
  query,
  where,
  collectionGroup,
  document,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  orderBy,
  startAt,
  endAt,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
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
import { auth, db } from "../firebase";

const ViewMyGroups = () => {
  const navigation = useNavigation();
  const { user, groups, setCurrentGroup } = useContext(UserContext);
  const theme = useContext(ThemeContext);

  const [tempGroups, setTempGroups] = useState();

  const ExitGroup = async (group_id, group_name, created_at) => {
    const uid = auth.currentUser.uid;
    console.log(group_name, created_at);
    console.log(group_id, "line66");
    const removeGroup = {
      group_name: group_name,
      group_id: group_id,
      created_at: created_at,
    };
    const userRef = doc(db, "users", uid);
    console.log(user.name);

    // setTempGroups(tempGroups.filter((group) => group.group_id !== group_id )

    const removeUserFromGroups = {
      name: user.name,
      uid: uid,
    };

    const groupRef = doc(db, "groups", group_id);

    await updateDoc(groupRef, {
      users: arrayRemove(removeUserFromGroups),
    });

    await updateDoc(userRef, {
      groups: arrayRemove(removeGroup),
    });
  };
  console.log("line 72");

  useEffect(() => {
    console.log("groups", user.groups);
    setTempGroups(user.groups);
  }, [user, tempGroups]);

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
          <Button
            title={"Exit Group"}
            onPress={() =>
              ExitGroup(item.group_id, item.group_name, item.created_at)
            }
          ></Button>
          {/* <Text style={theme.fListText2}>({item.users.length} members)</Text> */}
        </View>
      </TouchableOpacity>
    );
  };
  console.log("line99");

  return (
    <>
      <View>
        <FlatList
          data={tempGroups}
          renderItem={renderGroupList}
          keyExtractor={(item) => item.group_id}
          style={theme.fListArea}
        />
      </View>
    </>
  );
};

export default ViewMyGroups;
