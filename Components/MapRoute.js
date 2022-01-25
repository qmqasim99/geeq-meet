import { View, Text } from "react-native";
import React from "react";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "@env";

export default function MapRoute({ user, destination_id }) {
  return (
    <MapViewDirections
      origin={`${user.latitude},${user.longitude}`}
      destination={`place_id:${destination_id}`}
      apikey={GOOGLE_API_KEY}
      strokeWidth={3}
      strokeColor={user.color}
    />
  );
}
