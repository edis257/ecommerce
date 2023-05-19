import React from "react";
import ReactDOM from "react-dom/client";

//redux
import { Provider } from "react-redux";
import store from "./store.jsx";

import App from "./App.jsx";
import "./bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
