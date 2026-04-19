import React, { useEffect, useState } from "react";
import { uploadEtfFile, getEtfPriceByTime, getLatestTop5Holdings } from "./api";
import DataTable from "./components/DataTable/DataTable.jsx";
import DataGraph from "./components/DataGraph/DataGraph.jsx";
import DataBarChart from "./components/DataBarChart/DataBarChart.jsx";
import "./App.css";

function App() {
  const [etfFile, setEtfFile] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [etfTableData, setEtfTableData] = useState(null);
  const [etfPriceByTime, setEtfPriceByTime] = useState(null);
  const [latestTop5Holdings, setLatestTop5Holdings] = useState(null);

  useEffect(() => {
    if (etfTableData) {
      getEtfPriceByTime()
        .then(response => {
          console.log("getEtfPriceByTime Response:", response);
          setEtfPriceByTime(response.data);
        })
        .catch(error => {
          console.error("Error fetching ETF price by time:", error);
        });

      getLatestTop5Holdings()
        .then(response => {
          console.log("getLatestTop5Holdings Response:", response);
          setLatestTop5Holdings(response.data);
        })
        .catch(error => {
          console.error("Error fetching latest top 5 holdings:", error);
        });
    }
  }, [etfTableData]);
  
  const handleFileChange = (event) => {
    setEtfFile(event.target.files[0]);
    console.log("Selected file:", event.target.files[0]);
  }

  const handleUploadClick = async () => {
    if (!etfFile) {
      setErrMsg("Please select a file to upload.");
      return;
    }

    if (etfFile.type !== "text/csv") {
      setErrMsg("Invalid file type. Please upload a CSV file.");
      return;
    }

    console.log("Uploading file:", etfFile);

    const formData = new FormData();
    formData.append('file', etfFile);

    uploadEtfFile(formData)
      .then(response => {
        console.log("uploadEtfFile response:", response);
        if (response.statusCode !== 200) {
          setErrMsg(response.message);
          return;
        }
        setEtfTableData(response.data);
        setErrMsg("");
      })
      .catch(error => {
        console.error("Error uploading file:", error);
        setErrMsg("Error uploading file. Please try again.");
      });
  }

  return (
    <div>
      <div className="header-section-container">
        <h1 className="page-header">ETF Price Monitor</h1>
        <div className="err-msg">{errMsg}</div>
      </div>
      <div className="upload-file-section">
        <h2>Upload ETF file</h2>
        <input className="input-file-bar" type="file" onChange={handleFileChange} />
        <button className="upload-button" onClick={handleUploadClick}>
          Upload
        </button>
      </div>
      <div className="top-section">
        <div className="etf-table-container">
          <h2>ETF Table</h2>
          <DataTable data={etfTableData} />
        </div>
        <div className="bar-chart-container">
          <h2>Top 5 Holdings</h2>
          <DataBarChart data={latestTop5Holdings} />
        </div>
      </div>
      <div className="etf-price-graph-container">
        <h2>ETF Price Over Time</h2>
        <DataGraph data={etfPriceByTime} />
      </div>
    </div>
  )
}

export default App;