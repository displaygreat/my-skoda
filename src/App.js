import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import MySkodaNavbar from "./components/MySkodaNavbar/MySkodaNavbar";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupStepTwo from "./pages/SignupStepTwo";
import SignupStepOne from "./pages/SignupStepOne";
import MySkodaPage from "./pages/MySkodaPage";
import ScheduleServicePage from "./pages/ScheduleServicePage";
import UserContext from "./shared/userContext";
import VehicleContext from "./shared/vehicleContext";
import Parse from "parse";

import { useHistory } from "react-router-dom";
import { useData } from "./shared/dataContext";

Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
Parse.initialize(
  "Iwo7VyOadOaF4eiiOJjWPPRpYkypMvslH1TxL1Jq", // This is your Application ID
  "eRJ2OisGhdgtimmV0E815KDSnEcmogdtUZqxFnc1" // This is your Javascript key
);

const App = () => {
  // const [activeUser, setActiveUser] = useState(
  //   localStorage.activeUser ? JSON.parse(localStorage.activeUser) : null
  // );

  // const [vehicle, setVehicle] = useState(
  //   localStorage.vehicle ? JSON.parse(localStorage.vehicle) : null
  // );

  const { setValues, data } = useData();
  const history = useHistory();

  const HandleLogIn = (activeUser) => {
    console.log(activeUser);
    setValues(activeUser);
    // setActiveUser(activeUser);
    localStorage.activeUser = JSON.stringify(activeUser);
    window.location = "#/my-skoda";
  };

  const HandleLogOut = () => {
    // setActiveUser(null);
    setValues(null);
    localStorage.removeItem("activeUser");
  };

  const GetVehicle = (vehicle) => {
    console.log(vehicle);
    // setVehicle(vehicle);
    setValues(vehicle);
    localStorage.vehicle = JSON.stringify(vehicle);
  };

  const RemoveVehicle = () => {
    // setVehicle(null);
    setValues(null);
    localStorage.removeItem("vehicle");
  };

  const HandleSignupOne = (vehicle, email) => {
    setValues(vehicle, email);
    // history.push("./signup-step-two");
    window.location = "#/signup-step-two";
  };

  return (
    // <UserContext.Provider value={activeUser}>
    //   <VehicleContext.Provider value={vehicle}>
    <HashRouter basename="/">
      <Route exact path={["/schedule", "/my-skoda"]}>
        <MySkodaNavbar
          handleLogOut={HandleLogOut}
          removeVehicle={RemoveVehicle}
        />
      </Route>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/schedule">
          <ScheduleServicePage
            handleLogOut={HandleLogOut}
            removeVehicle={RemoveVehicle}
          />
        </Route>
        <Route path="/my-skoda">
          <MySkodaPage
            handleLogOut={HandleLogOut}
            removeVehicle={RemoveVehicle}
          />
        </Route>
        <Route path="/signup-step-one">
          <SignupStepOne handleSignupOne={HandleSignupOne} />
        </Route>
        <Route path="/signup-step-two">
          <SignupStepTwo />
        </Route>
        <Route path="/login">
          <LoginPage handleLogIn={HandleLogIn} getVehicle={GetVehicle} />
        </Route>
      </Switch>
    </HashRouter>
    //   </VehicleContext.Provider>
    // </UserContext.Provider>
  );
};

export default App;
