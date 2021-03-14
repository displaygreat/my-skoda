import './MySkodaPage.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import ServiceCalendar from '../components/ServiceCalendar/ServiceCalendar';
import MySkodaService from '../components/MySkodaService/MySkodaService';
import MySkodaData from '../components/MySkodaData/MySkodaData';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';

class MySkodaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.sendUserId,
      userCarPlate: this.props.sendUserCarPlate,
      userLastTest: ''
    }
  }

  componentDidMount () {
    window.history.forward();
  }

  handleCallbackUserLastTest = (test) => {
    this.setState({
      userLastTest: test
    });
    console.log(this.state);
  }

  render() {
    console.log(this.state.carTest, this.state.carMake);
    return(
      <div className="p-my-skoda-page">
        <Container className="main">
          <MySkodaData sendUserCarPlate={this.state.userCarPlate} callbackUserLastTest={this.handleCallbackUserLastTest}/>
          <MySkodaService sendUserCarPlate={this.state.userCarPlate} sendUserId={this.state.userId}/>
          <ServiceCalendar />
        </Container>
        <MySkodaFooter />
      </div>
    )
  }
}
export default MySkodaPage;