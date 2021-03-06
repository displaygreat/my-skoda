import React from "react";
import "./MySkodaData.css";
import { Image } from "react-bootstrap";
import skodaThen from "../../assets/img/skoda-then.svg";
import moment from "moment";
import { useData } from "../../shared/dataContext";

const MySkodaData = () => {
  const { data } = useData();
  console.log(data);

  let carMake = data.tozeret_nm === `סקודה צ'כיה` ? "Skoda" : "";
  let carModel = data.kinuy_mishari;
  let userCarPlate = data.mispar_rechev;
  let carYear = data.shnat_yitzur;
  let carLicense = moment(data.tokef_dt).format("DD/MM/YYYY");
  let carVIN = data.misgeret;

  return (
    <div className="c-my-skoda-data col-md-6 col-lg-4">
      <h1 className="display-4 my-skoda-title">My Vehicle</h1>
      <div className="wrap-vehicle-info">
        <span className="text-black">{carMake}</span>
        <span className="text-green">{carModel}</span>
        <span className="text-small">plate number</span>
        <span
          className="rounded-pill border border-2 shadow-sm plate-number"
          bg="light"
        >
          {userCarPlate}
        </span>
        <span className="text-small">year</span>
        <span className="year">{carYear}</span>
        <div className="wrap-vehicle-img">
          <Image src={skodaThen} alt="skoda icon" />
        </div>
        <p className="text-center">
          valid car license: <span className="text-bg">{carLicense}</span>
        </p>
        <code>VIN:{carVIN}</code>
      </div>
    </div>
  );
};
export default MySkodaData;
