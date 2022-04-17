import React, { useState } from "react";
import { useSelector } from "react-redux";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
//import 'bootstrap/dist/css/bootstrap.css';
import style from "./AddPage.module.scss";

import { storage, imagesRef } from "../../firebase/firebase.js";
import { uploadBytes, ref } from "firebase/storage";
import { useEffect } from "react";
import axios from "axios";
import Map, { Marker } from "react-map-gl";
import pinImg from "../Map/pin.png";

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

function AddPage({ setPage }) {
  const [isLost, setIsLost] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [chipID, setChipID] = useState("");
  const [datePicked, setDatePicked] = useState(new Date());
  const [descriere, setDescriere] = useState("");
  const [rasaAnimal, setRasaAnimal] = useState("");
  const [specieAnimal, setSpecieAnimal] = useState("");
  const [didVet, setDidVet] = useState(false);
  const [nume, setNume] = useState("");

  const user = useSelector((state) => state.user.user);

  const [locationData, setLocationData] = useState({
    lat: "44.428924692426705",
    lng: "26.097182594212356",
  });

  const handleSubmit = async () => {
    let photoRef = ref(storage, user.user + "/" + selectedFile.name);
    await uploadBytes(photoRef, selectedFile);
    let photoURL =
      "https://firebasestorage.googleapis.com/v0/b/" +
      photoRef._location.bucket +
      "/o/" +
      photoRef._location.path.replace(" ", "%20").replace("/", "%2F") +
      "?alt=media";

    if (isLost) {
      let result = await axios.post("http://localhost:5050/lost_post", {
        id_chip: chipID,
        lost_date: datePicked,
        description: descriere,
        photo: photoURL,
        pet_name: nume,
        lan: locationData.lat,
        lng: locationData.lng,
        account_id: user.user,
        pet_type: specieAnimal,
        pet_breed: rasaAnimal,
        email: user.email,
        phone: user.phone,
      });

      console.log(result);

      if (result.status == 200) setPage("map");
    } else {
      let result = await axios.post("http://localhost:5050/found_post", {
        photo: photoURL,
        lan: locationData.lat,
        lng: locationData.lng,
        phone: user.phone,
        vet: didVet,
        account_id: user.user,
        pet_type: specieAnimal,
        pet_breed: rasaAnimal,
        date: datePicked,
        email: user.email,
        phone: user.phone,
        description: descriere,
      });

      console.log(result);

      if (result.status == 200) setPage("map");
    }
  };

  const getDog = async () => {
    if (selectedFile) {
      await uploadBytes(imagesRef, selectedFile);

      let result = await axios.get(
        "http://localhost:5000/predict?photo=https://firebasestorage.googleapis.com/v0/b/find-my-pet-1264e.appspot.com/o/py-img.png?alt=media&token=b125c1c4-47c5-42cc-9458-0c86ecad795e"
      );
      setRasaAnimal(
        result.data
          .split("-")[1]
          .split("<")[0]
          .split("_")
          .join(" ")
          .toUpperCase()
      );
    }
  };

  return (
    <div className={style.mainDivAddPage}>
      <div style={{ height: "10vh" }}></div>

      <div className={style.toggleDivAddPage}>
        <p className={style.textAddPage}>
          Alege tipul anuntului din lista de mai jos:
        </p>
        <BootstrapSwitchButton
          checked={false}
          size="lg"
          width={100}
          onlabel="Gasit"
          offlabel="Pierdut"
          onstyle="success"
          offstyle="danger"
          onChange={(checked) => {
            setIsLost(!checked);
          }}
        />
      </div>

      {isLost && (
        <div className={style.textAddPage}>
          <form>
            <label>
              <p className={style.textAddPage}>Adauga o poza: </p>
              <input
                type="file"
                name="photo"
                className={style.inputAddPage}
                accept="image/jpg, image/jpeg"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                }}
              />
            </label>
            <br />
            <label>
              <p className={style.textAddPage}>
                Adauga o locatie folosind harta de mai jos:
              </p>
            </label>
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
            <label>
              <p className={style.textAddPage}>Nume: </p>
              <input
                type="text"
                name="nume"
                className={style.inputAddPage}
                value={nume}
                onChange={(e) => {
                  setNume(e.target.value);
                }}
              />
            </label>
            <br />
            <label>
              <p className={style.textAddPage}>ID Cip: </p>
              <input
                type="text"
                name="idCip"
                className={style.inputAddPage}
                value={chipID}
                onChange={(e) => {
                  setChipID(e.target.value);
                }}
              />
            </label>
            <br />
            <label>
              <p className={style.textAddPage}>Data pierderii:</p>
              <input
                type="date"
                id="lostDate"
                className={style.inputAddPage}
                value={datePicked}
                onChange={(e) => {
                  setDatePicked(e.target.value);
                }}
              />
            </label>
            <br />
            <label>
              <p className={style.textAddPage}>
                Descriere (Te rugam sa adaugi o descriere a animalului si a
                zonei in care a fost pierdut):
              </p>
              <br />
              <textarea
                id="descriere"
                name="descriere"
                rows="4"
                cols="30"
                className={style.inputAddPage}
                value={descriere}
                onChange={(e) => {
                  setDescriere(e.target.value);
                }}
              />
            </label>
            <label>
              <p className={style.textAddPage}>Specie: </p>
              <input
                type="text"
                name="specieAnimal"
                className={style.inputAddPage}
                value={specieAnimal}
                onChange={(e) => {
                  setSpecieAnimal(e.target.value);

                  if (e.target.value.toLowerCase() == "caine") getDog();
                }}
              />
            </label>
            <label>
              <p className={style.textAddPage}>
                Rasa (Auto-generata pentru specia “caine”):
              </p>
              <input
                type="text"
                name="rasa"
                className={style.inputAddPage}
                value={rasaAnimal}
                onChange={(e) => {
                  setRasaAnimal(e.target.value);

                  if (e.target.value.toLowerCase === "caine") {
                  }
                }}
              />
            </label>
          </form>
        </div>
      )}
      {!isLost && (
        <div>
          <form>
            <label>
              <p className={style.textAddPage}>Adauga o poza:</p>
              <input
                type="file"
                name="photo"
                className={style.inputAddPage}
                accept="image/jpg, image/jpeg"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                }}
              />
              <br />
            </label>
            <br />
            <label>
              <p className={style.textAddPage}>
                Adauga o locatie folosind harta de mai jos:
              </p>
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
            </label>
            <br />
            <div class="pretty p-icon p-round">
              <p>Animalul a fost dus la veterinar: </p>
              <input
                type="checkbox"
                name="icon_solid"
                checked={didVet}
                onChange={(e) => setDidVet(!didVet)}
              />
            </div>
            <label>
              <p className={style.textAddPage}>Data gasirii:</p>
              <input
                type="date"
                id="lostDate"
                className={style.inputAddPage}
                value={datePicked}
                onChange={(e) => {
                  setDatePicked(e.target.value);
                }}
              />
            </label>
            <br />
            <label>
              <p className={style.textAddPage}>
                Descriere (Te rugam sa adaugi o descriere a animalului si a
                zonei in care a fost gasit):
              </p>
              <br />
              <textarea
                id="descriere"
                name="descriere"
                rows="4"
                cols="30"
                className={style.inputAddPage}
                value={descriere}
                onChange={(e) => {
                  setDescriere(e.target.value);
                }}
              />
            </label>
            <label>
              <p className={style.textAddPage}>Specie: </p>
              <input
                type="text"
                name="specieAnimal"
                className={style.inputAddPage}
                value={specieAnimal}
                onChange={(e) => {
                  setSpecieAnimal(e.target.value);

                  if (e.target.value.toLowerCase() == "caine") getDog();
                }}
              />
            </label>
            <label>
              <p className={style.textAddPage}>
                Rasa (Auto-generata pentru specia “caine”):
              </p>
              <input
                type="text"
                name="rasa"
                className={style.inputAddPage}
                value={rasaAnimal}
                onChange={(e) => {
                  setRasaAnimal(e.target.value);

                  if (e.target.value.toLowerCase === "caine") {
                  }
                }}
              />
            </label>
          </form>
        </div>
      )}
      <div
        className={style.button}
        onClick={handleSubmit}
        style={{ textAlign: "center" }}
      >
        Save
      </div>
      <div className={style.profileSpacer}></div>
      <div className={style.profileSpacer}></div>
      <div className={style.profileSpacer}></div>
    </div>
  );
}
export default AddPage;
