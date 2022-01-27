import { useEffect, useState } from "react";
import { Text, TextInput, View, Image, StyleSheet, Button } from "react-native";
import { auth, db } from "../firebase";
import { updateEmail, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
//To be careful when contacting database, user object occurs twice, once in authentication (can this be updated?) and once in Firestore database

const UserAccount = () => {
  const [uid, setUid] = useState(auth.currentUser.uid);
  const [user, setUser] = useState({});

  //need to make logic so it only editable if you are on your own page
  //pass in uid for user and if uid matches then edit fields appear & submit button enabled

  const fetchUser = async () => {
    const userRef = doc(db, "users", uid);
    const userInfo = await getDoc(userRef);
    return userInfo.data();
  };

  useEffect(() => {
    const data = fetchUser();
    data
      .then((res) => {
        setUser({
          email: res.email,
          name: res.name,
          userName: res.userName,
          avatar: res.avatar,
          transport: res.transport,
        });
      })
      .catch((err) => alert(err));
  }, []);

  const handleSubmit = () => {
    const emailUpdate = updateEmail(auth.currentUser, user.email);

    const profileUpdate = updateProfile(auth.currentUser, {
      displayName: user.name,
      photoURL: user.avatar,
    });

    const dbUpdate = updateDoc(doc(db, "users", uid), {
      email: user.email,
      userName: user.userName,
      avatar: user.avatar,
      transport: user.transport,
    });

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
        value={user.userName}
        placeholder={"Update Me!"}
        style={styles.input}
        onChangeText={(text) => {
          setUser((prevUser) => {
            return { ...prevUser, userName: text };
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
