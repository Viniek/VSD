import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../../utills/config";
import "./History.css";

function History() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  async function handleGetHistory() {
    setLoading(true);
    try {
      const response = await axios.get(`${api_url}api/history/getHistory`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setHistory(response.data.data); // Store the fetched history
        console.log(JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetHistory();
  }, []);

  return (
    <div className="history-page">
      <h1>History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : history.length > 0 ? (
        <ul>
          {history.map((item) => (
            <li key={item.id}>
              <p>
                <strong>Test Date:</strong>{" "}
                {new Date(item.testDate).toLocaleString()}
              </p>
              <p>
                <strong>User ID:</strong> {item.userId}
              </p>
              <p>
                <strong>Test Result:</strong>{" "}
                {JSON.stringify(item.testResult, null, 2)}
              </p>
              <p>
                <strong>Factors:</strong>{" "}
                {JSON.stringify(item.factors, null, 2)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history found.</p>
      )}
    </div>
  );
}

export default History;
