import { useState } from "react";
import { Text, TextInput, View, Image, StyleSheet } from "react-native";
import { auth } from "../firebase";

//To be careful when contacting database, user object occurs twice, once in authentication (can this be updated?) and once in Firestore database

const UserAccount = () => {
  const [user, setUser] = useState({
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
    phoneNumber: auth.currentUser.phoneNumber,
    avatar: auth.currentUser.photoURL,
    transport: "car", //would have to get transport method from database here
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Email</Text>
      <TextInput value={"this will be your emails"} style={styles.input} />
      {/* is it possible to update original user object used for identification, i.e. email address */}
      <Text style={styles.heading}>Name</Text>
      <TextInput
        value={user.name}
        onChangeText={(text) => {
          setUser((prevUser) => {
            return { ...prevUser, name: text };
          });
        }}
        styles={styles.input}
      />

      <Text style={styles.heading}>Avatar</Text>
      <Image src={user.avatar} />
      <TextInput
        value={user.avatar}
        onChangeText={(text) => {
          setUser((prevUser) => {
            return { ...prevUser, avatar: text };
          });
        }}
        style={styles.input}
      />
      <Text style={styles.heading}>Default Transport</Text>
      <TextInput
        value={user.transport}
        onChangeText={(text) => {
          setUser((prevUser) => {
            return { ...prevUser, transport: text };
          });
        }}
        style={styles.input}
      />
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
  },
});
