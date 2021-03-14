import './SheduleServicePage.css';
import React from 'react';
import SheduleService from '../components/SheduleService/SheduleService';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';
import { Container } from 'react-bootstrap';

class SheduleServicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCarPlate: this.props.sendUserCarPlate,
      userId: this.props.sendUserId
    }
  }
  componentDidMount = () => {
    window.history.forward();
  }
  
  render() {
    return(
      <div className="p-shedule-service-page">
          <Container className="main">
            <SheduleService sendUserCarPlate={this.state.userCarPlate} sendUserId={this.state.userId} />
          </Container>
        <MySkodaFooter />
      </div>
    )
  }
}
export default SheduleServicePage;