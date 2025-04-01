import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
// import './index.css'
import App from "./App.jsx";
import userSlice from "./Customers/redux/userSlice.js";
import bookingSlice from "./Customers/redux/bookingSlice.js";
import loadingSlice from "./Customers/redux/loadingSlice.js";
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    bookingSlice: bookingSlice,
    loadingSlice: loadingSlice,
  },
});

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>,
);
