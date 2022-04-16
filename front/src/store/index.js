import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user';

const store = configureStore({
    reducer: {
        user: userReducer
    },
});

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;