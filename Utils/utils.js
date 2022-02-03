import { GOOGLE_API_KEY } from "@env";

export const FindGeographicMidpoint = (users) => {
  //finds the centroid of given coordinates
  const coordArray = users.map((user) => {
    return {
      lat: user.lat,
      lng: user.lng,
      radLat: (user.lat * Math.PI) / 180,
      radLng: (user.lng * Math.PI) / 180,
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
  type = "cafe",
  radius = 10000
) => {
  const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
  const location = `location=${latitude},${longitude}&radius=${radius}`;
  const typeData = `&types=${type.toLowerCase()}`;
  const apikey = `&key=${GOOGLE_API_KEY}`;
  return `${baseUrl}${location}${typeData}${apikey}`;
};

export const findDistanceInM = (lat1, lon1, lat2, lon2) => {
  //implementation of haversine formula copied from https://www.movable-type.co.uk/scripts/latlong.html

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return d;
};

export const calcMapZoomDelta = (userArray, destination) => {
  let furthestLat = 0;
  let furthestLng = 0;
  //find furthest user from destination
  for (let i = 0; i < userArray.length; i++) {
    if (furthestLat < Math.abs(destination.lat - userArray[i].lat)) {
      furthestLat = Math.abs(destination.lat - userArray[i].lat);
    }
  }
  for (let i = 0; i < userArray.length; i++) {
    if (furthestLng < Math.abs(destination.lng - userArray[i].lng)) {
      furthestLng = Math.abs(destination.lng - userArray[i].lng);
    }
  }

  //double distance
  furthestLat = furthestLat * 2;
  furthestLng = furthestLng * 2;

  //add buffer
  furthestLat = furthestLat * 1.3;
  furthestLng = furthestLng * 1.3;

  return { lat: furthestLat, lng: furthestLng };
};
