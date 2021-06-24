import "./ScheduleService.css";
import React from "react";
import { Image } from "react-bootstrap";
import moment from "moment";
import superb from "../../assets/img/superb.jpg";
import octavia from "../../assets/img/octavia.jpg";
import karoq from "../../assets/img/karoq.jpg";
import ScheduleForm from "../ScheduleForm/ScheduleForm";
import { useData } from "../../shared/dataContext";

const ScheduleService = () => {
  const { data } = useData();

  let lastTest = moment(data.mivchan_acharon_dt).format("DD/MM/YYYY");
  let lastInspection = data.lastInspection;

  return (
    <div className="c-schedule-service">
      <div className="col-sm-12 col-md-5">
        <h1 className="display-4 my-skoda-title ml-0">
          Schedule Service Appointment
        </h1>
        <p className="text-regular text-bg last ml-0">
          your last annual vehicle licensing test: <strong>{lastTest}</strong>
        </p>
        {lastInspection === "" || lastInspection === undefined ? (
          <p className="text-regular text-bg last ml-0">
            your last multi-point inspection:
            <br />{" "}
            <small>
              Choose date for your first inspection in our dealer centers
            </small>
          </p>
        ) : (
          <p className="text-regular text-bg last ml-0">
            your last multi-point inspection: <strong>{lastInspection}</strong>
          </p>
        )}
        <ScheduleForm />
      </div>
      <div className="col-sm-12 col-md-5 rounded">
        <h3 className="title-discount">
          Schedule your visit online and get 10% discount for service
        </h3>
        <div className="wrap-shedule-img">
          <Image src={superb} className="shedule-img" />
        </div>
        <div className="wrap-shedule-img">
          <Image src={octavia} className="shedule-img" />
        </div>
        <div className="wrap-shedule-img">
          <Image src={karoq} className="shedule-img" />
        </div>
      </div>
    </div>
  );
};
export default ScheduleService;
