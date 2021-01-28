import React from 'react';
import { Container, Col, Image, Row, Button, Nav } from 'react-bootstrap';
import './HomePage.css';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClickOnHomeButton = () => {
    window.location = '/#/login';
    console.log('hi');
  }

  render() {
    return(
      <div className="wrapper">
        <div className="main">
        <Container >
         <Row>
            <Col className="column column-aside" xs={12} md={8}>
              <span className="myskoda-home-label">my<span className="letter-green">Skoda</span></span>
              <div className="wrap-home-img">
                <Image className="home-img" src="img/skoda-black-logo.jpg" rounded />
              </div>
              <h2 className="home-title">The<br/>digital<br/>access<br/>to<br/>your<br/>Skoda
              </h2>
            </Col>
            <Col className="column column-aside pt-5" xs={12} md={4}>
              <Image className="logo" src="img/skoda-logo-min.png" rounded />
              <h4 className="home-subtitle">Welcome to My Skoda!</h4>
              <p className="home-text">mySkoda gives you access to all the digital services from Skoda. Access important vehicle data, manage your data, and set up services.</p>
              <Button className="home-button" variant="success" onClick={this.handleClickOnHomeButton}>Let's go<Image src="img/chevron-right.png" /></Button>
            </Col>
            </Row>
          </Container>
          </div>
          <MySkodaFooter />
      </div>
    )
  }
}
export default HomePage;