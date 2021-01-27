import './MySkodaPage.css';
import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import MySkodaData from '../components/MySkodaData/MySkodaData';
import MySkodaNavbar from '../components/MySkodaNavbar/MySkodaNavbar';
import Parse from 'parse';

class MySkodaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCarPlate: this.props.sendUserCarPlate
    }
  }
  //check for if this plate number exists
  // getAllPlateNumbers = () => {
  //   const user = Parse.Object.extend("User");

  //   // Creates a new Query object to help us fetch MyCustomClass objects
  //   const query = new Parse.Query(user);

  //   // Executes the query, which returns an array of MyCustomClass
  //   query.find().then(results => {
  //     console.log(results);
  //     console.log(`ParseObjects found: ${JSON.stringify(results)}`);
  //     for(let i=0; i<results.length; i++) {

  //     let plateNumber = results[i].attributes.plateNumber;
  //     console.log(plateNumber);
  //     }
  //   });
  // }

  render() {
    return(
      <div className="c-my-skoda-page">
         <MySkodaNavbar />
        <Container>
        <MySkodaData sendUserCarPlate={this.state.userCarPlate} />
        {/* <button onClick={this.getAllPlateNumbers}></button> */}
      </Container>
      <div className="footer">
            <Container>
            <Nav as="ul">
              <Nav.Item as="li">
                <Nav.Link className="footer-link" href="#">Terms of use</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link className="footer-link" href="#">Contacts</Nav.Link>
              </Nav.Item>
            </Nav>
            </Container>
          </div>
      </div>
    )
  }
}
export default MySkodaPage;