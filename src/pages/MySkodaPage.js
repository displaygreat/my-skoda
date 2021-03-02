import './MySkodaPage.css';
import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import ServiceCalendar from '../components/ServiceCalendar/ServiceCalendar';
import MySkodaService from '../components/MySkodaService/MySkodaService';
import MySkodaData from '../components/MySkodaData/MySkodaData';
import MySkodaNavbar from '../components/MySkodaNavbar/MySkodaNavbar';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';

class MySkodaPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      userId: this.props.sendUserId,
      userCarPlate: this.props.sendUserCarPlate,
      userLastTest: ''
    }
    console.log(this.state);
  }

  handleCallbackUserLastTest = (test) => {
    this.setState({
      userLastTest: test
    });
    console.log(this.state);
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

  // handleLogout = () => {
  //   this.setState({
  //     userId: '',
  //     userEmail: '',
  //     userCarPlate: '',
  //     userPwd: '',
  //     activeUser: null
  //   })
  // }

  render() {
    console.log(this.state.carTest, this.state.carMake);
    return(
      <div className="p-my-skoda-page">
        <MySkodaNavbar />
        <Container className="main">
          <MySkodaData sendUserCarPlate={this.state.userCarPlate} callbackUserLastTest={this.handleCallbackUserLastTest}/>
          <MySkodaService sendUserCarPlate={this.state.userCarPlate} sendUserId={this.state.userId}/>
          <ServiceCalendar />
        </Container>
       <MySkodaFooter />
      </div>
    )
  }
}
export default MySkodaPage;