import "./MySkodaPage.css";
import React from "react";
import { Container } from "react-bootstrap";
import ServiceCalendar from "../components/ServiceCalendar/ServiceCalendar";
import MySkodaService from "../components/MySkodaService/MySkodaService";
import MySkodaData from "../components/MySkodaData/MySkodaData";
import MySkodaFooter from "../components/MySkodaFooter/MySkodaFooter";

const MySkodaPage = () => {
  return (
    <div className="p-my-skoda-page">
      <Container className="main">
        <MySkodaData />
        <MySkodaService />
        <ServiceCalendar />
      </Container>
      <MySkodaFooter />
    </div>
  );
};
export default MySkodaPage;
