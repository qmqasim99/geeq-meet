import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
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
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

const InviteTest = ({ navigation }) => {
  const [user, setUser] = useState({});
  const usersRef = collection(db, 'users');
  //const user_id = 'K5XmEen38Qx4LcTbY3nS';
  const user_id = 'ef83N7qN5beB5oJtm9CgCnW7Ydv1';
  const docRef = doc(db, 'users', user_id);

  // get a single user
  const getSingleDoc = async () => {
    const udocs = await getDoc(docRef);
    setUser({ uid: udocs.id, ...udocs.data() });

    // console.log(' getSingleDoc ', gdocs.id, gdocs.data());
  };

  useEffect(() => {
    getSingleDoc();
    console.log('single group : ', user);
    getInviteObject();
  }, []);

  // searches for friends by name
  const handleSubmitFriend = async (e) => {
    e.preventDefault();

    try {
      const q = query(
        usersRef,
        orderBy('name'),
        startAt(newFriend),
        endAt(newFriend + '\uf8ff')
        // where('name', '==', newFriend)
        //,
        //orderBy('name')
      );

      const udocs = await getDocs(q);

      let users = [];

      udocs.docs.map((doc) => {
        let invited = false;
        const currentInvites = doc.data().invites;
        console.log(' invitessss', doc.data());
        if (currentInvites) {
          currentInvites.map((invite) => {
            invite.group_id === group.id ? (invited = true) : (invited = false);
            console.log('already invited ', invited);
          });
        }
        users.push({ uid: doc.id, invited, ...doc.data() });
      });
      console.log('in gettingDocs', users);
      setSearchedFriends(users);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmitInvite = async (item) => {
    try {
      console.log('item ', item);

      let timestamp = Timestamp.now();

      // add a new group for this user
      const newGroup = {
        group_name: item.group_name,
        group_id: item.group_id,
        created_at: timestamp,
      };

      const docRef = doc(db, 'users', user_id);
      updateDoc(docRef, { groups: arrayUnion(newGroup) });

      // remove from invites
      updateDoc(docRef, { invites: arrayRemove(item) });

      // add a new user in groups colleciton
      const newGroupUser = {
        name: user.name,
        uid: user.uid,
        created_at: timestamp,
      };

      const docGroupRef = doc(db, 'groups', item.group_id);
      updateDoc(docGroupRef, { users: arrayUnion(newGroupUser) });

      // remove from invites

      //first we need to get an invite object from groups >invites > {where invitee_uid === this user id}
      const inviteObject = await getInviteObject(item.group_id);
      console.log('getInviteObject ', inviteObject);

      updateDoc(docGroupRef, { invites: arrayRemove(inviteObject[0]) });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getInviteObject = async (group_id) => {
    console.log('in test group ');
    const docGroupRef = doc(db, 'groups', group_id);

    const udocs = await getDoc(docGroupRef);
    const group = { id: udocs.id, ...udocs.data() };

    console.log('docGroupRef id', group);

    const getInviteObject = group.invites.filter(
      (invite) => invite.invitee_uid === user_id
    );

    return getInviteObject;
  };

  // display current invitee list
  const renderInviteList = ({ item }) => {
    return (
      <View>
        <Text>Group name: {item.group_name}</Text>
        <Text>Invited by: {item.invited_by}</Text>
        <Button title="Accept" onPress={() => handleSubmitInvite(item)} />
      </View>
    );
  };

  // display current group list
  const renderGroupList = ({ item }) => {
    return (
      <View>
        <Text>Group name: {item.group_name}</Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View
        style={{
          padding: 50,
          flex: 1,
          justifyContent: 'center',
          marginHorizontal: 16,
        }}
      >
        <Text>Current invites:</Text>
        <FlatList
          data={user.invites}
          renderItem={renderInviteList}
          keyExtractor={(item) => item.group_id}
        />
      </View>

      <View
        style={{
          padding: 50,
          flex: 1,
          justifyContent: 'center',
          marginHorizontal: 16,
        }}
      >
        <Text>Current groups:</Text>
        <FlatList
          data={user.groups}
          renderItem={renderGroupList}
          keyExtractor={(item) => item.group_id}
        />
      </View>

      <View styles={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="Chat"
          onPress={() => {
            navigation.navigate('Chat');
          }}
        />
        <Button
          title="Meet"
          onPress={() => {
            console.log('Meet Pressed');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default InviteTest;