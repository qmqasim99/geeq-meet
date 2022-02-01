import React from "react";
import { useState, useEffect } from "react";
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

async function ExitGroup(db) {
  // const user_id = auth.currentUser.uid;
  // const docRef = doc(db, "Groups", group_id);

  // const removeGroup = {
  //   group_name: item.group_name,
  //   group_id: item.group_id,
  //   created_at: timestamp,
  // };

  //document reference
  const groupRef = db.collection("groups").doc("group_name");
  console.log(group_name);

  // remove the group_name field from the document
  const res = await groupRef.update({
    group_name: FieldValue.delete(),
  });

  console.log(res);
  return (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text>'Exit Group'</Text>
    </TouchableOpacity>
  );
}

export default ExitGroup;
