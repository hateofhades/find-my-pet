import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import "./index.css";
import App from "./App";

// import i18n (needs to be bundled ;))
import "./i18n";
import { hydrate } from './store/user';

const getUserFromLocalStorage = () => {
  try {
    const persistedState = localStorage.getItem("reduxState");
    if (persistedState) return JSON.parse(persistedState);
    return null;
  } catch (e) {
    return null;
  }
};

const user = getUserFromLocalStorage();
if(user) {
  store.dispatch(hydrate(user.user));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
