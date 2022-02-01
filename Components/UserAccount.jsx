import { useEffect, useState } from "react";
import { Text, TextInput, View, Image, StyleSheet, Button } from "react-native";
import { auth, db } from "../firebase";
import { updateEmail, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const UserAccount = ({ route }) => {
  const { user_id } = route.params;
  const [authUid, setAuthUid] = useState(auth.currentUser.uid);
  const [user, setUser] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  //need to make logic so it only editable if you are on your own page
  //pass in uid for user and if uid matches then edit fields appear & submit button enabled

  const fetchUser = async () => {
    const userRef = doc(db, "users", user_id);
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

    if (authUid === user_id) {
      setIsEditable(true);
    }
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
      {isEditable ? (
        <>
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
          <Button title="Submit" onPress={handleSubmit} />{" "}
        </>
      ) : (
        <>
          <Text style={styles.heading}>User Name</Text>
          <Text style={styles.heading}>{user.userName}</Text>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.heading}>Default Transport</Text>
          <Text style={styles.heading}>{user.transport}</Text>
        </>
      )}
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
  displayText: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    fontSize: 18,
    minWidth: "80%",
    flexWrap: "wrap",
  },
  avatar: {
    height: 100,
    width: 100,
  },
});
