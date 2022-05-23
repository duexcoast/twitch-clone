import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/store";
import App from "./components/App";

const store = configureStore({
  reducer: rootReducer,
});

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
