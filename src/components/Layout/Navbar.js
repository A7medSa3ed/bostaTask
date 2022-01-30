import React, { useEffect, useState } from "react";

//** Libraries *//
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

//** Styling *//
import { Row, Col, Layout, Menu } from "antd";
import TrackingShipmentForm from "../UI/TrackingShipmentForm";
const { Header } = Layout;
const { Item, SubMenu } = Menu;

const Navbar = () => {
  //** States *//
  const [selectedMenuItem, setSelectedMenuItem] = useState("home");
  const [openSubMenu, setOPenSubMenu] = useState("track-shipment");

  //** Hooks *//
  const [t, i18n] = useTranslation(["translation"]);
  const { pathname } = useLocation();

  const LOGO = require(`../../assets/images/logo_${t("LANG")}.svg`);

  //** Functions *//
  const handleLangChange = () => {
    t("LANG") === "en" ? i18n.changeLanguage("ar") : i18n.changeLanguage("en");
  };
  const handleTrackForm = () => {
    setOPenSubMenu(prev => (prev === "" ? "track-shipment" : ""));
  };

  //** Side Effects *//
  useEffect(() => {
    if (pathname.includes("tracking-shipment")) {
      setOPenSubMenu("");
      setSelectedMenuItem("track-shipment");
    }
  }, [pathname]);

  return (
    <Header className="header">
      <div className="container">
        <Row gutter={8}>
          <Col lg={{ span: "5" }}>
            <Link to="/" className="navbar-item">
              <img className="navbar-logo" src={LOGO} alt="bosta-logo" />
            </Link>
          </Col>

          <Col lg={{ span: "9" }} className="left-menu">
            <Menu
              selectedKeys={selectedMenuItem}
              mode="horizontal"
              selectable
              onSelect={e =>
                setSelectedMenuItem(prev => (e.key === "lang" ? prev : e.key))
              }
            >
              <Item key="home">
                <Link to="/">{t("NAV_MENU.HOME")}</Link>
              </Item>
              <Item key="price">
                <Link to="/">{t("NAV_MENU.PRICES")}</Link>
              </Item>
              <Item key="callcenter">
                <Link to="/">{t("NAV_MENU.CALL_CENTER")}</Link>
              </Item>
            </Menu>
          </Col>

          <Col lg={{ span: "10" }} className="right-menu">
            <Menu
              selectedKeys={selectedMenuItem}
              mode="horizontal"
              selectable
              onSelect={e =>
                setSelectedMenuItem(prev => (e.key === "lang" ? prev : e.key))
              }
              style={{ display: "flex", justifyContent: "flex-end" }}
              triggerSubMenuAction="click"
              openKeys={[openSubMenu]}
            >
              <SubMenu
                key="track-shipment"
                title={t("NAV_MENU.TRACK_SHIPMENT")}
                onTitleClick={handleTrackForm}
              >
                <Item key="track-shipment-form">
                  <TrackingShipmentForm />
                </Item>
              </SubMenu>
              <Item key="login">
                <Link to="/">{t("NAV_MENU.LOG_IN")}</Link>
              </Item>
              <Item key="lang" onClick={handleLangChange}>
                {t("LANG") === "en" ? "عربي" : "ENG"}
              </Item>
            </Menu>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default Navbar;
