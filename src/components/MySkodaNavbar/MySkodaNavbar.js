import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import './MySkodaNavbar.css';
import skodaLogo from '../../assets/img/skoda-logo.png';


class MySkodaNavbar extends React.Component {
  constructor(props) {
    super(props);
  }
  handleLogOut = () => {
    this.props.handleLogOut();
    window.location = '#';
  }

  render() {
    return(
      <div class="c-my-skoda-navbar">
        <Navbar collapseOnSelect expand="lg" bg="light">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="nav-links-wrap mr-auto">
                  <Navbar.Brand className="d-flex align-items-center" href="#"><span className="my-skoda-label">my<span className="letter-green">Skoda</span></span>
                    <img
                      src={skodaLogo}
                      width="30"
                      height="30"
                      className="my-skoda-logo"
                      alt="skoda logo"
                    />
                  </Navbar.Brand>
                  <Nav.Link className="my-skoda-nav-link" href="#/my-skoda">My Skoda Services</Nav.Link>
                  <Nav.Link className="my-skoda-nav-link" href="#/shedule">Schedule Service</Nav.Link>
                </Nav>
                <Nav className="user align-items-center">
                  <span className="letter-green">{this.props.activeUser}</span>
                  <Nav.Link className="my-skoda-nav-link" href="#" onClick={this.handleLogOut}>
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