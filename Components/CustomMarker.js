import { View, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import { Image, Svg, Defs, ClipPath, Circle } from "react-native-svg";

const CustomMarker = ({ user }) => {
  return (
    <Marker
      coordinate={{
        latitude: user.latitude,
        longitude: user.longitude,
      }}
    >
      <Text>{user.name}</Text>
      <View
        style={{
          flexDirection: "column",
          width: 50,
          height: 50,
          backgroundColor: `${user.color}`,
          borderRadius: "100%",
        }}
      >
        <Svg width={40} height={30}>
          <Defs>
            <ClipPath id="clip">
              <Circle cx="20" cy="20" r="20" />
            </ClipPath>
          </Defs>
          <Image
            href={user.img_url}
            width={40}
            height={40}
            borderRadius="100%"
            clipPath="url(#clip)"
          />
        </Svg>
      </View>
    </Marker>
  );
};

export default CustomMarker;

// {
//   /* <View>
//         style=
//         {{
//           flexDirection: "row",
//           width: 100,
//           height: 30,
//           backgroundColor: "orange",
//         }}
//       </View> */
// }
// {
//   /* </Marker> */
// }
