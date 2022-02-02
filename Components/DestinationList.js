import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { ListItem, Icon } from "react-native-elements";
import { calcMapZoomDelta, findDistanceInM } from "../Utils/utils";
import { ThemeContext, UserContext } from "../Context/Context";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function DestinationList({
  destinationArray,
  setDestination,
  setDestinationSelected,
  setZoomDelta,
  gmMid,
  placeType,
}) {
  const [listLoaded, setListLoaded] = useState(false);
  const theme = useContext(ThemeContext);
  const { currentGroup, setCurrentGroup } = useContext(UserContext);
  useEffect(() => {
    destinationArray.forEach((des) => {
      const distFromCentre = findDistanceInM(
        des.geometry.location.lat,
        des.geometry.location.lng,
        gmMid.lat,
        gmMid.lng
      );
      des.distFromCent = distFromCentre;
      setListLoaded(true);
    });
  }, [destinationArray]);

  const handleSelect = async (des) => {
    setDestination({
      place_id: des.place_id,
      place_name: des.name,
      vicinity: des.vicinity,
      lat: des.geometry.location.lat,
      lng: des.geometry.location.lng,
    });

    //update destination in database
    const docRef = doc(db, "groups", currentGroup.id);
    await updateDoc(docRef, {
      "meets.destination": {
        place_id: des.place_id,
        place_name: des.name,
        vicinity: des.vicinity,
        lat: des.geometry.location.lat,
        lng: des.geometry.location.lng,
      },
    });
    //do the same for all users

    //update destination in context
    const groupDeepCopy = JSON.parse(JSON.stringify(currentGroup));
    groupDeepCopy.meets.destination = {
      place_id: des.place_id,
      place_name: des.name,
      vicinity: des.vicinity,
      lat: des.geometry.location.lat,
      lng: des.geometry.location.lng,
    };
    setCurrentGroup(groupDeepCopy);

    setDestinationSelected(true);
  };

  return (
    <View style={theme.homeContainer}>
      <Text style={theme.header}>{placeType}s between you</Text>
      {listLoaded && (
        <ScrollView>
          {destinationArray.map((des, i) => {
            return (
              <ListItem
                key={i}
                title={des.name}
                onPress={(e) => handleSelect(des)}
                containerStyle={theme.listItemContainer}
              >
                <ListItem.Content>
                  <ListItem.Title style={theme.ratingText}>
                    {des.name}
                  </ListItem.Title>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={theme.ratingText2}>
                      {des.rating}/5 (reviewed {des.user_ratings_total} times)
                    </Text>
                    <Text style={[theme.ratingText2, { textAlign: "right" }]}>
                      {" "}
                      {Math.round(des.distFromCent * 100) / 100}m from central
                      point
                    </Text>
                  </View>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
