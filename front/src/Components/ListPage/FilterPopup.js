import React from "react";
import style from "./FilterPopup.module.scss";
import x from "../Login/x.svg";
import Map, { Marker } from "react-map-gl";
import pinImg from "../Map/pin.png";

function FilterPopup({
  setFilterPopup,
  setLocationData,
  locationData,
  mapRange,
  setMapRange,
  setMapFilter,
}) {
  const handleDissapear = () => {
    setFilterPopup(false);
  };
  return (
    <div className={style.popupOverlay}>
      <div className={style.filterPopup}>
        <div>
          <Map
            mapboxAccessToken="pk.eyJ1IjoiYW5kcmVpc3RhbGtlciIsImEiOiJjbDIxenZrb3AwNjd3M2Vvb2FsNTRqeGdxIn0.GE5KJr0GieZCFW01upHwrA"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            initialViewState={{
              latitude: "44.428924692426705",
              longitude: "26.103521843173905",
              zoom: 14,
            }}
            onClick={(e) => {
              setLocationData(e.lngLat);
            }}
            style={{
              width: "80vw",
              maxWidth: "500px",
              height: "500px",
              borderRadius: "40px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Marker
              latitude={locationData.lat}
              longitude={locationData.lng}
              anchor="bottom"
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
          </Map>
        </div>
        <div>
          Select desired range for search:
          <input
            type="range"
            id="radius"
            name="radius"
            min="0"
            max="50"
            step="1"
            value={mapRange}
            onChange={(e) => {
              setMapRange(e.target.value);
              if (e.target.value == "0") {
                setMapFilter(false);
              } else {
                setMapFilter(true);
              }
            }}
          />
          <label for="radius">
            {mapRange != "0" ? mapRange + " KM" : "Filter is DISABLED"}
          </label>
        </div>
        <div className={style.xDiv} onClick={handleDissapear}>
          <img src={x} alt="" />
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
