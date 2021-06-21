import "./ScheduleServicePage.css";
import React from "react";
import ScheduleService from "../components/ScheduleService/ScheduleService";
import MySkodaFooter from "../components/MySkodaFooter/MySkodaFooter";
import { Container } from "react-bootstrap";

const ScheduleServicePage = () => {
  return (
    <div className="p-shedule-service-page">
      <Container className="main">
        <ScheduleService />
      </Container>
      <MySkodaFooter />
    </div>
  );
};
export default ScheduleServicePage;
