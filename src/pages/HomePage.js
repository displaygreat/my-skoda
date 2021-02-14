import React from 'react';
import { Container, Col, Image, Row, Button } from 'react-bootstrap';
import './HomePage.css';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';
import skodaBlack from '../assets/img/skoda-black-logo.jpg';
import skodaLogo from '../assets/img/skoda-logo.png';
import chevronRight from '../assets/img/chevron-right.png';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClickOnHomeButton = () => {
    window.location = '#/login';
    console.log('hi');
  }

  render() {
    return(
      <div className="home-page">
        <Container className="main">
          <Row>
            <Col className="home-column" xs={12} md={8}>
              <span className="home-label">my<span className="letter-green">Skoda</span></span>
              <div className="home-img-wrap">
                <Image className="home-img" src={skodaBlack} rounded />
                <h2 className="home-title">The<br/>digital<br/>access<br/>to<br/>your<br/>Skoda
                </h2>
              </div>
            </Col>
            <Col className="home-column" xs={12} md={4}>
              <Image className="logo" src={skodaLogo} rounded />
              <h4 className="home-subtitle">Welcome to My Skoda!</h4>
              <p className="home-text">mySkoda gives you access to all the digital services from Skoda. Access important vehicle data, manage your data, and set up services.</p>
              <Button className="home-button" variant="success" onClick={this.handleClickOnHomeButton}>Let's go<Image src={chevronRight} /></Button>
            </Col>
          </Row>
        </Container>
        <MySkodaFooter />
      </div>
    )
  }
}
export default HomePage;