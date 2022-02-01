import { useNavigation } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Link } from '@react-navigation/native';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
  query,
  where,
  collectionGroup,
  document,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

import { useState, useEffect } from 'react';
import GlobalCSS from '../GlobalCSS';
import { ScrollView } from 'react-native-web';
import ViewGroups from './ViewGroups';

export default function CreateGroup({ navigation }) {
  //const navigation = useNavigation();
  const collRef = collection(db, 'groups');
  const [user, setUser] = useState({});
  const uid = auth.currentUser.uid; //ef83N7qN5beB5oJtm9CgCnW7Ydv1
  console.log('auth ', uid);

  const docRef = doc(db, 'users', uid);

  const [groupName, setGroupName] = useState('');
  const [groupAvatar, setGroupAvatar] = useState(''); // https://freesvg.org/img/group.png

  // get a single user
  const getUser = async () => {
    const udocs = await getDoc(docRef);
    setUser({ uid: udocs.id, ...udocs.data() });

    console.log(' getSingleDoc ', udocs.id, udocs.data());
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (groupName.trim() === '') {
      alert('Please enter new group name');
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
    console.log('new group id: ', newGroupCreated.id);
    const newGroup = {
      group_name: groupName,
      group_id: newGroupCreated.id,
      created_at: timestamp,
    };

    const docRef = doc(db, 'users', uid);
    updateDoc(docRef, { groups: arrayUnion(newGroup) });

    console.log('form sumitted');
  };

  return (
    <>
      <View style={GlobalCSS.container}>
        <Text>Create a new group</Text>

        <View style={{ padding: 10 }}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Group name!"
            onChangeText={(newText) => setGroupName(newText)}
            defaultValue={groupName}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Avatar url"
            onChangeText={(newText) => setGroupAvatar(newText)}
            defaultValue={groupAvatar}
          />

          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
      <Link
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
      </Link>
    </>
  );
}
