import { GOOGLE_API_KEY } from "@env";

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
  const reducerZ = (prev, curr) => prev + curr.z * curr.weight;
  const weightedX = coordArray.reduce(reducerX, 0) / totWeight;
  const weightedY = coordArray.reduce(reducerY, 0) / totWeight;
  const weightedZ = coordArray.reduce(reducerZ, 0) / totWeight;

  //convert to latitude and long

  const midLonRad = Math.atan2(weightedY, weightedX);
  const hyp = Math.sqrt(weightedX * weightedX + weightedY * weightedY);
  const midLatRad = Math.atan2(weightedZ, hyp);

  //convert to degrees
  const gmlat = (midLatRad * 180) / Math.PI;
  const gmlng = (midLonRad * 180) / Math.PI;
  return { lat: gmlat, lng: gmlng };
};

export const createPlaceSearchUrl = (
  latitude,
  longitude,
  radius = 10000,
  type = "restaurant"
) => {
  const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
  const location = `location=${latitude},${longitude}&radius=${radius}`;
  const typeData = `&types=${type}`;
  const apikey = `&key=${GOOGLE_API_KEY}`;
  console.log(`${baseUrl}${location}${typeData}${apikey}`);
  return `${baseUrl}${location}${typeData}${apikey}`;
};
