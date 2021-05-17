import "./MySkodaPage.css";
import React, { useEffect } from "react";
// import axios from 'axios';
// import moment from 'moment';
import { Container } from "react-bootstrap";
import ServiceCalendar from "../components/ServiceCalendar/ServiceCalendar";
import MySkodaService from "../components/MySkodaService/MySkodaService";
import MySkodaData from "../components/MySkodaData/MySkodaData";
import MySkodaFooter from "../components/MySkodaFooter/MySkodaFooter";
import data from "../shared/data";
import { useContext } from "react";
import UserContext from "../shared/userContext";

const MySkodaPage = (props) => {
  const { getVehicle } = props;
  const activeUser = useContext(UserContext);
  console.log(activeUser);
  let plate;
  if (!activeUser || activeUser === "undefind") {
    window.location = "#/login";
  } else {
    plate = activeUser.plateNumber;
    console.log(plate);
  }

  useEffect(() => {
    data(plate).then(
      (res) => {
        console.log(res);
        getVehicle(res);
      },
      (err) => {
        console.log(err, "server error");
      }
    );
  }, []);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activeUser: this.props.activeUser,
  //     userCarPlate: this.props.sendUserCarPlate,
  //     lastInspection: this.props.lastInspection,
  //     carMake: '',
  //     carModel: '',
  //     carYear: '',
  //     carTest: '',
  //     carLicense: '',
  //     carVIN: ''
  //   }
  // }

  // componentDidMount () {
  //   if (this.state.activeUser === null) {
  //     window.history.forward();
  //   }
  //   let plate = this.state.userCarPlate;
  //   axios.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={%22mispar_rechev%22:[%22${plate}%22]}`)
  //   .then((result) => {
  //     let data = result.data.result.records[0];
  //     let make = data.tozeret_nm;
  //     if(make === `סקודה צ'כיה`) {
  //       make = "Skoda"
  //     }
  //     let model = data.kinuy_mishari;
  //     let year = data.shnat_yitzur;
  //     let test = moment(data.mivchan_acharon_dt).format('DD/MM/YYYY');
  //     let license = moment(data.tokef_dt).format('DD/MM/YYYY');
  //     let vin = data.misgeret;

  //     this.setState({
  //       carMake: make,
  //       carModel: model,
  //       carYear: year,
  //       carTest: test,
  //       carLicense: license,
  //       carVIN: vin
  //     })
  //   })
  // }

  // handleCallbackUserLastTest = (test) => {
  //   this.setState({
  //     userLastTest: test
  //   });
  // }

  // const { userCarPlate, carMake, carModel, carYear, carTest, carLicense, carVIN, lastInspection } = this.state;
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
