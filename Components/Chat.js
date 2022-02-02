import { useContext } from 'react';
// import { StyleSheet } from "react-native";
// import { useState, useEffect, useCallback } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import { doc, updateDoc, query, orderBy, onSnapshot } from "firebase/firestore";
// import { auth, db } from "../firebase";
import { UserContext } from '../Context/Context';

import React from 'react';
import { SegmentedControlIOSComponent, StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';

import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

//useState
const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const { currentGroup } = useContext(UserContext);
  const currentGroupId = 'Holiday Fun'; //currentGroup.id
  console.log('current group in chat ', currentGroupId);
  useEffect(() => {
    
    const docRef = doc(db, 'groupChats', currentGroupId);
    // console.log("q", docRef);
    // const q = query(docRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(docRef, (doc) => {
      // console.log('>>>>>>', doc.data());
      // this should save the messages in order in state
      console.log('in chat docs ');

      // let chats = [];

      // doc.docs.map((temDoc) => {
      //   chats.push({ ...temDoc.data() });
      // });

      //setMessages(chats);

      setMessages(doc.data().messages);
      console.log('in chat docs after setMessage >>> ', doc.data().messages);

    });

    return () => unsubscribe();
  }, []);

  // const onSend = useCallback((messages = []) => {
  //   console.log('message ', messages);
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  //   const { _id, createdAt, text, user } = messages[0];
  //   console.log('message 2', messages);
  //   updateDoc(doc(db, 'groupChats', currentGroupId), {
  //     _id: { createdAt, text, user },
  //   });
  //   console.log('in update doc', updateDoc);
  //   console.log('message has been sent!');
  // }, []);

  const onSend = useCallback(async (messages = []) => {
    console.log('message ', messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];

    console.log('messages[0] has ', _id, createdAt, text, user);

    const addChatText = {
      _id: _id,
      createdAt: createdAt,
      text: text,
      user: user,
    };

    console.log(' addChatText ... ', addChatText);

    const groupRef = doc(db, 'groupChats', currentGroupId);

    // const chatUpdate = async () => {
    //   await updateDoc(groupRef, {
    //     messages: arrayUnion(),
    //   });
    // };

    // return async () => {
    //   console.log('in aync ..');
    //   await chatUpdate();
    // };

    await updateDoc(groupRef, {
      messages: arrayUnion(addChatText),

    });

    console.log('message has been sent!');
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
