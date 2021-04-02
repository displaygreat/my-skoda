import './ScheduleServicePage.css';
import React from 'react';
import ScheduleService from '../components/ScheduleService/ScheduleService';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';
import { Container } from 'react-bootstrap';

class ScheduleServicePage extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   userCarPlate: this.props.sendUserCarPlate,
    //   userId: this.props.sendUserId,
    //   activeUser: this.props.activeUser
    // }
    console.log(this.props);
  }
  componentDidMount = () => {
    if (this.props.activeUser === null) {
      window.history.forward();
    }
  }

  render() {
    return(
      <div className="p-shedule-service-page">
        <Container className="main">
          <ScheduleService userCarPlate={this.props.userCarPlate} userId={this.props.userId} lastInspection={this.props.lastInspection} />
        </Container>
        <MySkodaFooter />
      </div>
    )
  }
}
export default ScheduleServicePage;