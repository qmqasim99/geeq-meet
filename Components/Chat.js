import { useContext } from "react";
// import { StyleSheet } from "react-native";
// import { useState, useEffect, useCallback } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import { doc, updateDoc, query, orderBy, onSnapshot } from "firebase/firestore";
// import { auth, db } from "../firebase";
import { UserContext } from "../Context/Context";

import React from "react";
import { StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";

import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

//useState
const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const { currentGroup } = useContext(UserContext);

  useEffect(() => {
    const docRef = doc(db, "groupChats", "8DSdX5SWEYmvh8Zrxn6b");
    // console.log("q", docRef);
    // const q = query(docRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(docRef, (doc) => {
      console.log(">>>>>>", doc.data());
      // this should save the messages in order in state
      // setMessages(doc.data());
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    updateDoc(doc(db, "groupChats", currentGroup.id), {
      _id: { createdAt, text, user },
    });
    console.log("message has been sent!");
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
      }}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({});
