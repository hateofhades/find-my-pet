import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.scss";
import LoginPopup from "./Components/Login/LoginPopup";
import Header from "./Components/AlwaysOn/Header";
import Footer from "./Components/footer/Footer";
import Map from "./Components/Map/Map";

function App() {
  const user = useSelector((state) => state.user.user);

  const [showLogin, setLogin] = useState(false);

  console.log(user);

  return (
    <div className="App">
      {showLogin && <LoginPopup setLogin={setLogin} />}
      <Header user={user} setLogin={setLogin} />
      <Map />
      {user && <Footer user={user} />}
    </div>
  );
}

export default App;
