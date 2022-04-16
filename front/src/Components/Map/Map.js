import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import pinImg from "./pin.png";

function MapComponent() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 44.442110316543896,
    longitude: 26.097182594212356,
    zoom: 13,
  });

  console.log(locationData);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "http://localhost:5050/display_posts_lost"
      );
      setLocationData(result.data);
    }
    fetchData();
  }, []);

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiYW5kcmVpc3RhbGtlciIsImEiOiJjbDIxenZrb3AwNjd3M2Vvb2FsNTRqeGdxIn0.GE5KJr0GieZCFW01upHwrA"
      initialViewState={viewport}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{ width: "100%", height: "100vh" }}
    >
      {locationData.map((pet) => (
        <Marker
          latitude={pet.lan}
          longitude={pet.lng}
          key={pet._id}
          anchor="bottom"
          onClick={() =>
            setPopupInfo({
              name: pet.pet_name,
              type: "caine",
              rasa: "caine",
              image: pet.photo,
              latitude: pet.lan,
              longitude: pet.lng,
              lostDate: pet.lost_date,
            })
          }
        >
          <img
            style={{
              height: "25px",
              width: "25px",
              backgroundColor: "#ffff32",
              borderRadius: "40%",
            }}
            src={pinImg}
            alt="pin"
          />
        </Marker>
      ))}
      {popupInfo && (
        <Popup
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            {popupInfo.name} | {popupInfo.type} | {popupInfo.rasa}
            <br /> Date: {popupInfo.lostDate}
          </div>
          <img width="60vw" src={pinImg} />
        </Popup>
      )}
    </Map>
  );
}

export default MapComponent;
