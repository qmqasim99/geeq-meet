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
    const docRef = doc(db, "groupChats", currentGroup.group_name);
    // console.log("q", docRef);
    // const q = query(docRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(docRef, (doc) => {
      console.log(">>>>>>", doc.data());
      // this should save the messages in order in state
      setMessages(doc.data().messages);
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    const messageToSend = {};
    messages.push({ createdAt, text, user });
    // var tempObj = {createdAt, text, user}
    //     {[tempObj]}.value = _id;

    const test = {};
    test[`${_id}`] = { createdAt, text, user };
    updateDoc(doc(db, "groupChats", currentGroup.group_name), {
      messages,
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
