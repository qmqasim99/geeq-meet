import React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  deleteField,
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
} from "firebase/firestore";
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

import { auth, db } from "../firebase";

// const ExitGroup = async (db) => {
//   // const user_id = auth.currentUser.uid;
//   // const docRef = doc(db, "Groups", group_id);

//   // const removeGroup = {
//   //   group_name: item.group_name,
//   //   group_id: item.group_id,
//   //   created_at: timestamp,
//   // };

//   //document reference
//   //unhandleded promise
//   // const groupRef = db.collection("groups").doc("group_id").field("group_name");

//   const groupRef = doc(db, "groups", "group_name");
//   console.log(group_name);

//   // remove the group_name field from the document
//   // const res = groupRef.update({
//   //   group_name: FieldValue.delete(),
//   // });

//   await updateDoc(groupRef, {
//     group_name: deleteField(),
//   });

const ExitGroup = async (group_id) => {
  const groupRef = doc(db, "groups", group_id);
  // console.log(group_id, "line66");

  await updateDoc(groupRef, {
    group_name: deleteField(),
  });

  return (
    <Button onPress={ExitGroup} style={styles.appButtonContainer}>
      <Text>'Exit Group'</Text>
    </Button>
  );
};

export default ExitGroup;
