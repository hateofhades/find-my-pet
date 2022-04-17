import React, { useState } from "react";
import style from "./Announcement.module.scss";
import dropdown from "./dropdown.svg";
import Map, { Marker } from "react-map-gl";
import pinImg from "../Map/pin.png";

function Announcement({
  petName,
  petType,
  petBreed,
  description,
  date,
  lostType,
  lat,
  lng,
  photo,
  phone,
}) {
  const [mapVisible, setMapVisible] = useState(false);
  const handleDropdown = () => {
    setMapVisible(!mapVisible);
  };
  return (
    <div>
      <div className={style.announcement}>
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img style={{ marginLeft: "2vw" }} src={photo} />
          <div className={style.announcementType}>
            <p>{lostType ? "Pet lost: " + petName : "Pet found"}</p>
            <p>{petType}</p>
            <p>{petBreed}</p>
          </div>
        </div>
        <img
          className={style.seeMap}
          src={dropdown}
          onClick={handleDropdown}
          style={{ transform: !mapVisible ? "" : "rotate(180deg)" }}
        />
      </div>
      {mapVisible && (
        <div className={style.descriptionBox}>
          <div>Description: {description}</div>
          <div>Contact number: {phone} </div>
          <div>Found date: {date}</div>
          <Map
            mapboxAccessToken="pk.eyJ1IjoiYW5kcmVpc3RhbGtlciIsImEiOiJjbDIxenZrb3AwNjd3M2Vvb2FsNTRqeGdxIn0.GE5KJr0GieZCFW01upHwrA"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            dragPan={false}
            scrollZoom={false}
            initialViewState={{
              latitude: lat,
              longitude: lng,
              zoom: 14,
            }}
            style={{
              width: "500px",
              height: "500px",
              borderRadius: "40px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Marker latitude={lat} longitude={lng} anchor="bottom">
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
          </Map>
        </div>
      )}
    </div>
  );
}

export default Announcement;
