import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./MySkodaNavbar.css";
import skodaLogo from "../../assets/img/skoda-logo.png";
import { useData } from "../../shared/dataContext";

const MySkodaNavbar = (props) => {
  const { handleLogOut } = props;
  const { data } = useData();

  const logOut = () => {
    handleLogOut();
    window.location = "#";
  };

  return (
    <div className="c-my-skoda-navbar">
      <Navbar fixed="top" collapseOnSelect expand="md" bg="light">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto align-items-center">
              <Navbar.Brand href="#">
                <span className="my-skoda-label">
                  my<span className="letter-green">Skoda</span>
                </span>
                <img
                  src={skodaLogo}
                  width="30"
                  height="30"
                  className="my-skoda-logo"
                  alt="skoda logo"
                />
              </Navbar.Brand>
              <Nav.Link href="#/my-skoda">My Skoda Services</Nav.Link>
              <Nav.Link href="#/schedule">Schedule Service</Nav.Link>
            </Nav>
            <Nav className="user align-items-center">
              <span className="letter-green">{data.username}</span>
              <Nav.Link href="#" onClick={logOut}>
                LogOut
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MySkodaNavbar;
