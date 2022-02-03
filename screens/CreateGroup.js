import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import {
  collection,
  doc,
  addDoc,
  setDoc,
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
  //console.log("auth ", uid);

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

    // add this group to groupChat
    //console.log("new group id: ", newGroupCreated.id);
    // add to groups collection

    // const chatRef = collection(db, 'groupChats');
    const newGroupChatCreated = await setDoc(
      doc(db, "groupChats", newGroupCreated.id),
      {
        group_name: groupName,
        created_at: timestamp,
        messages: [],
      }
    );

    // add this group to users doc
    //console.log("new group id: ", newGroupCreated.id);
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
    <View
      style={[
        theme.homeContainer,
        {
          flexDirection: "column",
          alignItems: "center",
          padding: 10,
          justifyContent: "space_between",
        },
      ]}
    >
      <Text style={[theme.header, { flex: 1, margin: 20 }]}>
        Create a new group
      </Text>
      <TextInput
        style={[theme.loginInput, { flex: 1, margin: 20 }]}
        placeholder="Group name!"
        onChangeText={(newText) => setGroupName(newText)}
        defaultValue={groupName}
      />
      <TextInput
        style={[theme.loginInput, { flex: 1, margin: 20 }]}
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
            flex: 4,
            margin: 20,
          }}
        />
      ) : (
        <View style={{ flex: 12 }}>
          <Text style={theme.header3}>
            No Avatar? No Problem! Your group will be assigned a random image
            from the vaults.
          </Text>
          <View
            style={{
              alignItems: "center",
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: "#F2BE2D",
              left: 60,
              margin: 20,
            }}
          />
        </View>
      )}

      <View style={theme.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          style={[theme.button, theme.buttonOutline]}
        >
          <Text style={theme.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
