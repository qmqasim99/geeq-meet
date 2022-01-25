// import MapViewDirections from "react-native-maps-directions";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import { useEffect, useState } from "react";
// import { Text, View } from "react-native";

// import { NavigationContainer } from "@react-navigation/native";
// import MapScreen from "./screens/MapScreen";
// import React from "react";
// import { StyleSheet } from "react-native-web";
// const userLocs = [{ latitude: 52.123, longitude: 0.021 }];
// //import { GOOGLE_API_KEY } from "@env";

// const [place, setPlace] = useState(false);
// const [destination, setDestination] = useState(null);

// const getRegionUrl = (
//   latitude = 42.362104,
//   longitude = 74.12367,
//   radius = 100,
//   type = "unknown"
// ) => {
//   const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
//   const location = `location=${latitude},${longitude}&radius=${radius}`;
//   const typeData = `&types=${type}`;
//   //const api = GOOGLE_API_KEY;
//   return `${baseUrl}${location}${typeData}${api}`;
// };

// const getRegion = () => {
//   const url = getRegionUrl();
//   fetch(url)
//     .then((res) => res.json())
//     .then((res) => {
//       setDestination(res.results[0].place_id);
//       setPlace(true);
//     });

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <View style={styles.container}>
//           <MapView
//             style={{ height: "70%", width: "70%" }}
//             provider={PROVIDER_GOOGLE}
//             showsUserLocation={true}
//             onMapReady={(event) => {
//               getPlaces();
//             }}
//           >
//             {place && (
//               <MapViewDirections
//                 origin="51.507351,-0.127758"
//                 destination={`place_id:${destination}`}
//                 API_key={api}
//                 strokeWidth={3}
//                 strokeColor="blue"
//               />
//             )}
//           </MapView>
//         </View>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
