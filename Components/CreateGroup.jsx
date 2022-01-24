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
import { db } from '../firebase';

import { useState, useEffect } from 'react';

export default function CreateGroup() {
  const collRef = collection(db, 'groups');

  const [groupName, setGroupName] = useState('');
  const [groupAvatar, setGroupAvatar] = useState('');

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    addDoc(collRef, {
      group_name: groupName,
      avatar: groupAvatar,
      created_at: serverTimestamp(),
      users: [{ name: 'group creator', uid: 11 }],
    });
    console.log('form sumitted');
  };

  return (
    <View style={styles.container}>
      <Text>Books</Text>
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
