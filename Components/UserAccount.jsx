import { useEffect, useState, useContext } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../firebase";
import { updateEmail, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { fetchUser } from "../Utils/APIutils";
import { ThemeContext } from "../Context/Context";

const UserAccount = ({ route }) => {
  const theme = useContext(ThemeContext);
  const { user_id } = route.params;
  const [user, setUser] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const data = fetchUser(user_id);
    data
      .then((res) => {
        setUser({
          email: res.email,
          name: res.name,
          avatar: res.avatar,
          transport: res.transport,
        });
      })
      .catch((err) => alert(err));

    if (auth.currentUser.uid === user_id) {
      setIsEditable(true);
    }
  }, []);

  const handleSubmit = () => {
    const emailUpdate = updateEmail(auth.currentUser, user.email);

    const profileUpdate = updateProfile(auth.currentUser, {
      displayName: user.name,
      photoURL: user.avatar,
    });

    const dbUpdate = updateDoc(doc(db, "users", auth.currentUser.uid), {
      email: user.email,
      name: user.name,
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
    <View style={[theme.homeContainer, { alignItems: "center" }]}>
      {isEditable ? (
        <>
          <Text style={theme.header}>My Details</Text>
          <Text style={theme.header2}>Email</Text>
          <TextInput
            value={user.email}
            style={theme.loginInput}
            onChangeText={(text) => {
              setUser((prevUser) => {
                return { ...prevUser, email: text };
              });
            }}
          />
          <Text style={theme.header2}>Name</Text>
          <TextInput
            value={user.name}
            placeholder={"Update Me!"}
            style={theme.loginInput}
            onChangeText={(text) => {
              setUser((prevUser) => {
                return { ...prevUser, userName: text };
              });
            }}
          />
          <Text style={theme.header2}>Avatar</Text>
          {user.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              style={{
                height: 100,
                width: 100,
                margin: 20,
              }}
            />
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
            style={theme.loginInput}
          />
          <Text style={theme.header2}>Default Transport</Text>
          <TextInput
            placeholder={"Update Me!"}
            value={user.transport}
            onChangeText={(text) => {
              setUser((prevUser) => {
                return { ...prevUser, transport: text };
              });
            }}
            style={theme.loginInput}
          />
          <View style={theme.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              style={[theme.button, theme.buttonOutline]}
            >
              <Text style={theme.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={theme.header}>{user.name}'s Profile</Text>

          <Text style={theme.header2}>User Name</Text>
          <Text style={theme.header4}>{user.name}</Text>
          <Text style={theme.header2}>Email</Text>
          <Text style={theme.header4}>{user.email}</Text>
          <View style={{ marginTop: 30 }}>
            <Image
              source={require("../assets/roundweak.png")}
              style={{
                position: "absolute",
                height: 300,
                width: 300,
                top: -50,
                left: -50,
              }}
            />

            <Image
              source={{ uri: user.avatar }}
              style={{
                width: 200,
                height: 200,
                justifyContent: "center",
                borderRadius: 100,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[theme.header2, { marginTop: 30 }]}>
              Default Transport :
            </Text>
            <Text style={[theme.header4, { marginTop: 30 }]}>
              {user.transport}
            </Text>
          </View>
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
