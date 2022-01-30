import React, { useState, Fragment } from "react";

//** Hooks *//
import { useTranslation } from "react-i18next";

//** Libraries *//
import { useNavigate } from "react-router-dom";

//** Styling *//
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const MobileTrackingForm = () => {
  const [trackNumber, setTrackNumber] = useState(null);
  const [err, setErr] = useState("");

  const [t] = useTranslation(["translation"]);

  const navigate = useNavigate();

  //** Functions *//
  const handleChange = e => {
    const value = e.target.value;

    if (value.trim() === "") {
      setErr(t("CUSTOM_ERRORS.NUM_ONLY"));
      setTrackNumber("");
      return;
    } else if (!Number(value)) {
      setErr(t("CUSTOM_ERRORS.NUM_ONLY"));
      return;
    }
    setErr("");
    setTrackNumber(+value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (String(trackNumber)?.length < 7) {
      setErr(t("CUSTOM_ERRORS.TRACK_LENGTH"));
      return;
    } else if (trackNumber && err === "") {
      navigate(`/tracking-shipment/${trackNumber}`);
    } else {
      setErr(t("CUSTOM_ERRORS.ENTER_TRACKING_NUMBER"));
    }
  };

  return (
    <Fragment>
      <div className="formContainreMobile">
        <div className="trackingForm_search">
          <Input
            maxLength={7}
            placeholder={t("SHIPMENT_TRACKING.TRACKING_NUMBER")}
            onChange={e => handleChange(e)}
            value={trackNumber}
            className="search_Input"
          />
        </div>
        <div className="trackingForm_searchIcon" onClick={e => handleSubmit(e)}>
          <SearchOutlined
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: "700",
              margin: 0
            }}
          />
        </div>
      </div>
      <h4 className="formError">{err}</h4>
    </Fragment>
  );
};

export default MobileTrackingForm;
