import React from 'react';
import { Container, Button, Col, Image, Form, Alert } from 'react-bootstrap';
import './SignupStepOne.css';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';
import skodaLogo from '../assets/img/skoda-logo.png';
import skodaSignup from '../assets/img/skoda-signup.jpg';


class SignupStepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCarPlate: '',
      userEmail: '',
      hideErrorCarPlate: true,
      hideErrorEmail: true,
      hideAlertRequired: true,
      hideAlertIsExist: true
    }
  }

  handleChangeInputPlate = (e) => {
     e.preventDefault();
     this.setState({
      userCarPlate: e.target.value,
      hideAlertRequired: true,
      hideErrorCarPlate: true,
      hideErrorEmail: true,
      hideAlertIsExist: true
     })
     this.validateCarPlate(e.target.value);
  }

   handleChangeInputEmail = (e) => {
    e.preventDefault();
    this.setState({
      userEmail: e.target.value,
      hideAlertRequired: true,
      hideErrorCarPlate: true,
      hideErrorEmail: true,
      hideAlertIsExist: true
    });
    this.validateEmail(e.target.value);
  }

  validateCarPlate = (carPlate) => {
    let carPlateRegex = /^\d{7,8}$/;
    let result = carPlateRegex.test(carPlate);
    if(!result) {
      this.setState({
        hideErrorCarPlate: false
      })
    }
    if(result) {
      this.setState({
        hideErrorCarPlate: true
      })
    }
  }

  validateEmail = (email) => {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let result = emailRegex.test(email);
    if(!result) {
      this.setState({
        hideErrorEmail: false
      })
    }
    if(result) {
      this.setState({
        hideErrorEmail: true
      })
    }
  }
  
  getVehicle = async (e) => {
    e.preventDefault();
    let sentPlate = this.state.userCarPlate;
    let sentEmail = this.state.userEmail;
    
    if (sentPlate === '' || sentEmail === '') {
      this.setState({
        hideAlertRequired: false
      })
      return;
    }

    try {
      const apiUrl = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={%22mispar_rechev%22:[%22${sentPlate}%22]}`);
      if(!apiUrl.ok) {
        throw new Error(apiUrl.statusText);
      }
      const data = await apiUrl.json();
      let receivedPlate = data.result.records[0].mispar_rechev;
      if(receivedPlate === +sentPlate) {
        this.props.callbackUserCarPlate(sentPlate);
        this.props.callbackUserEmail(sentEmail);
        window.location = '#/signup-step-two';
      }
    } catch (error) {
      console.log(error);
      this.setState({
        userCarPlate: '',
        userEmail: '',
        hideAlertIsExist: false
      })
    }
  }

  handleClickOnBackButton() {
    window.location = '#/login';
  }

  render() {
    return(
      <div className="p-signup-step-one">
        <Container className="main">
          <Col className="signup-column" xs={12} md={4}>
            <span className="myskoda-signup-label">my<span className="letter-green">Skoda</span></span>
            <h4>Create account</h4>
            <span className="step">Step 1</span>
            <p className="text">for My Skoda</p>
            <Form>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>License plate number</Form.Label>
                <Form.Control type="text" placeholder="License plate number" value={this.state.userCarPlate} onChange={this.handleChangeInputPlate} />
                <Form.Text className="text-muted" hidden={this.state.hideErrorCarPlate}>
                  License plate number should contain 7 or 8 digits
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={this.state.userEmail} onChange={this.handleChangeInputEmail}/>
                <Form.Text className="text-muted" hidden={this.state.hideErrorEmail}>
                  Email should include '@' and '.' Email could contain english letters, numbers and symbols 
                </Form.Text>
              </Form.Group>
              <Alert className="error-alert" hidden={this.state.hideAlertRequired} onClose={() => this.setState({hideAlertRequired: true})} dismissible>
                <p className="m-0">All fields are required</p>
              </Alert>
              <Alert className="error-alert" hidden={this.state.hideAlertIsExist} onClose={() => this.setState({hideAlertIsExist: true})} dismissible>
                <p className="m-0">Check license plate number<br/>and email</p>
              </Alert>
              <div className="prev-next-buttons">
                <Button className="prev-button" variant="outline-success" onClick={this.handleClickOnBackButton}>Back</Button>
                <Button className="next-button" type="submit" variant="success" onClick={this.getVehicle}>Next
                </Button>
              </div>
            </Form>
          </Col>
          <Col className="signup-column" xs={12} md={8}>
            <Image className="logo" src={skodaLogo}rounded />
            <div className="signup-img-wrap">
              <Image className="signup-img" src={skodaSignup} rounded />
            </div>
          </Col>
        </Container>
        <MySkodaFooter />
      </div>
    )
  }
}
export default SignupStepOne;