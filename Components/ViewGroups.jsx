import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  setDoc,
  query,
  where,
  collectionGroup,
  document,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

import { useState, useEffect } from 'react';

export default function ViewGroups() {
  const [groups, setGroups] = useState([]);
  const collRef = collection(db, 'groups');

  const gettingDocs = async () => {
    try {
      const fdocs = await getDocs(collRef);

      let groups = [];

      fdocs.docs.map((doc) => {
        groups.push({ id: doc.id, ...doc.data() });
      });
      console.log('in gettingDocs', groups);
      setGroups(groups);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    gettingDocs();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Groups: Current user: {auth.currentUser.email}</Text>
      {groups.map((group) => {
        return (
          <>
            <Text key={group.id}>Group name: {group.group_name}</Text>
            <Text key={group.users.length}>
              This group has {group.users.length} users:
              {group.users.map((user) => {
                return <Text>{user.name}</Text>;
              })}
            </Text>
          </>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
