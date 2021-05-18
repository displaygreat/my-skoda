// import React, { useContext, useEffect, useState } from "react";
import "./MySkodaData.css";
import { Image } from "react-bootstrap";
import skodaThen from "../../assets/img/skoda-then.svg";
// import VehicleContext from "../../shared/vehicleContext";
import moment from "moment";
import { useData } from "../../shared/dataContext";

const MySkodaData = () => {
  const { setValues, data } = useData();
  console.log(data);

  let carMake = data.tozeret_nm === `סקודה צ'כיה` ? "Skoda" : "";
  let carModel = data.kinuy_mishari;
  let userCarPlate = data.mispar_rechev;
  let carYear = data.shnat_yitzur;
  let carLicense = moment(data.tokef_dt).format("DD/MM/YYYY");
  let carVIN = data.misgeret;

  // const vehicle = useContext(VehicleContext);

  // const [carMake, setCarMake] = useState("");
  // const [carModel, setCarModel] = useState("");
  // const [userCarPlate, setUserCarPlate] = useState("");
  // const [carYear, setCarYear] = useState("");
  // const [carLicense, setCarLicense] = useState("");
  // const [carVIN, setCarVIN] = useState("");

  // useEffect(() => {
  //   if (vehicle !== null) {
  //     setCarMake(vehicle.tozeret_nm === `סקודה צ'כיה` ? "Skoda" : "");
  //     setCarModel(vehicle.kinuy_mishari);
  //     setUserCarPlate(vehicle.mispar_rechev);
  //     setCarYear(vehicle.shnat_yitzur);
  //     setCarLicense(moment(vehicle.tokef_dt).format("DD/MM/YYYY"));
  //     setCarVIN(vehicle.misgeret);
  //   }
  // }, [vehicle]);

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
