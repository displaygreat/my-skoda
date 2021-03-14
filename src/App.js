import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import MySkodaNavbar from './components/MySkodaNavbar/MySkodaNavbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupStepTwo from './pages/SignupStepTwo';
import SignupStepOne from './pages/SignupStepOne';
import MySkodaPage from './pages/MySkodaPage';
import SheduleServicePage from './pages/SheduleServicePage';
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
      activeUser: null,
      userId: '',
      userEmail: '',
      userPwd: '',
      userCarPlate: '',
    }
  }

  handleLogin = (email) => {
    this.setState({
      activeUser: email
    })
  }

  handleLogOut = () => {
    this.setState({
      activeUser: null,
      userId: '',
      userEmail: '',
      userPwd: '',
      userCarPlate: ''
    })
  }

  handleCallbackUserId = (id) => {
    this.setState({
      userId: id
    });
  }

  handleCallbackUserEmail = (email) => {
    this.setState({
      userEmail: email
    });
  }

  handleCallbackUserPwd = (pwd) => {
    this.setState({
      userPwd: pwd
    });
  }

  handleCallbackUserCarPlate = (plate) => {
    this.setState({
      userCarPlate: plate
    });
  }

  render() {
    return (
      <HashRouter basename='/'>
        <Route exact path={['/shedule', '/my-skoda']} >
          <MySkodaNavbar handleLogOut={this.handleLogOut} activeUser={this.state.activeUser}/>
        </Route>
        <Switch>
          <Route exact path="/" component={HomePage}>
            <HomePage />
          </Route>
          <Route path="/shedule" component={SheduleServicePage}>
            <SheduleServicePage sendUserCarPlate={this.state.userCarPlate} sendUserId={this.state.userId} activeUser={this.state.activeUser} />
          </Route>
          <Route path="/my-skoda" component={MySkodaPage}>
            <MySkodaPage sendUserCarPlate={this.state.userCarPlate} sendUserId={this.state.userId} activeUser={this.state.activeUser} />
          </Route>
          <Route path="/signup-step-one" component={SignupStepOne}>
            <SignupStepOne callbackUserCarPlate={this.handleCallbackUserCarPlate} callbackUserEmail={this.handleCallbackUserEmail}/>
          </Route>
          <Route path="/signup-step-two" component={SignupStepTwo}>
            <SignupStepTwo callbackUserPwd={this.handleCallbackUserPwd} sendUserEmail={this.state.userEmail} sendUserCarPlate={this.state.userCarPlate}/>
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
