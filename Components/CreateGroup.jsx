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
  setDoc,
  query,
  where,
  collectionGroup,
  document,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

import { useState, useEffect } from 'react';
import GlobalCSS from '../GlobalCSS';
import { ScrollView } from 'react-native-web';
import ViewGroups from './ViewGroups';

export default function CreateGroup() {
  const navigation = useNavigation();
  const collRef = collection(db, 'groups');
  const [user, setUser] = useState({});
  const docRef = doc(db, 'users', auth.currentUser.uid);

  const [groupName, setGroupName] = useState('');
  const [groupAvatar, setGroupAvatar] = useState('');

  // get a single user
  const getUser = async () => {
    const udocs = await getDoc(docRef);
    setUser({ uid: udocs.id, ...udocs.data() });

    // console.log(' getSingleDoc ', gdocs.id, gdocs.data());
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    addDoc(collRef, {
      group_name: groupName,
      avatar: groupAvatar,
      created_at: serverTimestamp(),
      users: [{ name: user.name, uid: auth.currentUser.uid }],
    });
    console.log('form sumitted');
    // navigation.replace('Group');
  };

  return (
    <ScrollView>
      <View style={GlobalCSS.container}>
        <Text>Create a new group</Text>
        <StatusBar style="auto" />

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
    </ScrollView>
  );
}
