import React from "react";

//** Libraries **/
import dayjs from "dayjs";

//** Hooks **/
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

//** Constants **/
import { shipmentStatus, statusTxtColors } from "../../constants/dummy-status";

//** Styling **/
import { Col, Divider, Row, Steps } from "antd";
import {
  CheckOutlined,
  SaveOutlined,
  ShoppingCartOutlined,
  UserSwitchOutlined
} from "@ant-design/icons";
const { Step } = Steps;

const ShipmentUpdates = ({ promisedDate, currentStatus }) => {
  const [t] = useTranslation(["translation"]);
  const { trackId } = useParams();

  const lang = t("LANG");

  const state = currentStatus?.state;

  const CustomBarIcon = ({ icon: Icon, ...props }) => {
    // Status Big Icon
    const statusBigIcon = {
      fontSize: "25px",
      color: "#FFF",
      borderRadius: "50%",
      padding: "10px",
      textAlign: "center",
      position: "absolute",
      top: "-15px",
      left: "-25px",
      backgroundColor: state === "RECEIVEDFROMSELLER" ? "red" : "#eee"
    };
    return <Icon {...props} style={statusBigIcon} />;
  };

  // Create Custom Dots
  const customDots = (_dot, { status, index }) => {
    if (status === "finish" || status === "process") {
      return (
        <CheckOutlined
          style={{
            fontSize: "12px",
            color: "#FFF",
            backgroundColor: statusTxtColors[state],
            borderRadius: "50%",
            padding: "2px",
            textAlign: "center",
            position: "absolute",
            top: "-3px"
          }}
        />
      );
    }
    switch (index) {
      case 1:
        return <CustomBarIcon icon={UserSwitchOutlined} />;
      case 2:
        return <CustomBarIcon icon={ShoppingCartOutlined} />;
      case 3:
        return <CustomBarIcon icon={SaveOutlined} />;
      default:
        return null;
    }
  };

  return (
    <div className="shipmentUpdates">
      <Row gutter={[16, 8]} className="shipmentUpdates-container">
        <div className="rowConainer">
          <Col span={6}>
            <Row>{`${t("SHIPMENT_TRACKING.TRACKING_NUMBER")} ${trackId}`}</Row>
            <Row style={{ color: statusTxtColors[state] }}>
              {t(`SHIPMENT_STATE.SHIPMENT_${state}`)}
            </Row>
          </Col>

          <Col span={8}>
            <Row>{t("SHIPMENT_TRACKING.LAST_UPDATE")}</Row>
            <Row>
              &nbsp;
              {dayjs(currentStatus?.timestamp)
                .locale(lang)
                .format("dddd DD/MM/YYYY")}
              &nbsp; at &nbsp;
              {dayjs(currentStatus?.timestamp).locale(lang).format("hh:mm A")}
            </Row>
          </Col>

          <Col span={6}>
            <Row>{t("SHIPMENT_TRACKING.SELLER_NAME")}</Row>
            <Row>Souq.Com</Row>
          </Col>

          <Col span={4}>
            <Row>{t("SHIPMENT_TRACKING.RECEVING_DATE")}</Row>
            <Row>{dayjs(promisedDate).locale(lang).format("DD MMMM YYYY")}</Row>
          </Col>
        </div>
      </Row>

      <Divider />

      <Steps
        progressDot={customDots}
        current={shipmentStatus.indexOf(state)}
        className={`${state}`}
      >
        <Step title={t("SHIPMENT_STATE.TICKET_CREATED")} />
        <Step title={t("SHIPMENT_STATE.PACKAGE_RECEIVED")} />
        <Step
          title={t("SHIPMENT_STATE.OUT_FOR_DELIVERY")}
          description={t("SHIPMENT_STATE.SHIPMENT_SELLER_CANCEL")}
        />
        <Step title={t("SHIPMENT_STATE.SHIPMENT_DELIVERED")} />
      </Steps>
    </div>
  );
};

export default ShipmentUpdates;
