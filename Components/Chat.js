import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";

import { GiftedChat } from "react-native-gifted-chat";
import { doc, updateDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { UserContext } from "../Context/Context";

//useState
const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const { user, currentGroup } = useContext(UserContext);

  useEffect(() => {
    // const collectionRef = collection(db, "chats");
    // const q = query(collectionRef, orderBy("createdAt", "desc"));
    const docRef = doc(db, "groupChats", currentGroup.id);
    const q = query(docRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(query, (doc) => {
      console.log(doc.data());
      //this should save the messages in order in state
      //setMessages(doc.data())
    });

    //   q, (querySnapshot) => {
    //   setMessages(
    //     querySnapshot.docs.map((doc) => ({
    //       _id: doc.data()._id,
    //       createdAt: doc.data().createdAt.toDate(),
    //       text: doc.data().text,
    //       user: doc.data().user,
    //     }))
    //   );
    //   console.log("unsubscribe");
    // });

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
