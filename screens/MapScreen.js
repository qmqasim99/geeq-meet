import MapViewDirections from "react-native-maps-directions";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import { StyleSheet } from "react-native-web";
import { GOOGLE_API_KEY } from "@env";

const userLocs = [{ latitude: 55.953251, longitude: -3.188267 }];
const MapScreen = () => {
  const createPlaceSearchUrl = (
    latitude = 51.507341,
    longitude = -0.127758,
    radius = 100,
    type = "restaurant"
  ) => {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${latitude},${longitude}&radius=${radius}`;
    const typeData = `&types=${type}`;
    const apikey = `&key=${GOOGLE_API_KEY.substring(
      1,
      GOOGLE_API_KEY.length - 1
    )}`;

    return `${baseUrl}${location}${typeData}${apikey}`;
  };

  useEffect(() => {
    getPlacesFromApi();
  });
  const [destination, setDestination] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const getPlacesFromApi = () => {
    const url = createPlaceSearchUrl();
    fetch(url).then((res) =>
      res
        .json()
        .then((res) => {
          console.log(res.results[0]);

          //console.log(GOOGLE_API_KEY);
          setDestination(res.results[0].place_id);
          console.log(destination);
          setLoaded(true);
        })
        .catch((error) => console.log(error, "line42"))
    );
  };

  return (
    <View style={styles.container}>
      {/*markers go in the mapview tag */}
      <MapView
        style={{ height: "100%", width: "100%" }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onMapReady={(event) => {
          getPlacesFromApi();
        }}
      >
        {loaded && (
          <MapViewDirections
            origin="52.020219,0.212807"
            destination={`place_id:${destination}`}
            apikey={GOOGLE_API_KEY.substring(1, GOOGLE_API_KEY.length - 1)}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
