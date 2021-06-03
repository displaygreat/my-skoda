import "./App.css";
import React from "react";
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
import Parse from "parse";

import { useHistory } from "react-router-dom";
import { useData } from "./shared/dataContext";
import ScrollToTop from "./shared/ScrollToTop";

Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
Parse.initialize(
  "Iwo7VyOadOaF4eiiOJjWPPRpYkypMvslH1TxL1Jq", // This is your Application ID
  "eRJ2OisGhdgtimmV0E815KDSnEcmogdtUZqxFnc1" // This is your Javascript key
);

const App = () => {
  const { setValues, data } = useData();
  const history = useHistory();

  const HandleLogIn = (activeUser) => {
    console.log(activeUser);
    setValues(activeUser);
    localStorage.activeUser = JSON.stringify(activeUser);
    window.location = "#/my-skoda";
  };

  const HandleLogOut = () => {
    setValues(null);
    localStorage.removeItem("activeUser");
  };

  const GetVehicle = (vehicle) => {
    console.log(vehicle);
    setValues(vehicle);
    localStorage.vehicle = JSON.stringify(vehicle);
  };

  const RemoveVehicle = () => {
    setValues(null);
    localStorage.removeItem("vehicle");
  };

  const HandleSignupOne = (vehicle, email) => {
    setValues({ newUserVehicle: vehicle, newUserEmail: email });
    console.log(vehicle, email);
    // history.push("./signup-step-two");
    window.location = "#/signup-step-two";
  };

  return (
    <HashRouter basename="/">
      <ScrollToTop />
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
  );
};

export default App;
