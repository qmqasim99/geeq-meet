import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native-web";
import { GOOGLE_API_KEY } from "@env";
import MapRoute from "../Components/MapRoute";
import CustomMarker from "../Components/CustomMarker";

const MapScreen = ({ userArray, destination, zoomDelta }) => {
  const [loaded, setLoaded] = useState(false);
  const [pressType, setPressType] = useState(false);

  useEffect(() => {}, [zoomDelta]);

  const handleMapLoad = (e) => {
    setLoaded(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ height: "100%", width: "100%" }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onMapReady={(event) => {
          handleMapLoad(event);
        }}
        initialRegion={{
          latitude: destination.lat,
          longitude: destination.lng,
          latitudeDelta: zoomDelta.lat,
          longitudeDelta: zoomDelta.lng,
        }}
        onPress={(e) => {
          console.log("press", e.nativeEvent.action);
          if (e.nativeEvent.action === "marker-press") {
            // pressed a marker
            setPressType("marker");
          } else {
            // pressed the map
            setPressType("map");
          }
        }}
      >
        {loaded && (
          <>
            <CustomMarker
              user={destination}
              type={"destination"}
              mapPress={pressType}
            />
            {userArray.map((user, i) => {
              //display routes to destination
              return (
                <React.Fragment key={`Fragment${i}`}>
                  <MapRoute
                    key={`Route${i}`}
                    user={user}
                    destination_id={destination.place_id}
                  />
                  <CustomMarker key={user.name} user={user} type={"user"} />
                </React.Fragment>
              );
            })}
          </>
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
