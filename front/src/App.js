import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.scss";
import LoginPopup from "./Components/Login/LoginPopup";
import Header from "./Components/AlwaysOn/Header";

function App() {
  const user = useSelector((state) => state.user.user);

  const [showLogin, setLogin] = useState(false);

  return (
    <div className="App">
      {showLogin && <LoginPopup setLogin={setLogin} />}
      <Header user={user} setLogin={setLogin} />
    </div>
  );
}

export default App;
