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

Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
Parse.initialize(
  "Iwo7VyOadOaF4eiiOJjWPPRpYkypMvslH1TxL1Jq", // This is your Application ID
  "eRJ2OisGhdgtimmV0E815KDSnEcmogdtUZqxFnc1" // This is your Javascript key
);

const App = () => {
  const [activeUser, setActiveUser] = useState(
    localStorage.activeUser ? JSON.parse(localStorage.activeUser) : null
  );

  const [vehicle, setVehicle] = useState(
    localStorage.vehicle ? JSON.parse(localStorage.vehicle) : null
  );

  const handleLogIn = (activeUser) => {
    console.log(activeUser);
    setActiveUser(activeUser);
    localStorage.activeUser = JSON.stringify(activeUser);
  };

  const handleLogOut = () => {
    setActiveUser(null);
    localStorage.removeItem("activeUser");
  };

  const getVehicle = (vehicle) => {
    console.log(vehicle);
    setVehicle(vehicle);
    localStorage.vehicle = JSON.stringify(vehicle);
  };

  const removeVehicle = () => {
    setVehicle(null);
    localStorage.removeItem("vehicle");
  };

  return (
    <UserContext.Provider value={activeUser}>
      <VehicleContext.Provider value={vehicle}>
        <HashRouter basename="/">
          <Route exact path={["/schedule", "/my-skoda"]}>
            <MySkodaNavbar handleLogOut={handleLogOut} />
          </Route>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/schedule">
              <ScheduleServicePage handleLogOut={handleLogOut} />
            </Route>
            <Route path="/my-skoda">
              <MySkodaPage handleLogOut={handleLogOut} />
            </Route>
            <Route path="/signup-step-one">
              <SignupStepOne />
            </Route>
            <Route path="/signup-step-two">
              <SignupStepTwo />
            </Route>
            <Route path="/login">
              <LoginPage handleLogIn={handleLogIn} getVehicle={getVehicle} />
            </Route>
          </Switch>
        </HashRouter>
      </VehicleContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
