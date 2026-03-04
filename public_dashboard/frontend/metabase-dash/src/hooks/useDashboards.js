import { useState, useEffect } from "react";

const useDashboards = () => {
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/dashboards.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load dashboards.json");
        return res.json();
      })
      .then((data) => setDashboards(data))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { dashboards, loading, error };
};

export default useDashboards;
