import React from "react";

//** Hooks *//
import useWindowSize from "../hooks/useWindowSize";

//** Components *//
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

//** Styling *//
import { Layout as AntdLayout } from "antd";
const { Content } = AntdLayout;

const Layout = ({ children }) => {
  const deviceWidth = useWindowSize();

  return (
    <>
      {deviceWidth > 980 ? <Navbar /> : <MobileNavbar />}

      <div className="container">
        <AntdLayout>
          <Content className="layoutContent">{children}</Content>
        </AntdLayout>
      </div>
    </>
  );
};

export default Layout;
