import './MySkodaPage.css';
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Container } from 'react-bootstrap';
import ServiceCalendar from '../components/ServiceCalendar/ServiceCalendar';
import MySkodaService from '../components/MySkodaService/MySkodaService';
import MySkodaData from '../components/MySkodaData/MySkodaData';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';

class MySkodaPage extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   userLastTest: ''
    // }
    this.state = {
      activeUser: this.props.activeUser,
      userId: this.props.sendUserId,
      userCarPlate: this.props.sendUserCarPlate,
      carMake: '',
      carModel: '',
      carYear: '',
      carTest: '',
      carLicense: '',
      carVIN: ''
    }
  }

  componentDidMount () {
    if (this.state.activeUser === null) {
      window.history.forward();
    }
    let plate = this.state.userCarPlate;
    console.log(plate);
    axios.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={%22mispar_rechev%22:[%22${plate}%22]}`)
    .then((result) => {
      let data = result.data.result.records[0];
      console.log(data);
      let make = data.tozeret_nm;
      if(make === `סקודה צ'כיה`) {
        make = "Skoda"
      }
      let model = data.kinuy_mishari;
      let year = data.shnat_yitzur;
      let test = moment(data.mivchan_acharon_dt).format('DD/MM/YYYY');
      let license = moment(data.tokef_dt).format('DD/MM/YYYY');
      let vin = data.misgeret;

      this.setState({
        carMake: make,
        carModel: model,
        carYear: year,
        carTest: test,
        carLicense: license,
        carVIN: vin
      })
    })
  }

  handleCallbackUserLastTest = (test) => {
    this.setState({
      userLastTest: test
    });
  }

  render() {
    const { userId, userCarPlate, carMake, carModel, carYear, carTest, carLicense, carVIN } = this.state;
    return(
      <div className="p-my-skoda-page">
        <Container className="main">
          <MySkodaData userCarPlate={userCarPlate} carMake={carMake} carModel={carModel} carYear={carYear} carLicense={carLicense} carVIN={carVIN} />
          <MySkodaService sendUserCarPlate={this.state.userCarPlate} sendUserId={this.state.userId}/>
          <ServiceCalendar />
        </Container>
        <MySkodaFooter />
      </div>
    )
  }
}
export default MySkodaPage;