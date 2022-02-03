import { useContext } from 'react';
// import { StyleSheet } from "react-native";
// import { useState, useEffect, useCallback } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import { doc, updateDoc, query, orderBy, onSnapshot } from "firebase/firestore";
// import { auth, db } from "../firebase";
import { UserContext } from '../Context/Context';

import React from 'react';
import { StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';

import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

//useState
const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const { currentGroup } = useContext(UserContext);
  const currentGroupId = currentGroup.id; //'Holiday Fun';
  console.log('current group in chat ', currentGroupId);
  useEffect(() => {
    const docRef = doc(db, 'groupChats', currentGroupId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      // console.log('>>>>>>', doc.data());
      // this should save the messages in order in state
      console.log('in chat docs ');

      // TODO create a for loop to put messages into a new array and sort it createdAt

      const tempMessages = doc.data().messages;
      // sort by value
      tempMessages.sort((a, b) => {
        console.log('a.createAt - b.createAt', a.createdAt, b.createdAt);
        // return a.createdAt - b.createdAt;
        return b.createdAt - a.createdAt;
      });
      setMessages(tempMessages);
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    console.log('message ', messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];

    console.log('messages[0] has ', _id, createdAt, text, user);

    let timestamp = Timestamp.now();

    const addChatText = {
      _id: _id,
      // createdAt: timestamp,
      createdAt: Date.parse(createdAt), //createdAt,

      //createdAt: new Date(createdAt),
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
      renderBubble={(props) => {
        // let username = props.currentMessage.user.name;
        // let color = this.getColor(username);

        return (
          <Bubble
            {...props}
            textStyle={{
              right: {
                color: 'white',
              },
            }}
            wrapperStyle={{
              left: {
                backgroundColor: 'lightgreen',
              },
            }}
          />
        );
      }}
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
