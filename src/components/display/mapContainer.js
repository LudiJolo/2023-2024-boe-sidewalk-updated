import React from "react";
import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

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
  const convertCoordinates = (coordinate) => {
    if (coordinate.lat && coordinate.lng) {
      const latString = coordinate.lat.toString();
      const longString = coordinate.lng.toString();
      const latitude =
        parseFloat(latString.slice(0, 2)) + parseFloat(latString.slice(2)) / 60;
      const longitude = -(
        parseFloat(longString.slice(0, 3)) +
        parseFloat(longString.slice(3)) / 60
      );
      return { lat: latitude, lng: longitude };
    }
  };
  useEffect(() => {
    let pointsArray = [];
    for (var i = 1; i < props.sidewalkData.length - 1; i++) {
      const coordinate = convertCoordinates({
        lat: props.sidewalkData[i][10],
        lng: props.sidewalkData[i][12],
      });
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
    >
      {points &&
        points.length > 0 &&
        points.map((coordinate) => (
          <Marker position={{ lat: coordinate.lat, lng: coordinate.lng }} />
        ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapContainer);
