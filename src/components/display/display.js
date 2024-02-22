import React from "react";
import { Row, Table, Col } from "react-bootstrap";
import { useState } from "react";
import extractCSVData from "./CsvExtractor";
import MapContainer from "./mapContainer";

const Display = (props) => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  return (
    <div>
      <h1 align="center">DISPLAY SIDEWALK DATA</h1>
      <div>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <Table striped>
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
        {data && data.length > 0 && (
          <Row>
            <Col md={6}>
              <MapContainer sidewalkData={data} />
            </Col>
            <Col md={6}>
            <h1>image here</h1>
            </Col>
          </Row>
        )}
        <div>
          {
            /*data.map((row, index) => (
            <img
              key={index}
              src={row.Image_URL} // Assuming your CSV has an Image_URL column
              alt={`Section ${row.Section_ID}`}
              onClick={() => handleImageClick(row.Image_URL)}
              style={{ cursor: "pointer", margin: "10px" }}
            />
          ))*/
            <h1>image here</h1>
          }
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
    </div>
  );
};

export default Display;
