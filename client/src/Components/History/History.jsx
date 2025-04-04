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
            <table key={item.id}>
               <tr>
    <th>Action</th>
    <th>Details</th>
    <th>Date</th>
  </tr>
  <tr>
    <td>{JSON.stringify(item.historyTittle, null, 2)}</td>
    <td>{JSON.stringify(item.details, null, 2)}</td>
    <td>{new Date(item.createdAt).toLocaleString()}</td>
  </tr>
             
            </table>
          ))}
        </ul>
      ) : (
        <p>No history found.</p>
      )}


 


    </div>
  );
}

export default History;
