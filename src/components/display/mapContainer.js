import React from "react";
import { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const customIcon = {
 path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
 fillColor: '#64be67', // Change this to your desired color
 fillOpacity: 1,
 scale: 0.05, // Adjust this to change the size of the icon
};

function MapContainer(props) {
  /*LOADING COMPONENT SUCH AS API KEY*/
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAK2aK-t6oUkV3V9nNAbceldTGbxI1AcEM",
  });
  /**********************************/

  /*************useStates and helper methods*********************/
  const [points, setPoints] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    let pointsArray = [];
    for (var i = 1; i < props.sidewalkData.length - 1; i++) {
      const coordinate = {
        lat: props.sidewalkData[i][3],
        lng: props.sidewalkData[i][4],
      };
      pointsArray.push(coordinate);
    }
    setPoints(pointsArray);
    setCenter(pointsArray[0]);
  }, []);
  /**********************************/

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center} // You might want to dynamically set this based on your data
      zoom={21}
      options={{
        mapTypeId: "satellite", // Set the map type to satellite
      }}
    >
      {points &&
        points.length > 0 &&
        points.map((coordinate) => (
          <Marker position={{ lat: coordinate.lat, lng: coordinate.lng }} 
          icon="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"/>
        ))}
      <Polyline
        path={points.map((point) => ({ lat: point.lat, lng: point.lng }))}
        options={{
          strokeColor: "#0000FF",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapContainer);
