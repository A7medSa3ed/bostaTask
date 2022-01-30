import React from "react";

//** Pages *//
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

//** Libraries *//
import { Navigate, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";

const TrackingResult = React.lazy(() => import("./pages/TrackingResult"));

function App() {
  const [t] = useTranslation(["translation"]);

  return (
    <ConfigProvider direction={t("DIR")}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/tracking-shipment/:trackId"
          element={<TrackingResult />}
        />

        {/* 404 */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
