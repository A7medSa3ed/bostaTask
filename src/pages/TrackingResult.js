import React, { useEffect, useState, useRef } from "react";

//** Components *//
import Layout from "../components/Layout";
import ShipmentUpdates from "../components/UI/ShipmentUpdates";
import InfoTable from "../components/UI/InfoTable";
import Spinner from "../components/UI/Spinner";
import NotFound from "../pages/NotFound";

//** Hooks *//
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

//** API *//
import API from "../api";

const TrackingResult = () => {
  const [shipmentData, setShipmentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  console.log(shipmentData);
  //** Hooks **//
  const [t] = useTranslation(["translation"]);
  const { trackId } = useParams();

  //** Refs **//
  const ref = useRef(false);

  //** Side Effects **//

  // this used to cancel request will component unmount
  useEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      if (trackId && trackId.length === 7) {
        setLoading(true);
        API.get(`/shipments/track/${trackId}`)
          .then(res => {
            setShipmentData(res.data);
            setLoading(false);
            setApiError("");
          })
          .catch(err => {
            err = JSON.stringify(err);
            err = JSON.parse(err);
            if (err.status === 404) {
              setApiError(t("CUSTOM_ERRORS.NOT_FOUND"));
            } else if (err.message === "Network Error") {
              setApiError(t("CUSTOM_ERRORS.NETWORK_ERROR"));
            } else {
              setApiError(t("CUSTOM_ERRORS.NOT_FOUND"));
            }
            setLoading(false);
          });
      } else {
        setApiError(t("CUSTOM_ERRORS.NOT_FOUND"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackId]);

  if (loading)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  if (apiError !== "") return <NotFound err={apiError} />;

  return (
    <Layout>
      <div className="tracking-result-page">
        <ShipmentUpdates
          promisedDate={shipmentData.PromisedDate}
          currentStatus={shipmentData.CurrentStatus}
        />
        <InfoTable transitEvents={shipmentData.TransitEvents} />
      </div>
    </Layout>
  );
};

export default TrackingResult;
