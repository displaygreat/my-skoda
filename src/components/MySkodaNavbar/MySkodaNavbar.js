import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import './MySkodaNavbar.css';
import skodaLogo from '../../assets/img/skoda-logo.png';


class MySkodaNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  logOut = () => {
    this.setState({

    })
  }

  render() {
    return(
      <div class="myskoda-navbar">
        <Navbar collapseOnSelect expand="lg" bg="light">
          <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="myskoda-label-link" href="#"><span className="myskoda-label">my<span className="letter-green">Skoda</span></span></Nav.Link>
              <Navbar.Brand href="#">
                <img
                  src={skodaLogo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="skoda logo"
                />
              </Navbar.Brand>
              <Nav.Link className="myskoda-nav-link" href="#/dealers">Service Centers</Nav.Link>
              <Nav.Link className="myskoda-nav-link" href="#/shedule">Schedule Service</Nav.Link>
            </Nav>
            <Nav className="align-items-center">
              <Nav.Link className="myskoda-nav-link user-avatar-link d-flex align-items-center" href="#/account">
                <span>Oxana</span>
                <div className="wrap-user-avatar">
                  <img className="user-avatar" src="https://via.placeholder.com/150/92c952" />
                </div>
              </Nav.Link>
              <Nav.Link className="myskoda-nav-link" href="#" onClick={this.logOut}>
                LogOut
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