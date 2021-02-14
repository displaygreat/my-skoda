// import '/MySkodaFooter.css';
import React from 'react';
import { Container, Nav } from 'react-bootstrap';

class MySkodaFooter extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div className="footer">
            <Container>
            <Nav className="footer-nav" as="ul">
              <Nav.Item as="li">
                <Nav.Link className="footer-link" href="/">Terms of use</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link className="footer-link" href="/">Contacts</Nav.Link>
              </Nav.Item>
            </Nav>
            </Container>
          </div>
    )
  }
}
export default MySkodaFooter;