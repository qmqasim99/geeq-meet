import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Icon } from "react-native-elements";
import { calcMapZoomDelta, findDistanceInM } from "../Utils/utils";

export default function DestinationList({
  destinationArray,
  setDestination,
  setDestinationSelected,
  setZoomDelta,
  gmMid,
}) {
  const [listLoaded, setListLoaded] = useState(false);
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
  }, []);

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
    listLoaded && (
      <ScrollView>
        {destinationArray.map((des, i) => {
          return (
            <ListItem
              key={i}
              title={des.name}
              onPress={(e) => handleSelect(des)}
            >
              <ListItem.Content>
                <ListItem.Title>{des.name}</ListItem.Title>
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
    )
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
