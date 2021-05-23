import "./MySkodaPage.css";
import React, { useEffect, useContext, useState } from "react";
import { Container } from "react-bootstrap";
import ServiceCalendar from "../components/ServiceCalendar/ServiceCalendar";
import MySkodaService from "../components/MySkodaService/MySkodaService";
import MySkodaData from "../components/MySkodaData/MySkodaData";
import MySkodaFooter from "../components/MySkodaFooter/MySkodaFooter";
import govData from "../shared/govData";
import UserContext from "../shared/userContext";

const MySkodaPage = () => {
  // const { getVehicle } = props;
  // const activeUser = useContext(UserContext);
  // console.log(activeUser);

  // // const [user, setUser] = useState("");
  // const [plate, setPlate] = useState("");
  // // console.log(user);
  // console.log(plate);

  // // let plate;
  // // if (!activeUser || activeUser === "undefind") {
  // //   window.location = "#/login";
  // // } else {
  // //   plate = activeUser.plateNumber;
  // //   console.log(plate);
  // // }

  // useEffect(() => {
  //   // setUser(activeUser);
  //   setPlate(activeUser.attributes.plateNumber);
  //   console.log(activeUser.attributes.plateNumber);
  //   data(plate).then(
  //     (res) => {
  //       console.log(res);
  //       getVehicle(res);
  //     },
  //     (err) => {
  //       console.log(err, "server error");
  //     }
  //   );
  // }, [plate]);

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
