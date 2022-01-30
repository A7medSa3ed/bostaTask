import React from "react";
import Layout from "../components/Layout";

const NotFound = ({ err = "" }) => {
  return (
    <Layout>
      <div className="notFound">{err === "" ? "Not Found" : err}</div>
    </Layout>
  );
};

export default NotFound;
