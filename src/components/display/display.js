import React from "react";
import { Row, Table, Col, Button } from "react-bootstrap";
import { useState, useRef } from "react";
import extractCSVData from "./CsvExtractor";
import MapContainer from "./mapContainer";
import { motion } from "framer-motion";
import * as Icons from "react-bootstrap-icons";
import "./display.css";

const Display = (props) => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInput = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      extractCSVData(file)
        .then((data) => {
          setData(data); // Set the extracted data in your component's state
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleButtonClick = () => {
    // Trigger the hidden file input click event
    fileInput.current.click();
  };

  const initialRender = (
    <>
      <div align="center" style={{ height: "100vh" }}>
        <div className="no-scroll border border-5 border-dark">
          <div>
            <Icons.BagDash className="bagIcon" />
            <p>No file yet..</p>
          </div>
          <motion.div className="box m-auto" whileHover={{ scale: 1.2 }}>
            <Button onClick={handleButtonClick}>Upload CSV</Button>
            <input
              type="file"
              accept=".csv"
              ref={fileInput}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </motion.div>
        </div>
        <br />
        <div class="how-display icon-box rounded-3 about-box">
          <div class="homeicon">
            <div class="i">
              <Icons.FiletypeCsv className="abouticon" />
            </div>
          </div>
          <h4>Only CSV files</h4>
          <p style={{ fontSize: "17px" }}>
            Upload a .csv file that was collected from the rover, which contain
            Section ID, measurements, images, and GPS coordinates.
            <br />
            <br />
            Our web application parses the uploaded files and generates
            visualizations of the sidewalk data.
          </p>
        </div>
      </div>
    </>
  );

  const renderMeasurements = (
    <div class="mx-5">
      <div align="center">
        <motion.div className="box m-auto" whileHover={{ scale: 1.2 }}>
          <Button onClick={handleButtonClick}>Upload CSV</Button>
          <input
            type="file"
            accept=".csv"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </motion.div>
        <motion.div className="box m-auto" whileHover={{ scale: 1.2 }}>
          <Button variant="secondary">Upload to Database</Button>
        </motion.div>
      </div>
      <Row className="mb-3">
        <Col md={6}>
          <div class="tableContainer border border-5 border-dark">
            <Table striped variant="dark">
              <thead>
                <tr>
                  <th>Row #</th>
                  <th>Section ID</th>
                  <th>X-slope</th>
                  <th>Y-slope</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length > 0 &&
                  data.map((row, index) => (
                    <tr>
                      <td>{index}</td>
                      <td>{row[0]}</td>
                      <td>{row[3]}</td>
                      <td>{row[4]}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col md={6}>
          {data && data.length > 0 && (
            <div className="visuals border border-5 border-dark">
              <MapContainer sidewalkData={data} />
              <br />
              <h1>image here</h1>
            </div>
          )}
        </Col>
      </Row>

      <div>
        {/*data.map((row, index) => (
        <img
          key={index}
          src={row.Image_URL} // Assuming your CSV has an Image_URL column
          alt={`Section ${row.Section_ID}`}
          onClick={() => handleImageClick(row.Image_URL)}
          style={{ cursor: "pointer", margin: "10px" }}
        />
      ))*/}
      </div>
      {/* {selectedImage && (
      <div>
        <img
          src={selectedImage}
          alt="Selected"
          style={{ maxWidth: "100%" }}
        />
      </div>
    )} */}
    </div>
  );

  return (
    <div>
      <h1 align="center" class="my-5">
        DISPLAY SIDEWALK DATA
      </h1>
      {data.length > 0 ? renderMeasurements : initialRender}
    </div>
  );
};

export default Display;
