import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import MySkodaNavbar from "./components/MySkodaNavbar/MySkodaNavbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupStepTwo from "./pages/SignupStepTwo";
import SignupStepOne from "./pages/SignupStepOne";
import MySkodaPage from "./pages/MySkodaPage";
import ScheduleServicePage from "./pages/ScheduleServicePage";
import Parse from "parse";

const APP_ID = `${process.env.REACT_APP_APP_ID}`;
const JS_KEY = `${process.env.REACT_APP_JS_KEY}`;

Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
Parse.initialize(
  APP_ID, // This is your Application ID
  JS_KEY // This is your Javascript key
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
      userId: "",
      userEmail: "",
      userCarPlate: "",
      userLastInspection: "",
    };
  }

  handleLogin = (email) => {
    this.setState({
      activeUser: email,
    });
  };

  handleLogOut = () => {
    this.setState({
      activeUser: null,
      userId: "",
      userEmail: "",
      userCarPlate: "",
      userLastInspection: "",
    });
  };

  handleCallbackUserId = (id) => {
    this.setState({
      userId: id,
    });
  };

  handleCallbackUserEmail = (email) => {
    this.setState({
      userEmail: email,
    });
  };

  handleCallbackUserCarPlate = (plate) => {
    this.setState({
      userCarPlate: plate,
    });
  };

  handleCallbackLastInspection = (lastInspection) => {
    this.setState({
      userLastInspection: lastInspection,
    });
  };

  render() {
    const {
      activeUser,
      userId,
      userEmail,
      userCarPlate,
      userLastInspection,
    } = this.state;
    return (
      <HashRouter basename="/">
        <Route exact path={["/schedule", "/my-skoda"]}>
          <MySkodaNavbar
            handleLogOut={this.handleLogOut}
            activeUser={activeUser}
          />
        </Route>
        <Switch>
          <Route exact path="/" component={HomePage}>
            <HomePage />
          </Route>
          <Route path="/schedule" component={ScheduleServicePage}>
            <ScheduleServicePage
              activeUser={activeUser}
              userId={userId}
              userCarPlate={userCarPlate}
              lastInspection={userLastInspection}
            />
          </Route>
          <Route path="/my-skoda" component={MySkodaPage}>
            <MySkodaPage
              activeUser={activeUser}
              sendUserCarPlate={userCarPlate}
              lastInspection={userLastInspection}
            />
          </Route>
          <Route path="/signup-step-one" component={SignupStepOne}>
            <SignupStepOne
              callbackUserEmail={this.handleCallbackUserEmail}
              callbackUserCarPlate={this.handleCallbackUserCarPlate}
            />
          </Route>
          <Route path="/signup-step-two" component={SignupStepTwo}>
            <SignupStepTwo
              sendUserEmail={userEmail}
              sendUserCarPlate={userCarPlate}
            />
          </Route>
          <Route path="/login" component={LoginPage}>
            <LoginPage
              handleLogin={this.handleLogin}
              callbackUserId={this.handleCallbackUserId}
              callbackUserCarPlate={this.handleCallbackUserCarPlate}
              callbackLastInspection={this.handleCallbackLastInspection}
            />
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
