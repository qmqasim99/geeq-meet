import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import { Image, Svg, G, Path, Rect, Text } from "react-native-svg";

/*
//MVP COMPLETE
to-do:
destination info panel on press
user info on press
*/
const CustomMarker = ({ user, type, mapPress }) => {
  const [toggleInfo, setToggleInfo] = useState(false);

  useEffect(() => {
    if (mapPress === "map") {
      setToggleInfo(false);
    }
  }, [mapPress]);

  const handleMarkerPress = (ev) => {
    //currently does nothing - set up to detect type of marker when pressed
    setToggleInfo(true);
    if (type === "user") {
    } else if (type === "destination") {
    }
  };

  return (
    <Marker
      coordinate={{
        latitude: user.lat,
        longitude: user.lng,
      }}
      onPress={(e) => {
        handleMarkerPress(e);
      }}
    >
      {type === "user" ? (
        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: "space-around",
          }}
        >
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91.89 129.73">
            <G data-name="Layer 2">
              <Path
                d="M46 0A45.94 45.94 0 0 0 0 45.94c0 25.38 46 83.79 46 83.79s45.89-58.41 45.89-83.79A45.94 45.94 0 0 0 46 0Zm0 76.88a30.58 30.58 0 1 1 30.52-30.57A30.58 30.58 0 0 1 46 76.88Z"
                style={{
                  fill: user.colour,
                }}
                data-name="Layer 1"
              />
            </G>
            <Text
              x="43"
              y="68"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="80"
              fill={user.colour}
            >
              {user.name.substring(0, 1)}
            </Text>
          </Svg>
        </View>
      ) : (
        <View
          style={{
            width: 150,
            height: 80,
            justifyContent: "space-around",
          }}
        >
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139.03 196.28">
            <Rect
              x={"-120"}
              y={0}
              width={380}
              height={130}
              fill="#e94e1b"
              rx="30"
            />
            <G data-name="Layer 2">
              <Path
                d="M69.52 0A69.51 69.51 0 0 0 0 69.51c0 38.4 69.52 126.77 69.52 126.77S139 107.91 139 69.51A69.51 69.51 0 0 0 69.52 0Zm0 116.32a46.26 46.26 0 1 1 46.26-46.25 46.26 46.26 0 0 1-46.26 46.25Z"
                style={{
                  fill: "#e94e1b",
                }}
                data-name="Layer 1"
              />
            </G>

            <Text
              x={"70"}
              y={"100"}
              textAnchor="middle"
              fontWeight="bold"
              fontSize={"100"}
              fill="white"
            >
              Meet
            </Text>
          </Svg>
        </View>
      )}
    </Marker>
  );
};

export default CustomMarker;
