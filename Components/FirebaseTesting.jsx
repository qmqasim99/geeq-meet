import { Text, View } from "react-native";
import React, { Component, useState, useEffect } from "react";
import { db } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export default function FirebaseTesting() {
  const collRef = collection(db, "books");

  //   console.log(collRef);

  const gettingDocs = async () => {
    try {
      const fdocs = await getDocs(collRef);

      let books = [];

      fdocs.docs.map((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });
      // console.log("in gettingDocs", books);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    gettingDocs();
  }, []);

  //   const database = () => {
  //     const [books, setBooks] = useState([]);
  //   };

  return (
    <View>
      <Text>TESTING</Text>
    </View>
  );
}
