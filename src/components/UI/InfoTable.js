import React from "react";

//** Libraries **/
import dayjs from "dayjs";

//** Hooks **/
import { useTranslation } from "react-i18next";

//** Styling **/
import { Table, Card } from "antd";
import ProblemImage from "../../assets/images/problem.png";

const InfoTable = ({ transitEvents }) => {
  const [t] = useTranslation(["translation"]);
  const lang = t("LANG");

  const dataSource = [];
  transitEvents?.forEach((sEvent, key) =>
    dataSource.push({
      key,
      hub: t("SHIPMENT_TRACKING.UNKNOWN"),
      date: dayjs(sEvent?.timestamp).locale(lang).format("DD/MM/YYYY"),
      time: dayjs(sEvent?.timestamp).locale(lang).format("hh:mm A"),
      details: t(`SHIPMENT_STATE.${sEvent.state}`)
    })
  );

  const columns = [
    {
      title: t("SHIPMENT_TRACKING.BRANCH"),
      dataIndex: "hub",
      key: "hub"
    },
    {
      title: t("SHIPMENT_TRACKING.DATE"),
      dataIndex: "date",
      key: "date"
    },
    {
      title: t("SHIPMENT_TRACKING.TIME"),
      dataIndex: "time",
      key: "time"
    },
    {
      title: t("SHIPMENT_TRACKING.MORE_DETAILS"),
      dataIndex: "details",
      key: "details"
    }
  ];
  return (
    <div className="infoTable">
      <div className="tableData">
        <h2>{t("SHIPMENT_TRACKING.SHIPMENT_DETAILS")}</h2>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
      <div className="infoTable-rightSide">
        <div className="addressData">
          <h2>{t("SHIPMENT_TRACKING.SHIPMENT_DETAILS")}</h2>

          <Card style={{ width: "100%" }}>
            <p>{t("SHIPMENT_TRACKING.UNKNOWN")}</p>
          </Card>
        </div>

        <div className="anyProblem">
          <div className="problem-image">
            <img src={ProblemImage} alt="anyProblem" />
          </div>
          <div className="problem-reachUs">
            <p>{t("SHIPMENT_TRACKING.HAVING_PROBLEM")}</p>
            <button>{t("SHIPMENT_TRACKING.REPORT_PROBLEM")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTable;
