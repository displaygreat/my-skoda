import './MySkodaService.css';
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Parse from 'parse';
import axios from 'axios';
import moment from 'moment';

class MySkodaService extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      userId: this.props.sendUserId,
      userCarPlate: this.props.sendUserCarPlate,
      carMake: '',
      carModel: '',
      carYear: '',
      carTest: '',
      carLicense: '',
      carVIN: '',
      carLastService: ''
    }
    console.log(this.state);
  }

  componentDidMount () {
    let plate = this.props.sendUserCarPlate;
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
      // let test = data.mivchan_acharon_dt;
      let license = moment(data.tokef_dt).format('DD/MM/YYYY');
      let vin = data.misgeret;
      console.log(make, model, year, test, license, vin);
      // this.props.callbackUserLastTest(test);
      this.setState({
        carMake: make,
        carModel: model,
        carYear: year,
        carTest: test,
        carLicense: license,
        carVIN: vin
      })
    })

    const User = new Parse.User();
    const query = new Parse.Query(User);
    query.get(this.state.userId).then((user) => {
      console.log(user);
      const lastInspection = user.attributes.lastInspection;
      this.setState({
        carLastService: lastInspection
      })

    }, (error) => {
      
      console.error('Error while fetching Vehicle', error);
    });
  
  }

  render() {
    console.log(this.state.carLastService);
    return(
      <div class="c-my-skoda-service">
        <h1 className="display-4 my-skoda-title">Vehicle Service</h1>
        <Col>
              <p class="text-green">Common Skoda Service</p>
              <Card className="mb-4">
                <Card.Body>
                  <p className="text-regular">Inspection Before Annual Vehicle Licensing Test</p>
                  <p className="text-regular text-bg">your last annual vehicle licensing test: <strong>{this.state.carTest}</strong></p>
                  <strong>Recommended</strong>
                    <p className="text-regular">See your service calendar</p>
                </Card.Body>
              </Card>
              <Card className="mb-4">
                <Card.Body>
                  <p className="text-regular">Multi-Point Inspection</p>
                  <p className="text-regular text-bg">your last multi-point inspection: <strong>{this.state.carLastService}</strong></p>
                  <span className="text-small">Full Synthetic Oil Change</span>
                  <span className="text-small">Tire Rotation</span>
                  <span className="text-small">Windshield Wiper Replacement</span>
                  <span className="text-small">Four-Wheel Alignment</span>
                  <strong>Recommended</strong>
                  <p className="text-regular">Every 10,000 Miles or Once a Year </p>
                </Card.Body>
              </Card>
               <Card className="mb-4">
                <Card.Body>
                  <p className="text-regular">Get your vehicle winter/summer ready</p>
                  <span className="text-small">Winter Inspection</span>
                  <span className="text-small">Summer Inspection</span>
                  <strong>Recommended</strong>
                  <p className="text-regular">Every May and November of every year</p>
                </Card.Body>
              </Card>
              <Card className="mb-4">
                <Card.Body>
                  <p className="text-regular">Full Service</p>
                  <span className="text-small">Battery Replacement Service</span>
                  <span className="text-small">Brake Pad Replacement Service</span>
                  <span className="text-small">Transmission Fluid Exchange Service</span>
                  <strong>Recommended</strong>
                    <p className="text-regular">Every three years or 30,000 Miles </p>
                </Card.Body>
              </Card>
        </Col>
      </div>
    )
  }
}
export default MySkodaService;