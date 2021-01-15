import React from "react";
import ReactDOM from "react-dom";

import { AppContextProvider } from "./context/AppContext";
import App from "./components/app/App";

export const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

ReactDOM.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.getElementById("root")
);
