import {
  StyleSheet,
  Text,
  Picker,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ListItem, Icon, Button } from "react-native-elements";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

import { useNavigation } from "@react-navigation/native";
import { UserContext, ThemeContext } from "../Context/Context";

export default function ConfigureMeet() {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const { currentGroup, setCurrentGroup } = useContext(UserContext);
  const [usersToMeet, setUsersToMeet] = useState(currentGroup.users);
  const [meetSaved, setMeetSaved] = useState(false);

  const [selectedValue, setSelectedValue] = useState("Cafe");
  const meetTypeList = ["Cafe", "Restaurant", "Cinema", "Park", "Pub"];
  let memberAr = [];

  useEffect(() => {
    setUsersToMeet(currentGroup.users);
  }, [currentGroup]);

  useEffect(() => {}, [usersToMeet]);

  const handleExcludeUser = (user) => {
    const newUsersToMeet = usersToMeet.filter((obj) => {
      return obj.name !== user.name;
    });
    setUsersToMeet(newUsersToMeet);
  };

  const handleConfigureMeet = async (item) => {
    console.log("adding meet");

    for await (const user of usersToMeet) {
      // usersToMeet.map(async (user) => {
      const userRef = doc(db, "users", user.uid);
      const userData = await getDoc(userRef);
      const userEntry = userData.data();
      user.lat = Number(userEntry.coords.lat);
      user.lng = Number(userEntry.coords.lng);
      user.colour = userEntry.colour;
    }

    //create meet obj
    const meetObj = {
      // id: Date.now(),
      users: usersToMeet,
      placeType: selectedValue,
      active: true,
    };

    const groupDeepCopy = JSON.parse(JSON.stringify(currentGroup));
    // const newGroupObj = groupDeepCopy.meets.push(meetObj); // bring  this back when you are saving a meets array and have single object working

    //update group and user database
    const docRef = doc(db, "groups", currentGroup.id);
    await updateDoc(docRef, { meets: meetObj });
    console.log("database updated");

    //DO FOR USERS

    //store meet Obj in group Context
    console.log("updating context");

    groupDeepCopy.meets = meetObj;
    setCurrentGroup(groupDeepCopy); // add group to array!!
    //nav to map
    navigation.navigate("MapContainer");
  };

  return (
    <View
      style={[
        theme.homeContainer,
        {
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      <Text style={theme.header}>Configure Meetup</Text>
      <View>
        <Text style={theme.header2}>What kind of Meet?</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
          }}
          itemStyle={theme.picker}
        >
          {meetTypeList.map((type, i) => {
            return <Picker.Item key={i} label={type} value={type} />;
          })}
        </Picker>
      </View>
      <View>
        <Text style={theme.header2}>
          Meeting Members <Text style={theme.header4}>(swipe to exclude)</Text>
        </Text>
        <ScrollView>
          {usersToMeet &&
            usersToMeet.map((user, i) => {
              return (
                <ListItem.Swipeable
                  containerStyle={theme.listItemContainer}
                  key={i}
                  title={user.name}
                  rightContent={
                    <Button
                      title="Exclude"
                      icon={{ name: "delete", color: "white" }}
                      buttonStyle={{
                        minHeight: "97%",
                        backgroundColor: "red",
                        top: 10,
                        right: 2,
                      }}
                      onPress={(e) => {
                        handleExcludeUser(user);
                      }}
                    />
                  }
                >
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text style={[theme.header4, { textAlign: "center" }]}>
                        {user.name}
                      </Text>
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem.Swipeable>
              );
            })}
        </ScrollView>
      </View>
      <View style={[theme.letsMeetButton, theme.buttonContainer]}>
        <TouchableOpacity
          onPress={(e) => {
            handleConfigureMeet();
          }}
          style={[theme.button, theme.buttonOutline]}
        >
          <Text style={theme.buttonText}>Let's Meet!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
