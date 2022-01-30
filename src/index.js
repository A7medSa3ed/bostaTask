import React, { Suspense } from "react";
import ReactDOM from "react-dom";

//** Components *//
import App from "./App";
import Spinner from "./components/UI/Spinner";

//** Libraries *//
import { BrowserRouter } from "react-router-dom";
import "dayjs/locale/ar";

//** Config *//
import "./i18n";

//** Style *//
import "antd/dist/antd.variable.min.css";
import "./assets/styles/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
