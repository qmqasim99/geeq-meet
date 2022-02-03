import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { ThemeContext, UserContext } from '../Context/Context';
import { Icon } from 'react-native-elements';

const InviteTest = () => {
  const theme = useContext(ThemeContext);
  const { groups, user } = useContext(UserContext);

  // const [user, setUser] = useState({});
  const usersRef = collection(db, 'users');
  const navigation = useNavigation();

  const user_id = auth.currentUser.uid;
  const docRef = doc(db, 'users', user_id);

  // get a single user
  // const getSingleDoc = async () => {
  //   const udocs = await getDoc(docRef);
  //   setUser({ uid: udocs.id, ...udocs.data() });
  // };

  useEffect(() => {
    // getSingleDoc();
  }, [groups, user]);

  // searches for friends by name
  // const handleSubmitFriend = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const q = query(
  //       usersRef,
  //       orderBy("name"),
  //       startAt(newFriend),
  //       endAt(newFriend + "\uf8ff")
  //     );

  //     const udocs = await getDocs(q);

  //     let users = [];

  //     //gets current invites
  //     udocs.docs.map((doc) => {
  //       let invited = false;
  //       const currentInvites = doc.data().invites;
  //       console.log(" invitessss", doc.data());
  //       if (currentInvites) {
  //         currentInvites.map((invite) => {
  //           invite.group_id === group.id ? (invited = true) : (invited = false);
  //           console.log("already invited ", invited);
  //         });
  //       }
  //       //puts current invites in state
  //       users.push({ uid: doc.id, invited, ...doc.data() });
  //     });
  //     setSearchedFriends(users);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const testman = (item) => {
    console.log("HELLO", user.name, user.id);
  };

  const handleAcceptInvite = async (item) => {
    try {
      const newGroup = {
        group_name: item.group_name,
        group_id: item.group_id,
      };

      const docRef = doc(db, 'users', user_id);
      updateDoc(docRef, { groups: arrayUnion(newGroup) });
      updateDoc(docRef, { invites: arrayRemove(item) });

      // add a new user in groups collecition
      const newGroupUser = {
        name: user.name,
        uid: auth.currentUser.uid,
      };
      console.log('before aray union  ..', newGroupUser);
      const docGroupRef = doc(db, 'groups', item.group_id);
      updateDoc(docGroupRef, { users: arrayUnion(newGroupUser) });
      console.log('after aray union  ..');
      // remove from invites

      //first we need to get an invite object from groups >invites > {where invitee_uid === this user id}
      const inviteObject = await getInviteObject(item.group_id);
      console.log('inviteObject ..', inviteObject);
      updateDoc(docGroupRef, { invites: arrayRemove(inviteObject) });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeclineInvite = async (item) => {
    try {
      const newGroup = {
        group_name: item.group_name,
        group_id: item.group_id,
      };

      const docRef = doc(db, 'users', user_id);
      updateDoc(docRef, { invites: arrayRemove(item) });

      // add a new user in groups colleciton
      const newGroupUser = {
        name: user.name,
        uid: user.uid,
      };

      const docGroupRef = doc(db, 'groups', item.group_id);

      // remove from invites

      //first we need to get an invite object from groups >invites > {where invitee_uid === this user id}
      const inviteObject = await getInviteObject(item.group_id);
      updateDoc(docGroupRef, { invites: arrayRemove(inviteObject) });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getInviteObject = async (group_id) => {
    const docGroupRef = doc(db, 'groups', group_id);
    const udocs = await getDoc(docGroupRef);
    const group = { id: udocs.id, ...udocs.data() };
    const getInviteObject = group.invites.filter(
      (invite) => invite.invitee_uid === user_id
    );
    return getInviteObject[0];
  };

  // display current invitee list
  const renderInviteList = ({ item }) => {
    return (
      <View style={[theme.fListArea, theme.inviteCard]}>
        <View style={{ flex: 4 }}>
          <Text style={theme.header4}>Join {item.group_name}?</Text>
          <Text style={theme.header5}>Invited by: {item.invited_by}</Text>
        </View>

        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => handleAcceptInvite(item)}
        >
          <Icon
            reverse
            name="checkmark-circle-outline"
            type="ionicon"
            color={theme.icon.acceptColor}
            size="25"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => handleDeclineInvite(item)}
        >
          <Icon
            reverse
            name="close-circle-outline"
            type="ionicon"
            color={theme.icon.declineColor}
            size="25"
          />
        </TouchableOpacity>
      </View>
    );
  };

  // display current group list
  const renderGroupList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={(ev) => {
          navigation.navigate('Group', { group_id: item.group_id });
        }}
      >
        <View style={theme.fListCard}>
          <Text style={theme.fListText}> {item.group_name}</Text>
          <Text style={theme.fListText2}>({item.users} members)</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View>
        <FlatList
          data={user.invites}
          renderItem={renderInviteList}
          keyExtractor={(item) => item.group_id}
          style={theme.fListArea}
        />
      </View>
      <View
        styles={{ flexDirection: 'row', justifyContent: 'space-between' }}
      ></View>
    </View>
  );
};

export default InviteTest;
