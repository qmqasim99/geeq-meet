import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native-web";
import { GOOGLE_API_KEY } from "@env";
import MapRoute from "../Components/MapRoute";
import CustomMarker from "../Components/CustomMarker";
import { FindGeographicMidpoint } from "../Utils/utils";

const MapScreen = ({ userArray, placeType }) => {
  //example props
  userArray = [
    {
      name: "alphie",
      latitude: 55.953251,
      longitude: -3.188267,
      color: "blue",
      img_url: "https://picsum.photos/200",
    },
    {
      name: "betty",
      latitude: 52.60605,
      longitude: -3.285694,
      color: "red",
      img_url: "https://picsum.photos/200",
    },
    {
      name: "cra",
      latitude: 52.812391,
      longitude: -1.415787,
      color: "green",
      img_url: "https://picsum.photos/200",
    },
    {
      name: "dibby",
      latitude: 50.317408,
      longitude: 8.382835,
      color: "purple",
      img_url: "https://picsum.photos/200",
    },
  ];
  placeType = "restaurant";

  const createPlaceSearchUrl = (
    latitude = 51.507341,
    longitude = -0.127758,
    radius = 100,
    type = "restaurant"
  ) => {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${latitude},${longitude}&radius=${radius}`;
    const typeData = `&types=${type}`;
    const apikey = `&key=${GOOGLE_API_KEY}`;
    console.log(apikey);

    return `${baseUrl}${location}${typeData}${apikey}`;
  };

  const [destination, setDestination] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // FindGeographicMidpoint(userArray).then((centroid) => {
    getPlacesFromApi();
    // });
  });

  const getPlacesFromApi = (centroid) => {
    const url = createPlaceSearchUrl(centroid);
    fetch(url).then((res) =>
      res
        .json()
        .then((res) => {
          //   console.log(res);

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
        {loaded &&
          //display routes to destination
          userArray.map((user, i) => {
            return (
              <>
                <MapRoute key={i} user={user} destination_id={destination} />
                <CustomMarker key={user.name} user={user} />
              </>
            );
          })}
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
