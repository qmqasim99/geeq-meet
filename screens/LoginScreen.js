import { useNavigation } from "@react-navigation/core";

import React, { useEffect, useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { ThemeContext, UserContext } from "../Context/Context";

const LoginScreen = () => {
  const theme = useContext(ThemeContext);
  const { setIsSignedIn } = useContext(UserContext);

  const [email, setEmail] = useState("1@example.com");
  const [password, setPassword] = useState("password");
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

  const randColourHex = () => {
    let num = Math.floor(Math.random() * 255);
    let hex = parseInt(num).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  const handleSignUp = () => {
    if (!firstName || !lastName) {
      alert("All fields must be complete for user registration.");
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          setIsSignedIn(true);
          const user = userCredentials.user;
          alert(`Registered with: ${user.email}`);
          updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`,
            photoURL: avatar,
          });
          return setDoc(doc(db, "users", user.uid), {
            email: user.email,
            avatar,
            name: `${firstName} ${lastName}`,
            transport: "car",
            coords,
            colour: `#${randColourHex()}${randColourHex()}${randColourHex()}`,
          });
        })
        .catch((error) => alert(error.message));
    }
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        setIsSignedIn(true);
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
    <View style={theme.inputContainer}>
      <TextInput
        placeholder="Email"
        value={email}
        defaultValue="1@example.com"
        onChangeText={(text) => setEmail(text)}
        style={theme.loginInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        defaultValue="password"
        onChangeText={(text) => setPassword(text)}
        style={theme.loginInput}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={[theme.button, theme.buttonOutline]}
      >
        <Text style={theme.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={back} style={theme.button}>
        <Text style={theme.buttonText}>back</Text>
      </TouchableOpacity>
      <View style={theme.buttonContainerReset}>
        <TouchableOpacity onPress={resetPassword} style={theme.button}>
          <Text style={theme.buttonText}>Forgotten Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RegisterFields = (
    <View style={theme.inputContainer}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={theme.loginInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={theme.loginInput}
        secureTextEntry
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style={theme.loginInput}
        secureTextEntry
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={theme.loginInput}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignUp} style={theme.button}>
        <Text style={theme.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={back} style={theme.button}>
        <Text style={theme.buttonText}>back</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <ImageBackground
        source={require("../assets/bdropweak.png")}
        resizeMode="cover"
        style={{ height: "100%", justifyContent: "center" }}
      >
        <KeyboardAvoidingView
          style={[theme.container, { height: "60%" }]}
          behavior="padding"
        >
          <Image source={require("../assets/gmlogo.png")} style={theme.logo} />
          {loginPressed ? (
            LoginFields
          ) : registerPressed ? (
            RegisterFields
          ) : (
            <View style={theme.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  setLoginPressed(true);
                }}
                style={[theme.button, theme.buttonOutline]}
              >
                <Text style={theme.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRegisterPressed(true);
                }}
                style={[theme.button, theme.buttonOutline]}
              >
                <Text style={theme.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
};

export default LoginScreen;
