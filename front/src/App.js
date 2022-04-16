import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.scss";
import LoginPopup from "./Components/Login/LoginPopup";
import Header from "./Components/AlwaysOn/Header";
import Footer from "./Components/footer/Footer";
import Map from "./Components/Map/Map";
import AddPage from "./Components/AddPage/AddPage";
import ListPage from "./Components/ListPage/ListPage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";

function App() {
  const user = useSelector((state) => state.user.user);

  const [showLogin, setLogin] = useState(false);
  const [showPage, setPage] = useState("map");

  console.log(user);

  return (
    <div className="App" style={{ height: "100%", width: "100%" }}>
      {showLogin && <LoginPopup setLogin={setLogin} />}
      <Header user={user} setLogin={setLogin} />
      {showPage === "map" && <Map />}
      {showPage === "add" && <AddPage />}
      {showPage === "list" && <ListPage />}
      {showPage === "profile" && <ProfilePage user={user} />}
      {user && <Footer user={user} page={showPage} setPage={setPage} />}
    </div>
  );
}

export default App;
