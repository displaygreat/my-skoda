import "./MySkodaService.css";
import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import VechicleContext from "../../shared/vehicleContext";
import UserContext from "../../shared/userContext";
import moment from "moment";

const MySkodaService = () => {
  const vehicle = useContext(VechicleContext);
  const activeUser = useContext(UserContext);
  let carTest = moment(vehicle.mivchan_acharon_dt).format("DD/MM/YYYY");
  let lastInspection;
  if (!activeUser || activeUser === "undefind") {
    window.location = "#/login";
  } else {
    lastInspection = activeUser.lastInspection;
    console.log(lastInspection);
  }

  return (
    <div className="c-my-skoda-service col-md-6 col-lg-4">
      <h1 className="display-4 my-skoda-title">Vehicle Service</h1>
      <p className="text-green">Common Skoda Service</p>
      <Card className="mb-4">
        <Card.Body>
          <p className="text-regular">
            Inspection Before Annual Vehicle Licensing Test
          </p>
          <p className="text-regular text-bg">
            your last annual vehicle licensing test: <strong>{carTest}</strong>
          </p>
          <strong>Recommended</strong>
          <p className="text-regular">See your service calendar</p>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Body>
          <p className="text-regular">Multi-Point Inspection</p>
          <p className="text-regular text-bg">
            your last multi-point inspection:{" "}
            {lastInspection ? (
              <strong>{lastInspection}</strong>
            ) : (
              <span className="text-small">
                Unfortunately, you haven't been serviced in our dealer centers
                yet
              </span>
            )}
          </p>
          <span className="text-small">Full Synthetic Oil Change</span>
          <span className="text-small">Tire Rotation</span>
          <span className="text-small">Windshield Wiper Replacement</span>
          <span className="text-small">Four-Wheel Alignment</span>
          <strong>Recommended</strong>
          <p className="text-regular">Every 10,000 Miles or Once a Year </p>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Body>
          <p className="text-regular">Get your vehicle winter/summer ready</p>
          <span className="text-small">Winter Inspection</span>
          <span className="text-small">Summer Inspection</span>
          <strong>Recommended</strong>
          <p className="text-regular">Every May and November of every year</p>
        </Card.Body>
      </Card>
    </div>
  );
};
export default MySkodaService;
