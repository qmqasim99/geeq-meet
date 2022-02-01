import { Text, View, TextInput, Button, Image } from "react-native";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useState, useEffect, useContext } from "react";
import GlobalCSS from "../GlobalCSS";
import { ScrollView } from "react-native-web";
import { ThemeContext } from "../Context/Context";
import InviteTest from "../Components/InviteTest";

export default function CreateGroup({ navigation }) {
  const theme = useContext(ThemeContext);
  const collRef = collection(db, "groups");
  const [user, setUser] = useState({});
  const uid = auth.currentUser.uid;
  console.log("auth ", uid);

  const docRef = doc(db, "users", uid);

  const [groupName, setGroupName] = useState("");
  const [groupAvatar, setGroupAvatar] = useState("");

  // get a single user
  const getUser = async () => {
    const udocs = await getDoc(docRef);
    setUser({ uid: udocs.id, ...udocs.data() });

    console.log(" getSingleDoc ", udocs.id, udocs.data());
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (groupName.trim() === "") {
      alert("Please enter new group name");
      return;
    }

    let timestamp = Timestamp.now();

    // add to groups collection
    const newGroupCreated = await addDoc(collRef, {
      group_name: groupName,
      avatar: groupAvatar,
      created_at: timestamp,
      users: [{ name: user.name, uid }],
    });

    // add this group to users doc
    console.log("new group id: ", newGroupCreated.id);
    const newGroup = {
      group_name: groupName,
      group_id: newGroupCreated.id,
      created_at: timestamp,
    };

    const docRef = doc(db, "users", uid);
    updateDoc(docRef, { groups: arrayUnion(newGroup) }).then(
      navigation.navigate("Group", { group_id: newGroupCreated.id })
    );

    console.log("form sumitted");
  };

  return (
    <>
      <View style={theme.homeContainer}>
        <Text style={theme.header}>Create a new group</Text>

        <View style={theme.container}>
          <TextInput
            style={theme.header2}
            placeholder="Group name!"
            onChangeText={(newText) => setGroupName(newText)}
            defaultValue={groupName}
          />
          <TextInput
            style={theme.header2}
            placeholder="Avatar url"
            onChangeText={(newText) => setGroupAvatar(newText)}
            defaultValue={groupAvatar}
          />
          {groupAvatar ? (
            <Image
              source={{ uri: groupAvatar }}
              style={{
                height: 200,
                width: 200,
                borderRadius: "100%",
              }}
            />
          ) : (
            <Text style={theme.header3}>
              No Avatar? No Problem! <br /> Your group will be assigned a random
              image from the vaults.
            </Text>
          )}
          <Button style={theme.button} title="Submit" onPress={handleSubmit} />
        </View>
      </View>

      {/* <Link
        to={{
          screen: 'ViewGroups',
        }}
      >
        View all groups
      </Link>

      <Link
        to={{
          screen: 'Group',
          params: { group_id: '4cXw12VSrQoKHmKsL1Di' },
        }}
      >
        Go to a group
      </Link> */}
    </>
  );
}
