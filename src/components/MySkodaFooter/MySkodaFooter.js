// import '/MySkodaFooter.css';
import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import "./MySkodaFooter.css";

class MySkodaFooter extends React.Component {
  render() {
    return (
      <div className="c-my-skoda-footer">
        <Container>
          <Nav className="footer-nav" as="ul">
            <Nav.Item as="li">
              <Link className="footer-link" to="./">
                Terms of use
              </Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Link className="footer-link" to="./">
                Contacts
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </div>
    );
  }
}
export default MySkodaFooter;
