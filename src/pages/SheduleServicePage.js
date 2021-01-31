import './SheduleServicePage.css';
import React from 'react';
import MySkodaNavbar from '../components/MySkodaNavbar/MySkodaNavbar';
import ServiceCalendar from '../components/ServiceCalendar/ServiceCalendar';
import SheduleService from '../components/SheduleService/SheduleService';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';
import { Container } from 'react-bootstrap';

class SheduleServicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCarPlate: this.props.sendUserCarPlate
    }
    console.log(this.state);
  }
  render() {
    return(
      <div>
        <MySkodaNavbar />
          <Container>
            <div className="c-shedule-service-page">
              <ServiceCalendar />
              <SheduleService sendUserCarPlate={this.state.userCarPlate} />
            </div>
          </Container>
        <MySkodaFooter />
      </div>
      
    )
  }
}
export default SheduleServicePage;