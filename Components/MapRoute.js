import { View, Text } from "react-native";
import React from "react";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "@env";

export default function MapRoute({ user, destination_id }) {
  return (
    <MapViewDirections
      origin={`${user.lat},${user.lng}`}
      destination={`place_id:${destination_id}`}
      apikey={GOOGLE_API_KEY}
      strokeWidth={3}
      strokeColor={user.colour}
      mode={"TRANSIT"}
      onReady={(result) => {
        // console.log(Object.keys(result)); get route duration here
      }}
    />
  );
}
