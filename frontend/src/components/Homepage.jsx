// src/components/Homepage.jsx
import React, { useState } from "react";
import axios from "axios";
import "./Homepage.css";

const Homepage = () => {
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please try again.");
    }
  };

  return (
    <div className="homepage">
      <h1>Welcome to DataVizHub</h1>
      <p>
        Upload your dataset, analyze data, and generate insightful
        visualizations.
      </p>

      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Data</button>
      </div>

      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Data Upload & Cleaning</li>
          <li>Statistical Analysis</li>
          <li>Data Visualization</li>
          <li>Report Exporting</li>
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
