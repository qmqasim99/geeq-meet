import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapScreen from "../screens/MapScreen";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GOOGLE_API_KEY } from "@env";
import MapRoute from "../Components/MapRoute";
import CustomMarker from "../Components/CustomMarker";
import { UserContext, ThemeContext } from "../Context/Context";
import {
  calcMapZoomDelta,
  createPlaceSearchUrl,
  FindGeographicMidpoint,
} from "../Utils/utils";
import DestinationList from "../Components/DestinationList";
import Nav from "./Nav";
// import { useLoading } from "../hooks/CustomHooks";

export default function MapContainer({ props }) {
  //   const { loadComponent, isLoading, setIsLoading } = useLoading();
  const { currentGroup } = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const [gmMid, setGmMid] = useState({});
  const [destinationArray, setDestinationArray] = useState(null);
  const [destination, setDestination] = useState(null);
  const [placeType, setPlaceType] = useState(null);
  const [listLoaded, setListLoaded] = useState(false);
  const [zoomDelta, setZoomDelta] = useState({ lat: 0.0, lng: 0.0 });
  const [destinationSelected, setDestinationSelected] = useState(null);
  // const [thisMeet, setThisMeet] = useState({});
  const [userArray, setUserArray] = useState({});

  useEffect(() => {
    // userArray = currentGroup.meet.users;
    setPlaceType(currentGroup.meets.placeType);
    setUserArray(currentGroup.meets.users);
    // console.log(currentGroup.meets);
    if (currentGroup.meets.destination) {
      console.log("destinationalready set", currentGroup.meets.destination);
      setDestination(currentGroup.meets.destination);
      setDestinationSelected(true);
    } else {
      console.log(" no destination");
    }

    const gmMid = FindGeographicMidpoint(currentGroup.meets.users);
    // console.log(currentGroup.meet.users);
    setGmMid(gmMid);
    getPlacesFromApi(gmMid);
    if (destination) {
      const test = calcMapZoomDelta(userArray, destination);
      setZoomDelta(test);
    }
  }, [destination, destinationSelected, currentGroup]);

  const getPlacesFromApi = (gmMid) => {
    const url = createPlaceSearchUrl(
      gmMid.lat,
      gmMid.lng,
      currentGroup.meets.placeType
    );
    fetch(url).then((res) =>
      res
        .json()
        .then((res) => {
          setDestinationArray(res.results);
          setListLoaded(true);
        })
        .catch((error) => console.log(error, "line42"))
    );
  };

  return (
    <>
      {!listLoaded ? (
        <Text>LOADING</Text>
      ) : (
        <>
          {!destinationSelected ? (
            <DestinationList
              destinationArray={destinationArray}
              setDestination={setDestination}
              setDestinationSelected={setDestinationSelected}
              setZoomDelta={setZoomDelta}
              gmMid={gmMid}
              placeType={placeType}
            />
          ) : (
            <MapScreen
              userArray={userArray}
              destination={destination}
              zoomDelta={zoomDelta}
              destinationSelected={destinationSelected}
              setDestinationSelected={setDestinationSelected}
            />
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
