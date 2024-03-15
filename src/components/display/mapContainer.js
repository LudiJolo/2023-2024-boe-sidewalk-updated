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
        lat: props.sidewalkData[i][1],
        lng: props.sidewalkData[i][2],
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
          <Marker position={{ lat: coordinate.lat, lng: coordinate.lng }} />
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
