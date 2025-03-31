import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit"
// import './index.css'
import App from "./App.jsx";
import movieSlice from "./Admin/redux/movieSlice.js";

export const store = configureStore({
  reducer: {
    movieSlice: movieSlice,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
