import React, { useState } from "react";

//** Components *//
import MobileTrackingForm from "../UI/MobileTrackingForm";

//** Libraries *//
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

//** Styling *//
import { Row, Col, Layout, Menu, Drawer } from "antd";
import {
  MenuUnfoldOutlined,
  MenuOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
const { Header } = Layout;
const { Item, SubMenu, Divider } = Menu;

const MobileNavbar = () => {
  //** States *//
  const [selectedMenuItem, setSelectedMenuItem] = useState("home");
  const [isDrawerOPen, setIsDrawerOpen] = useState(false);

  //** Hooks *//
  const [t] = useTranslation(["translation"]);
  const LOGO = require(`../../assets/images/logo_${t("LANG")}.svg`);

  //** Functions *//
  const handleSelect = e => {
    setSelectedMenuItem(prev => (e.key === "lang" ? prev : e.key));
    setIsDrawerOpen(false);
  };

  const CloseIcon = props =>
    t("DIR") === "ltr" ? (
      <MenuUnfoldOutlined {...props} />
    ) : (
      <MenuFoldOutlined {...props} />
    );

  return (
    <Header className="header">
      <div className="container">
        <Row gutter={8}>
          <Col span={5}>
            <Link to="/" className="navbar-item">
              <img className="navbar-logo" src={LOGO} alt="bosta-logo" />
            </Link>
          </Col>

          <Col span={1} offset={18} onClick={() => setIsDrawerOpen(true)}>
            <MenuOutlined style={{ color: "#ff3030", fontSize: "24px" }} />
          </Col>
        </Row>
        <Drawer
          visible={isDrawerOPen}
          placement={t("LANG") === "en" ? "right" : "left"}
          onClose={() => setIsDrawerOpen(false)}
          closeIcon={
            <CloseIcon style={{ color: "#ff3030", fontSize: "24px" }} />
          }
          bodyStyle={{ padding: "5px" }}
          headerStyle={{ paddingInline: "5px", paddingBlock: "20px" }}
        >
          <Menu
            mode="inline"
            selectable
            onSelect={handleSelect}
            selectedKeys={selectedMenuItem}
            style={{ border: "none" }}
            openKeys={["track-shipment"]}
            className="mobile-nav"
          >
            <Item key="home">
              <Link to="/">{t("NAV_MENU.HOME")}</Link>
            </Item>
            <Divider />
            <Item key="price">
              <Link to="/">{t("NAV_MENU.PRICES")}</Link>
            </Item>
            <Divider />
            <Item key="callcenter">
              <Link to="/">{t("NAV_MENU.CALL_CENTER")}</Link>
            </Item>
            <Divider />
            <SubMenu key="track-shipment" title={t("NAV_MENU.TRACK_SHIPMENT")}>
              <Item key="track-shipment-form" className="menu-form" disabled>
                <MobileTrackingForm />
              </Item>
            </SubMenu>
            <Divider />
            <Item key="login">
              <Link to="/">{t("NAV_MENU.LOG_IN")}</Link>
            </Item>
          </Menu>
        </Drawer>
      </div>
    </Header>
  );
};

export default MobileNavbar;
