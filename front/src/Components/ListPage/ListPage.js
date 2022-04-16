import React, { useEffect, useState } from "react";
import style from "./ListPage.module.scss";
import Announcement from "./Announcement.js";
import axios from "axios";

function ListPage() {
  const [lostLocationData, setLostLocationData] = useState([]);
  const [foundLocationData, setFoundLocationData] = useState([]);

  console.log(lostLocationData);
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
    <div className={style.listPage}>
      <div className={style.profileSpacer}></div>
      <h3>Announcements</h3>

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
        />
      ))}
      <div className={style.profileSpacer}></div>
      <div className={style.profileSpacer}></div>
      <div className={style.profileSpacer}></div>
    </div>
  );
}

export default ListPage;
