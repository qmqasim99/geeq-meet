import React, { useState, useEffect, useContext } from "react";
import { UserContext, ThemeContext } from "../Context/Context";

import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  updateDoc,
  arrayUnion,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Nav from "../Components/Nav";

const SingleGroupPage = ({ route, navigation }) => {
  const theme = useContext(ThemeContext);
  const { user, groups, setCurrentGroup, currentGroup } =
    useContext(UserContext);

  const { group_id } = route.params;
  const [group, setGroup] = useState({});
  const [meetActive, setMeetActive] = useState(false);
  const [loadCurGroup, setLoadCurGroup] = useState(false);
  const [newFriend, setNewFriend] = useState("");
  const [searchedFriends, setSearchedFriends] = useState([]);
  const usersRef = collection(db, "users");
  const docRef = doc(db, "groups", group_id);
  useEffect(() => {
    getSingleDoc();
  }, [user, groups]);

  // get a single doc
  const getSingleDoc = async () => {
    const gdocs = await getDoc(docRef);
    setGroup({ id: gdocs.id, ...gdocs.data() });
    await setCurrentGroup({ id: gdocs.id, ...gdocs.data() });
    setMeetActive(gdocs.data().meets.active);
    setLoadCurGroup(true);
  };

  // searches for friends by name
  const handleSubmitFriend = async (e) => {
    e.preventDefault();

    try {
      if (newFriend.trim() === "") {
        alert("Please enter a name to search");
        return;
      }
      const q = query(
        usersRef,
        orderBy("name"),
        startAt(newFriend),
        endAt(newFriend + "\uf8ff")
      );

      const udocs = await getDocs(q);

      let users = [];

      udocs.docs.map((doc) => {
        let invited = false;
        const currentInvites = doc.data().invites;
        if (currentInvites) {
          currentInvites.map((invite) => {
            invite.group_id === group.id ? (invited = true) : (invited = false);
          });
        }
        users.push({ uid: doc.id, invited, ...doc.data() });
      });
      setSearchedFriends(users);
    } catch (err) {
      console.log(err.message);
    }
  };

  // searches for friends by name
  const handleSubmitInvite = async (inviteeName, inviteeUid) => {
    try {
      setNewFriend("");
      setSearchedFriends([]);
      const newInvite = {
        invited_by: auth.currentUser.displayName,
        invited_by_uid: auth.currentUser.uid,
        invitee: inviteeName,
        invitee_uid: inviteeUid,
        accepted: false,
      };

      // update group invite array with new invite
      updateDoc(docRef, { invites: arrayUnion(newInvite) });
      // add a new invite in users colleciton
      const newInviteForUsersCollection = {
        invited_by: auth.currentUser.displayName,
        invited_by_uid: auth.currentUser.uid,
        group_name: group.group_name,
        group_id: group.id,
        accepted: false,
      };

      const usersDocRef = doc(db, "users", inviteeUid);
      updateDoc(usersDocRef, {
        invites: arrayUnion(newInviteForUsersCollection),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderName = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UserAccount", { user_id: item.uid });
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
          <Text style={theme.fListText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFriendName = ({ item }) => {
    return (
      <View style={theme.horizontalButtonContainer}>
        <Text style={theme.header4}>{item.name}</Text>
        <TouchableOpacity
          disabled={item.invited}
          title={item.invited ? "Invite Sent" : "Invite"}
          onPress={() => handleSubmitInvite(item.name, item.uid)}
          style={[theme.button, theme.buttonOutline]}
        >
          <Text style={theme.buttonText}>
            {item.invited ? "Invite Sent" : "Invite"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // display current invitee list
  const renderInviteList = ({ item }) => {
    return (
      <View style={theme.fListCard}>
        <Text style={theme.fListText}>{item.invitee}</Text>
      </View>
    );
  };

  return (
    <>
      <ScrollView contentContainerStyle={[theme.scrollContainer, { flex: 7 }]}>
        {loadCurGroup ? (
          meetActive && (
            <View style={theme.activeMeetAlert}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MapContainer");
                }}
                to={{
                  screen: "MapContainer",
                }}
              >
                <Text style={theme.alertText}>MEETING ACTIVE</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <></>
        )}
        {/* //this view contains group name and image */}
        <View style={{ flexGrow: 1, alignItems: "center" }}>
          <Text style={[theme.header, { marginBottom: 10 }]}>
            {group.group_name}
          </Text>
          {/* <Text>Group ID: {group.id}</Text> */}
          <View>
            <Image
              source={require("../assets/roundweak.png")}
              style={{
                position: "absolute",
                height: 300,
                width: 300,
                top: -50,
                left: -50,
              }}
            />

            <Image
              source={
                currentGroup.avatar
                  ? { uri: currentGroup.avatar }
                  : { uri: "https://picsum.photos/200" }
              }
              style={{
                width: 200,
                height: 200,
                justifyContent: "center",
                borderRadius: 100,
              }}
            />
          </View>
        </View>
        {/* //this view contains search people functionality */}

        <View style={[{ flexGrow: 1 }, theme.horizontalButtonContainer]}>
          <TextInput
            style={[theme.loginInput, { width: "40%", flex: 3 }]}
            placeholder="Add new friend!"
            onChangeText={(newText) => setNewFriend(newText)}
            defaultValue={newFriend}
          />

          <TouchableOpacity
            style={[theme.button, theme.buttonOutline, { flex: 1 }]}
            onPress={handleSubmitFriend}
          >
            <Text style={theme.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* //this view contains searched friends */}

        {searchedFriends.length > 0 && (
          <View style={[theme.fListArea, { flexGrow: 2 }]}>
            <Text style={theme.header2}>Users found:</Text>
            <FlatList
              data={searchedFriends}
              renderItem={renderFriendName}
              keyExtractor={(item) => item.uid}
            />
          </View>
        )}
        {/* //this view contains group invites */}

        {group.invites && (
          <View style={theme.fListArea}>
            <Text style={theme.header2}>Friends invited:</Text>
            <FlatList
              data={group.invites}
              renderItem={renderInviteList}
              keyExtractor={(item) => item.invitee_uid}
            />
          </View>
        )}
        {/* //this view contains group members */}

        {group.users && (
          <View style={(theme.fListArea, { flexGrow: 2 })}>
            <Text style={theme.header2}>Current friends:</Text>
            <FlatList
              data={group.users}
              renderItem={renderName}
              keyExtractor={(item) => item.uid}
            />
          </View>
        )}
      </ScrollView>
      <View>
        <Nav type={"group"} />
      </View>
    </>
  );
};

export default SingleGroupPage;
