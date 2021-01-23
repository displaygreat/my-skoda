import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignupLicensePage from './pages/SignupLicensePage';
import MySkodaPage from './pages/MySkodaPage';
// import ServiceCalendarPage from './pages/ServiceCalendarPage';
// import AppointmentPage from './pages/AppointmentPage';
// import MySkodaNavbar from './components/MySkodaNavbar/MySkodaNavbar';
// import vehicleJSON from './data/vehicle.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: ''
    }
  }

  handleCallbackUserEmail = (email) => {
    this.setState({
      userEmail: email
    });
  }

  render() {
    return (
          <HashRouter>
            {/* <Route exact path={['/myskoda', '/service-calendar', '/appointment']}>
              <MySkodaNavbar />
            </Route> */}
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                {/* <Route exact path="/appointment">
                  <AppointmentPage />
                </Route> */}
                {/* <Route exact path="/service-calendar">
                  <ServiceCalendarPage />
                </Route> */}
                <Route exact path="/myskoda">
                  <MySkodaPage />
                </Route>
                <Route exact path="/login">
                  <LoginPage sendUserEmail={this.state.userEmail}/>
                </Route>
                <Route exact path="/signup-license">
                  <SignupLicensePage />
                </Route>
                <Route exact path="/signup">
                  <SignupPage />
                </Route>
                <Route exact path="/welcome">
                  <WelcomePage callbackUserEmail={this.handleCallbackUserEmail} />
                </Route>
              </Switch> 
        </HashRouter>
      )
  }
}

export default App;
