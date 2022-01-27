import { useNavigation } from "@react-navigation/core";

import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { back } from "react-native/Libraries/Animated/Easing";
import HomeScreen from "./HomeScreen";
import { updateProfile } from "firebase/auth";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loginPressed, setLoginPressed] = useState(false);
  const [registerPressed, setRegisterPressed] = useState(false);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [avatar, setAvatar] = useState("https://picsum.photos/200");

  const navigation = useNavigation();

  useEffect(() => {
    fetch("https://api.3geonames.org/?randomland=UK&json=1")
      .then((res) => res.json())
      .then((res) =>
        setCoords({ lat: res.nearest.latt, lng: res.nearest.longt })
      );
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const randColourNum = () => Math.floor(Math.random() * 255);

  const handleSignUp = () => {
    if (!userName || !firstName || !lastName) {
      alert("All fields must be complete for user registration.");
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          alert(`Registered with: ${user.email}`);
          updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: avatar,
          });
          return setDoc(doc(db, "users", user.uid), {
            email: user.email,
            avatar,
            name: `${firstName} ${lastName}`,
            userName,
            transport: "car",
            coords,
            colour: `rgba(${randColourNum()},${randColourNum()},${randColourNum()})`,
          });
        })
        .catch((error) => alert(error.message));
    }
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`Logged in with: ${user.email}`);
      })
      .catch(function () {
        return alert("Incorrect email and/or password. try again");
      });
  };

  const resetPassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => alert("Please enter Email."));
  };

  const back = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  const LoginFields = (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.loginInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.loginInput}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={back} style={styles.button}>
        <Text style={styles.buttonText}>back</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainerReset}>
        <TouchableOpacity onPress={resetPassword} style={styles.button}>
          <Text style={styles.buttonText}>Forgotten Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RegisterFields = (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.loginInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.loginInput}
        secureTextEntry
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style={styles.loginInput}
        secureTextEntry
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={styles.loginInput}
        secureTextEntry
      />
      <TextInput
        placeholder="User Name"
        value={userName}
        onChangeText={(text) => setUserName(text)}
        style={styles.loginInput}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={back} style={styles.button}>
        <Text style={styles.buttonText}>back</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {loginPressed ? (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.loginInput}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.loginInput}
              secureTextEntry
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={back} style={styles.button}>
              <Text style={styles.buttonText}>back</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainerReset}>
              <TouchableOpacity onPress={resetPassword} style={styles.button}>
                <Text style={styles.buttonText}>Forgotten Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : registerPressed ? (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.loginInput}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.loginInput}
              secureTextEntry
            />
            <TextInput
              placeholder="User Name"
              value={bio}
              onChangeText={(text) => setName(text)}
              style={styles.loginInput}
              secureTextEntry
            />
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={back} style={styles.button}>
              <Text style={styles.buttonText}>back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setLoginPressed(true);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRegisterPressed(true);
              }}
              style={[styles.button, styles.buttonOutline]}
            >
              {/* additional fields here but need to find out how to add them to user object, i.e. watch tutorial */}
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "70%",
  },
  loginInput: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonContainerReset: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
