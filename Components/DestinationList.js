import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Icon } from "react-native-elements";
import { calcMapZoomDelta } from "../Utils/utils";

export default function DestinationList({
  destinationArray,
  setDestination,
  setDestinationSelected,
  setZoomDelta,
}) {
  //   useEffect(() => {}, [destinationArray]);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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
    <View>
      {destinationArray.map((des, i) => {
        return (
          <ListItem key={i} title={des.name} onPress={(e) => handleSelect(des)}>
            <ListItem.Content>
              <ListItem.Title>{des.name}</ListItem.Title>
              <View style={styles.subtitleView}>
                <Text style={styles.ratingText}>
                  {des.rating}/5 (reviewed {des.user_ratings_total} times)
                </Text>
                <Text> XXm from central point</Text>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
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
