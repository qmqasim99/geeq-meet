import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { ListItem, Icon } from "react-native-elements";
import { calcMapZoomDelta, findDistanceInM } from "../Utils/utils";
import { ThemeContext } from "../Context/Context";

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
  useEffect(() => {
    console.log("reload destination array");
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

  const handleSelect = (des) => {
    setDestination({
      place_id: des.place_id,
      place_name: des.name,
      vicinity: des.vicinity,
      lat: des.geometry.location.lat,
      lng: des.geometry.location.lng,
    });

    setDestinationSelected(true);
  };

  return (
    <View style={theme.homeContainer}>
      <Text style={theme.header}>{placeType}'s between you</Text>
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
                  <ListItem.Title style={theme.header4}>
                    {des.name}
                  </ListItem.Title>
                  <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>
                      {des.rating}/5 (reviewed {des.user_ratings_total} times)
                    </Text>
                    <Text>
                      {" "}
                      {Math.round(des.distFromCent)}m from central point
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

// <Provider>
//       <View
//         style={{
//           paddingTop: 50,
//           flexDirection: "row",
//           justifyContent: "center",
//         }}
//       >
//         <Menu
//           visible={visible}
//           onDismiss={closeMenu}
//           anchor={<Button onPress={openMenu}>Show menu</Button>}
//         >
//           {" "}
//           <Menu.Item onPress={() => {}} title="Item 1" />
//           <Menu.Item onPress={() => {}} title="Item 2" />
//           <Divider />
//           <Menu.Item onPress={() => {}} title="Item 3" />
//         </Menu>
//       </View>
//     </Provider>
