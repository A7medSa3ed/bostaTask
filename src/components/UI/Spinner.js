import React from "react";

//** Styling *//
import { Spin, Space, Row } from "antd";

const Spinner = () => {
  return (
    <Row type="flex" justify="center" align="large">
      <Space size="large">
        <Spin size="large" />
      </Space>
    </Row>
  );
};

export default Spinner;
