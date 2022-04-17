import React from "react";
import { useState } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
//import 'bootstrap/dist/css/bootstrap.css';
import style from './AddPage.module.scss'



function AddPage() {
const [isLost, setIsLost] = useState(true);

return (
<div className={style.mainDivAddPage}>
  <div style={{ height: "10vh" }}></div>

  <div className={style.toggleDivAddPage}>
    <p className={style.textAddPage}>Alege tipul anuntului pe care il faci: </p>
  <BootstrapSwitchButton checked={false} size="lg" width={100} onlabel="Gasit" offlabel="Pierdut" onstyle="success"
    offstyle="danger" onChange={(checked)=> {
    setIsLost(!checked);
    }}
    />
  </div>


    {isLost && (
    <div>
      <form>
        <label>
          <p className={style.textAddPage}>Poza: </p>
          <input type="file" name="photo" className={style.inputAddPage} />
        </label>
        <br />
        <label>
        <p className={style.textAddPage}>ID-ul cipului: </p>
          <input type="text" name="idCip" className={style.inputAddPage} />
        </label>
        <br />
        <label>
        <p className={style.textAddPage}>Data pierderii:</p>
          <input type="date" id="lostDate" className={style.inputAddPage} />
        </label>
        <br />
        <label>
        <p className={style.textAddPage}>Descrierea zonei in care s-a pierdut animalul:</p>
          <br />
          <textarea id="descriere" name="descriere" rows="4" cols="30" className={style.inputAddPage} />
          </label>
          </form>
        </div>
      )}
      {!isLost && (
        <div>
          <form>
            <label>
            <p className={style.textAddPage}>Poza:</p>
              <input type="file" name="photo" className={style.inputAddPage} />
              <br />
            </label>
            <br />
            <label> <p className={style.textAddPage}>Locatie:</p></label>
            <br />
            <div class="pretty p-icon p-round">
              <p>A fost dus la veterinar: </p>
              <input type="radio" name="icon_solid"/>
              <div class="state p-primary">
                <i class="icon mdi mdi-check"></i>
                <label>A fost dus la veterinar</label>
              </div>
            </div>
            <label>
        <p className={style.textAddPage}>Data gasirii:</p>
          <input type="date" id="lostDate" className={style.inputAddPage} />
        </label>
        <br />
        <label>
        <p className={style.textAddPage}>Descrierea zonei in care s-a gasit animalul:</p>
          <br />
          <textarea id="descriere" name="descriere" rows="4" cols="30" className={style.inputAddPage} />
          </label>
          </form>
        </div>
      )}
    </div>
  );
}
export default AddPage;