import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignupLicensePage from './pages/SignupLicensePage';
import MySkodaPage from './pages/MySkodaPage';
import SheduleServicePage from './pages/SheduleServicePage';
// import ServiceCalendarPage from './pages/ServiceCalendarPage';
// import AppointmentPage from './pages/AppointmentPage';
import MySkodaNavbar from './components/MySkodaNavbar/MySkodaNavbar';
// import vehicleJSON from './data/vehicle.json';
import Parse from 'parse';
Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
    Parse.initialize(
      'Iwo7VyOadOaF4eiiOJjWPPRpYkypMvslH1TxL1Jq', // This is your Application ID
      'eRJ2OisGhdgtimmV0E815KDSnEcmogdtUZqxFnc1' // This is your Javascript key
    );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userEmail: '',
      userPwd: '',
      activeUser: null,
      isAdmin: false,
      userCarPlate: '',
      // userCarMake: '',
      // userCarModel: '',
      // userCarYear: '',
      // userLastTest: '',
      // userLastService: '',
      // userServiceCenter: '',
      // userServiceDate: ''
    }
    console.log(this.state);
  }

  handleLogin = (userObj) => {
    this.setState({
      activeUser: userObj
    })
  }

  handleLogout = () => {
    this.setState({
      activeUser: null
    })
  }

  handleCallbackUserEmail = (email) => {
    this.setState({
      userEmail: email
    });
    console.log(this.state);
  }

  handleCallbackUserCarPlate = (plate) => {
    this.setState({
      userCarPlate: plate
    });
    console.log(this.state);
  }

  handleCallbackUserPwd = (pwd) => {
    this.setState({
      userPwd: pwd
    });
    console.log(this.state);
  }

  handleCallbackUserId = (id) => {
    this.setState({
      userId: id
    });
    console.log(this.state);
  }

  render() {
    return (
          <HashRouter basename='/'>
            <Switch>
              <Route exact path="/" component={HomePage}>
                <HomePage />
              </Route>
              <Route path="/shedule" component={SheduleServicePage}>
                <SheduleServicePage sendUserCarPlate={this.state.userCarPlate} sendUserId={this.state.userId} />
              </Route>
              <Route path="/my-skoda" component={MySkodaPage}>
                <MySkodaPage sendUserCarPlate={this.state.userCarPlate} sendUserId={this.state.userId} />
              </Route>
              <Route path="/signup-license" component={SignupLicensePage}>
                <SignupLicensePage callbackUserCarPlate={this.handleCallbackUserCarPlate} callbackUserEmail={this.handleCallbackUserEmail}/>
              </Route>
              <Route path="/signup" component={SignupPage}>
                <SignupPage callbackUserPwd={this.handleCallbackUserPwd} sendUserEmail={this.state.userEmail} sendUserCarPlate={this.state.userCarPlate}/>
              </Route>
              <Route path="/login" component={LoginPage}>
                <LoginPage callbackUserEmail={this.handleCallbackUserEmail} sendUserEmail={this.state.userEmail} handleLogin={this.handleLogin} callbackUserCarPlate={this.handleCallbackUserCarPlate} callbackUserId={this.handleCallbackUserId}/>
              </Route>
            </Switch> 
          </HashRouter> 
      )
  }
}

export default App;
