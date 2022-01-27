import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native-web";
import { GOOGLE_API_KEY } from "@env";
import MapRoute from "../Components/MapRoute";
import CustomMarker from "../Components/CustomMarker";
import { createPlaceSearchUrl, FindGeographicMidpoint } from "../Utils/utils";

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

  const [destination, setDestination] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [gmMid, setGmMid] = useState({});

  useEffect(() => {
    const gmMid = FindGeographicMidpoint(userArray);
    setGmMid(gmMid);
  }, []);

  const getPlacesFromApi = (gmMid) => {
    const url = createPlaceSearchUrl(gmMid.lat, gmMid.lng);
    fetch(url).then((res) =>
      res
        .json()
        .then((res) => {
          console.log(res.results[0]);
          setDestination({
            place_id: res.results[0].place_id,
            place_name: res.results[0].name,
            lat: res.results[0].geometry.location.lat,
            lng: res.results[0].geometry.location.lng,
          });
          console.log("destination", destination);
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
          console.log("MAP READY", gmMid);
          getPlacesFromApi(gmMid);
        }}
      >
        {loaded &&
          //display routes to destination
          userArray.map((user, i) => {
            return (
              <>
                <Marker
                  //   draggable
                  key={destination.name}
                  coordinate={{
                    latitude: destination.lat,
                    longitude: destination.lng,
                  }}
                  title={destination.place_name}
                  //   onDragEnd={(e) =>
                  //     setDestination((prev) => {
                  //       return {
                  //         place_id: prev.place_id,
                  //         place_name: prev.place_name,
                  //         lat: e.nativeEvent.coordinate.latitude,
                  //         lng: e.nativeEvent.coordinate.longditude,
                  //       };
                  //     })
                  //   }
                />
                <MapRoute
                  key={i}
                  user={user}
                  destination_id={destination.place_id}
                />
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
