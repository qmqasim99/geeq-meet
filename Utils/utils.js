export const FindGeographicMidpoint = (users) => {
  //finds the centroid of given coordinates

  const coordArray = users.map((user) => {
    return {
      lat: user.latitude,
      lng: user.longitude,
      radLat: (user.latitude * Math.PI) / 180,
      radLng: (user.longitude * Math.PI) / 180,
    };
  });

  //convert to cartesian coords
  coordArray.forEach((element) => {
    element.x = Math.cos(element.radLat) * Math.cos(element.radLng);
    element.y = Math.cos(element.radLat) * Math.sin(element.radLng);
    element.z = Math.sin(element.radLat);
    element.weight = 1;
  });

  const totWeight = coordArray.length; //sum weights if we want to weight different locations

  const reducerX = (prev, curr) => prev + curr.x * curr.weight;
  const reducerY = (prev, curr) => prev + curr.y * curr.weight;
  const reducerZ = (prev, curr) => prev + curr.zoom * curr.weight;
  const weightedX = coordArray.reduce(reducerX, 0) / totWeight;
  const weightedY = coordArray.reduce(reducerY, 0) / totWeight;
  const weightedZ = coordArray.reduce(reducerZ, 0) / totWeight;

  //convert to latitude and long

  //   const centroidX = (1/users.lenght) * ();
};
