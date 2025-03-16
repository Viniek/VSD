import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import "./Help.css";

function Help() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="help-page">
      {loading ? (
        <Loader loading={loading} type="ThreeDots" color="blue" size={80} />
      ) : (
        <h2>Content Loaded!</h2>
      )}
    </div>
  );
}

export default Help;
