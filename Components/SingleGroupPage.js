import { useNavigation, useNavigationParam } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "@react-navigation/native";
import { ThemeContext } from "../Context/Context";

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
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
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
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Nav from "../Components/Nav";

const groupMembers = [
  { user_id: 1, name: "Frosty" },
  { user_id: 2, name: "Toasty" },
  { user_id: 3, name: "Boney" },
  { user_id: 4, name: "Gusty" },
];
const SingleGroupPage = ({ route, navigation }) => {
  const theme = useContext(ThemeContext);

  const { group_id } = route.params;
  const [group, setGroup] = useState({});
  const [newFriend, setNewFriend] = useState("");
  const [searchedFriends, setSearchedFriends] = useState([]);
  const usersRef = collection(db, "users");
  const docRef = doc(db, "groups", group_id); //'4cXw12VSrQoKHmKsL1Di'

  //console.log(navigation);
  // const navigation = useNavigation();
  //console.log('navigation params ', navigation.getParams());
  //  const group_id = navigation.getParams('group_id');
  //const group_id = useNavigationParam('group_id');
  //const { group_id, otherParam } = this.props.route.params;
  console.log("group_id ", group_id);

  useEffect(() => {
    getSingleDoc();
    // console.log("single group : ", group);
  }, []);
  // const group_id = 4cXw12VSrQoKHmKsL1Di;

  // get a single doc
  const getSingleDoc = async () => {
    const gdocs = await getDoc(docRef);
    setGroup({ id: gdocs.id, ...gdocs.data() });
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
        // where('name', '==', newFriend)
        //,
        //orderBy('name')
      );

      const udocs = await getDocs(q);

      let users = [];

      udocs.docs.map((doc) => {
        let invited = false;
        const currentInvites = doc.data().invites;
        console.log(" invitessss", doc.data());
        if (currentInvites) {
          currentInvites.map((invite) => {
            invite.group_id === group.id ? (invited = true) : (invited = false);
            console.log("already invited ", invited);
          });
        }
        users.push({ uid: doc.id, invited, ...doc.data() });
      });
      // console.log("in gettingDocs", users);
      setSearchedFriends(users);
    } catch (err) {
      console.log(err.message);
    }
  };

  // searches for friends by name
  const handleSubmitInvite = async (inviteeName, inviteeUid) => {
    try {
      const newInvite = {
        invited_by: "qname",
        invited_by_uid: auth.currentUser.uid,
        invitee: inviteeName,
        invitee_uid: inviteeUid,
        accepted: false,
      };

      // update group invite array with new invite
      updateDoc(docRef, { invites: arrayUnion(newInvite) });
      // add a new invite in users colleciton
      const newInviteForUsersCollection = {
        invited_by: "qname",
        invited_by_uid: auth.currentUser.uid,
        group_name: group.group_name,
        group_id: group.id,
        accepted: false,
      };

      const usersDocRef = doc(db, "users", inviteeUid);
      updateDoc(usersDocRef, {
        invites: arrayUnion(newInviteForUsersCollection),
      });

      console.log("Friend invited with uid", newInvite);
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderName = ({ item }) => {
    return (
      <View style={theme.fListCard}>
        <Text style={theme.fListText}>{item.name}</Text>
      </View>
    );
  };

  const renderFriendName = ({ item }) => {
    return (
      <View style={theme.horizontalButtonContainer}>
        <Text style={theme.header4}>{item.name}</Text>
        <TouchableOpacity
          disabled={item.invited}
          title="Invite"
          onPress={() => handleSubmitInvite(item.name, item.uid)}
          style={[theme.button, theme.buttonOutline]}
        >
          <Text style={theme.buttonText}>Invite</Text>
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
    <View style={[theme.scrollContainer, { flex: 7 }]}>
      {/* <Link
          to={{ screen: "InviteTest", params: { uid: "K5XmEen38Qx4LcTbY3nS" } }}
        >
          Test User Invite
        </Link> */}

      {/* //this view contains group name and image */}
      <View style={{ flexGrow: 1, alignItems: "center" }}>
        <Text style={theme.header}>{group.group_name}</Text>
        {/* <Text>Group ID: {group.id}</Text> */}
        <Image
          source={{
            uri: "https://www.clipartkey.com/mpngs/m/9-93815_daisy-flower-petals-yellow-cartoon-flower-png.png",
          }}
          style={{ width: 200, height: 200, justifyContent: "center" }}
        />
      </View>
      {/* //this view contains search people functionality */}

      <View style={[{ flexGrow: 1 }, theme.horizontalButtonContainer]}>
        <TextInput
          style={theme.loginInput}
          placeholder="Add new friend!"
          onChangeText={(newText) => setNewFriend(newText)}
          defaultValue={newFriend}
        />

        <TouchableOpacity
          style={[theme.button, theme.buttonOutline]}
          onPress={handleSubmitFriend}
        >
          <Text style={theme.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* //this view contains searched friends */}
      {searchedFriends && (
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
      <View>
        <Nav />
      </View>
    </View>
  );
};

export default SingleGroupPage;
