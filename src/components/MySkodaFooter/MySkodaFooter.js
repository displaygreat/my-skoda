// import '/MySkodaFooter.css';
import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import './MySkodaFooter.css';

class MySkodaFooter extends React.Component {

  render() {
    return(
      <div className="c-my-skoda-footer">
        <Container>
          <Nav className="footer-nav" as="ul">
            <Nav.Item as="li">
              <Nav.Link className="footer-link" href="/#">Terms of use</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link className="footer-link" href="/#">Contacts</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </div>
    )
  }
}
export default MySkodaFooter;