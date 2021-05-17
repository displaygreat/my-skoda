import React, { useContext } from "react";
import "./MySkodaData.css";
import { Image } from "react-bootstrap";
import skodaThen from "../../assets/img/skoda-then.svg";
import VechicleContext from "../../shared/vehicleContext";
import moment from "moment";

const MySkodaData = () => {
  const vehicle = useContext(VechicleContext);
  let carMake = vehicle.tozeret_nm;
  if (carMake === `סקודה צ'כיה`) {
    carMake = "Skoda";
  }
  let carModel = vehicle.kinuy_mishari;
  let userCarPlate = vehicle.mispar_rechev;
  let carYear = vehicle.shnat_yitzur;
  // let test = moment(vehicle.mivchan_acharon_dt).format('DD/MM/YYYY');
  let carLicense = moment(vehicle.tokef_dt).format("DD/MM/YYYY");
  let carVIN = vehicle.misgeret;
  // const { userCarPlate, carMake, carModel, carYear, carLicense, carVIN } =
  //   this.props;
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
