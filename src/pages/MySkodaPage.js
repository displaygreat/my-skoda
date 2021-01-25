import './MySkodaPage.css';
import React from 'react';
import { Container } from 'react-bootstrap';

class MySkodaPage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
      <Container>
        <div>
          <h1>My Skoda: </h1>
          <img src="https://via.placeholder.com/150/92c952" /> 
          <p>license-plate-number:: </p>
          <p>make: </p>
          <p>model: </p>
          <p>year: </p>
          <p>last annual vehicle licensing test: </p>
          <p>valid car licence: </p>
          <p>VIN: </p>
        </div>
      </Container>
      
    // "license-plate-number": "37559002",
    // "make": "Skoda",
    // "model": "Octavia",
    // "year": "2010",
    // "last annual vehicle licensing test": "2021-01-01",
    // "valid car licence": "2021-12-31",
    // "VIN": "TMBAP7NX3MY027070"
    )
  }
}
export default MySkodaPage;