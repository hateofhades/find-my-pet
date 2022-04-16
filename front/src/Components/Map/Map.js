import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import pinImg from "./pin.png";

function MapComponent() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [lostLocationData, setLostLocationData] = useState([]);
  const [foundLocationData, setFoundLocationData] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 44.442110316543896,
    longitude: 26.097182594212356,
    zoom: 13,
  });

  console.log(foundLocationData);

  useEffect(() => {
    async function fetchData() {
      let result = await axios.get("http://localhost:5050/display_posts_lost");
      setLostLocationData(result.data);

      result = await axios.get("http://localhost:5050/display_posts_found");
      setFoundLocationData(result.data);
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
      {lostLocationData.map((pet) => (
        <Marker
          latitude={pet.lan}
          longitude={pet.lng}
          key={pet._id}
          anchor="bottom"
          onClick={() =>
            setPopupInfo({
              typePin: "lost",
              name: pet.pet_name,
              type: pet.pet_type,
              rasa: pet.pet_breed,
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
      {foundLocationData.map((pet) => (
        <Marker
          latitude={pet.lan}
          longitude={pet.lng}
          key={pet._id}
          anchor="bottom"
          onClick={() =>
            setPopupInfo({
              typePin: "found",
              name: pet.contact,
              type: pet.pet_type,
              rasa: pet.pet_breed,
              image: pet.photo,
              latitude: pet.lan,
              longitude: pet.lng,
              lostDate: pet.date,
            })
          }
        >
          <img
            style={{
              height: "25px",
              width: "25px",
              backgroundColor: "#ff0000",
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              <p>{popupInfo.typePin === "lost" ? "Lost" : "Found"}</p>
              <p>
                {popupInfo.name} | {popupInfo.type} | {popupInfo.rasa}
              </p>
              <p> Date: {popupInfo.lostDate}</p>
            </div>
            <div style={{ display: "flex" }}>
              <img width="60vw" src={popupInfo.image} />
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default MapComponent;
