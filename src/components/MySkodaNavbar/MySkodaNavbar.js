import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import './MySkodaNavbar.css';

class MySkodaNavbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div class="navbar-myskoda">
        <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
          <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="myskoda-nav-link" href="/"><span className="myskoda-label">my<span className="letter-green">Skoda</span></span></Nav.Link>
              <Nav.Link className="myskoda-nav-link" href="#features">Service Centers</Nav.Link>
              <Nav.Link className="myskoda-nav-link" href="#pricing">Schedule Service</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className="myskoda-nav-link" href="#deets">More deets</Nav.Link>
              <Nav.Link className="myskoda-nav-link" eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default MySkodaNavbar;