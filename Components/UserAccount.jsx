import { useEffect, useState } from "react";
import { Text, TextInput, View, Image, StyleSheet, Button } from "react-native";
import { auth, db } from "../firebase";
import { updateEmail, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
//To be careful when contacting database, user object occurs twice, once in authentication (can this be updated?) and once in Firestore database

const UserAccount = () => {
  const [uid, setUid] = useState(auth.currentUser.uid);
  const [user, setUser] = useState({
    uid: auth.currentUser.uid,
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
    phoneNumber: auth.currentUser.phoneNumber,
    avatar: auth.currentUser.photoURL,
    transport: "car",
  });

  useEffect(() => {
    //something not working here with this function
    const userRef = doc(db, "users", uid);
    const userInfo = getDoc(userRef)
      .then((res) => console.log("YA TING", res.data()))
      .catch((err) => console.log("bad ting:", err));
  }, []);

  const handleSubmit = () => {
    const emailUpdate = updateEmail(auth.currentUser, user.email);

    const profileUpdate = updateProfile(auth.currentUser, {
      displayName: user.name,
      photoURL: user.avatar,
    });
    //this needs to be change to actually amend db
    const dbUpdate = updateDoc(doc(db, "users", user.uid), { _UPDATE });

    return Promise.all([emailUpdate, profileUpdate, dbUpdate])
      .then(() => {
        alert("Details Successfully Updated");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Email</Text>
      <TextInput
        value={user.email}
        style={styles.input}
        onChangeText={(text) => {
          setUser((prevUser) => {
            return { ...prevUser, email: text };
          });
        }}
      />

      <Text style={styles.heading}>User Name</Text>
      <TextInput
        value={user.name}
        placeholder={"Update Me!"}
        style={styles.input}
        onChangeText={(text) => {
          setUser((prevUser) => {
            return { ...prevUser, name: text };
          });
        }}
      />

      <Text style={styles.heading}>Avatar</Text>
      {user.avatar ? (
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      ) : (
        <Text>No Avatar Currently</Text>
      )}
      <TextInput
        value={user.avatar}
        placeholder={"Update Me!"}
        onChangeText={(text) => {
          setUser((prevUser) => {
            return { ...prevUser, avatar: text };
          });
        }}
        style={styles.input}
      />
      <Text style={styles.heading}>Default Transport</Text>
      {/* This will be a dropdown eventually */}
      <TextInput
        placeholder={"Update Me!"}
        value={user.transport}
        onChangeText={(text) => {
          setUser((prevUser) => {
            return { ...prevUser, transport: text };
          });
        }}
        style={styles.input}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#323B57",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textDecorationColor: "#676766",
    fontFamily: "monospace",
  },
  heading: {
    fontSize: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    fontSize: 18,
    minWidth: "80%",
    flexWrap: "wrap",
  },
  avatar: {
    height: 100,
    width: 100,
  },
});
