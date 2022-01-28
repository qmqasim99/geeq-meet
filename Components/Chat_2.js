import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect, useCallback } from "react";

import { GiftedChat } from "react-native-gifted-chat";
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
} from "firebase/firestore";

//useState
const Chat_2 = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  //This shows which user is chatting (with image) with user.
  //how to add history and connect properly with firestore db?
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "i am now alive!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/200/200/tech",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Chat_2;

const styles = StyleSheet.create({});
