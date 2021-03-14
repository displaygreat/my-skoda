import React from 'react';
import './MySkodaData.css';
import axios from 'axios';
import moment from 'moment';
import { Image } from 'react-bootstrap';
import skodaThen from '../../assets/img/skoda-then.svg';

class MySkodaData extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      userId: this.props.sendUserId,
      userCarPlate: this.props.sendUserCarPlate,
      carPlate: '',
      carMake: '',
      carModel: '',
      carYear: '',
      carTest: '',
      carLicense: '',
      carVIN: ''
    }
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
        carPlate: plate,
        carMake: make,
        carModel: model,
        carYear: year,
        carTest: test,
        carLicense: license,
        carVIN: vin
      })
    })
  } 

  render() {
    return(
      <div className="c-my-skoda-data col-md-6 col-lg-4">
        <h1 className="display-4 my-skoda-title">My Vehicle</h1>
        <div className="wrap-vehicle-info">
          <span className="text-black">{this.state.carMake}</span>
          <span className="text-green">{this.state.carModel}</span>
          <span className="text-small">plate number</span>
          <span className="rounded-pill border border-2 shadow-sm plate-number" bg="light">{this.state.carPlate}</span>
          <span className="text-small">year</span>
          <span className="year">{this.state.carYear}</span>
          <div className="wrap-vehicle-img">
            <Image src={skodaThen} alt="skoda icon" />
          </div>
          <p className="text-center">valid car license: <span className="text-bg">{this.state.carLicense}</span></p>
          <code>VIN:{this.state.carVIN}</code>
        </div>
      </div>
    )
  }
}
export default MySkodaData;