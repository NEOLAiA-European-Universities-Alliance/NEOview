import React from "react";
import { useParams } from "react-router-dom";
import EmbedDash from "./EmbedDash";
import useDashboards from "../hooks/useDashboards";

const DashLoader = () => {
  const { dashId } = useParams();
  const { dashboards, loading, error } = useDashboards();

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (error)   return <p style={{ padding: "2rem" }}>Error: {error}</p>;

  const dash = dashboards.find((d) => d.path === dashId);

  if (!dash) {
    return <p style={{ padding: "2rem" }}>Dashboard "{dashId}" not found.</p>;
  }

  return <EmbedDash endpoint={dash.endpoint} title={dash.label} />;
};

export default DashLoader;
