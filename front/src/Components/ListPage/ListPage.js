import React, { useEffect, useState } from "react";
import style from "./ListPage.module.scss";
import Announcement from "./Announcement.js";
import axios from "axios";
import mapIco from "./filter.png";
import FilterPopup from "./FilterPopup.js";

function ListPage() {
  const [lostLocationData, setLostLocationData] = useState([]);
  const [foundLocationData, setFoundLocationData] = useState([]);
  const [filterPopup, setFilterPopup] = useState(false);
  const [mapFilter, setMapFilter] = useState(false);
  const [locationData, setLocationData] = useState({
    lat: "44.43892996084246",
    lng: "26.047149631128956",
  });
  const [mapRange, setMapRange] = useState(10);

  useEffect(() => {
    async function fetchData() {
      if (!mapFilter) {
        let result = await axios.get(
          "http://localhost:5050/display_posts_lost"
        );
        setLostLocationData(result.data);

        result = await axios.get("http://localhost:5050/display_posts_found");
        setFoundLocationData(result.data);
      } else {
        let result = await axios.get(
          "http://localhost:5050/getRangeLost?radius=" +
            mapRange +
            "&lan=" +
            locationData.lat +
            "&lng=" +
            locationData.lng
        );

        setLostLocationData(result.data);

        result = await axios.get(
          "http://localhost:5050/getRangeFound?radius=" +
            mapRange +
            "&lan=" +
            locationData.lat +
            "&lng=" +
            locationData.lng
        );

        setFoundLocationData(result.data);
      }
    }
    fetchData();
  }, [filterPopup, mapFilter, mapRange, locationData]);

  const handleFilter = () => {
    setFilterPopup(!filterPopup);
  };

  return (
    <div className={style.listPage}>
      <div className={style.profileSpacer}></div>

      {filterPopup && (
        <FilterPopup
          setFilterPopup={setFilterPopup}
          setLocationData={setLocationData}
          locationData={locationData}
          mapRange={mapRange}
          setMapRange={setMapRange}
          setMapFilter={setMapFilter}
        />
      )}

      <h3>Announcements</h3>
      <img
        className={style.filter}
        src={mapIco}
        style={{ height: "50px" }}
        onClick={handleFilter}
      />

      {lostLocationData.map((pet) => (
        <Announcement
          id={pet._id}
          lat={pet.lan}
          lng={pet.lng}
          petType={pet.pet_type}
          petBreed={pet.pet_breed}
          petName={pet.pet_name}
          lostType={true}
          photo={pet.photo}
          description={pet.description}
          date={pet.lost_date}
          phone={pet.phone}
        />
      ))}
      {foundLocationData.map((pet) => (
        <Announcement
          id={pet._id}
          lat={pet.lan}
          lng={pet.lng}
          lostType={false}
          name="Pet found"
          photo={pet.photo}
          petType={pet.pet_type}
          petBreed={pet.pet_breed}
          date={pet.date}
          phone={pet.phone}
          description={pet.description}
        />
      ))}
      <div className={style.profileSpacer}></div>
      <div className={style.profileSpacer}></div>
      <div className={style.profileSpacer}></div>
    </div>
  );
}

export default ListPage;
