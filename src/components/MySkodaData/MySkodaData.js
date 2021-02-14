import './MySkodaData.css';
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Col, Image } from 'react-bootstrap';
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
      let test = moment(data.mivchan_acharon_dt).format('L');
      // let test = data.mivchan_acharon_dt;
      let license = moment(data.tokef_dt).format('L');
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
      <div>
        <h1 className="display-4 myskoda-title">My Vehicle</h1>
          <Col className="column column-aside" xs={12} md={4}>
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
            </Col>
          
          
          {/* <Col className="column column-aside" xs={12} md={4}>
            <div className="wrap-vehicle-info">
              <span className="text-black">Skoda</span>
              <span className="text-green">Fabia</span>
              <span className="text-small">plate number</span>
              <span className="rounded-pill border border-2 shadow-sm plate-number" bg="light" >66241801</span>
              <span className="text-small">year</span>
              <span className="year">2010</span>
              <div className="wrap-vehicle-img">
                <svg className="vehicle-img" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px"><path d="M15.86,41.31l0.22-1.12a2.7,2.7,0,0,0-2.44-1.55C12,38.76,9.11,38.87,7.52,40a3,3,0,0,0-.24,1.43C7.35,41.47,12.92,41.57,15.86,41.31Z"/><polygon points="15.66 51.7 15.04 55.75 32.05 57.54 28.48 52.03 15.66 51.7"/><circle cx="18.85" cy="69.16" r="1.85"/><circle cx="23.74" cy="69.53" r="1.85" transform="translate(-47.36 88.02) rotate(-85.73)"/><path d="M83.49,42.17a6.87,6.87,0,0,1-1.72-.36c-0.33-1.22-.69-2.42-1.09-3.6s-0.88-2.54-1.38-3.79-1-2.48-1.65-3.69c-0.32-.6-0.62-1.21-1-1.79S76,27.77,75.6,27.2L75.46,27l-0.32-.11c-0.41-.14-1-0.35-1.49-0.5s-1-.29-1.57-0.42c-1-.25-2.1-0.47-3.15-0.63A161.59,161.59,0,0,0,50,24.13a161.6,161.6,0,0,0-18.93,1.19c-1,.17-2.1.39-3.15,0.63-0.52.13-1,.26-1.57,0.42s-1.08.36-1.49,0.5L24.54,27l-0.14.21c-0.37.58-.76,1.14-1.09,1.74s-0.66,1.19-1,1.79c-0.6,1.21-1.14,2.45-1.65,3.69s-1,2.51-1.38,3.79-0.76,2.38-1.09,3.6a6.87,6.87,0,0,1-1.72.36,64.86,64.86,0,0,1-6.5.25l-2.53,0a4.08,4.08,0,0,0,.46,1s1.77,0.81,8.42,1.14c-1.28,1.75-2.32,3-3.1,3.89a7.25,7.25,0,0,0-1.81,4.75L11.28,71.63s0,0.05,0,.08h0v5.21a1.92,1.92,0,0,0,1.92,1.92h8.1a1.92,1.92,0,0,0,1.92-1.92l0-.95H76.83l0,0.95a1.92,1.92,0,0,0,1.92,1.92h8.1a1.92,1.92,0,0,0,1.92-1.92V71.71h0s0-.05,0-0.08L88.54,53.14a7.25,7.25,0,0,0-1.81-4.75c-0.78-.87-1.81-2.14-3.1-3.89,6.65-.32,8.42-1.14,8.42-1.14a4.08,4.08,0,0,0,.46-1l-2.53,0A64.86,64.86,0,0,1,83.49,42.17ZM22.14,35c0.48-1.21,1-2.39,1.63-3.55,0.31-.57.61-1.14,1-1.69s0.58-.93.89-1.38c0.44-.13.8-0.25,1.21-0.35s1-.23,1.48-0.32c1-.17,2-0.31,3-0.4s2.05-.18,3.09-0.23l3.1-.16c2.07-.08,7.27-0.23,12.48-0.23s10.4,0.15,12.48.23l3.1,0.16c1,0.06,2.06.13,3.09,0.23s2,0.23,3,.4c0.5,0.08,1,.2,1.48.32s0.77,0.22,1.21.35c0.31,0.45.62,0.9,0.89,1.38s0.64,1.12,1,1.69c0.59,1.16,1.15,2.33,1.63,3.55A53.2,53.2,0,0,1,80,41.43H20A53.2,53.2,0,0,1,22.14,35ZM58.61,51.5l2.67-.08-2.61,8.67-1.68,0Zm-3,8.65-1.88,0,0.92-8.57,2.58-.07Zm7.18-8.77,2.91-.09L62.3,60l-2.16,0Zm-9.55.26L52.28,60.2l-1.58,0V51.68Zm-3.89,0v8.54l-1.58,0-0.92-8.56Zm-10.58-.26,2.67,0.08L43,60.12l-1.68,0Zm1.14,8.64L37.7,60l-3.36-8.73,2.91,0.09Zm3-8.52,2.58,0.07,0.92,8.57-1.88,0Zm-27.95-.79,13,0.34h0l0.89,0,4.08,0.13L36.2,60l-2.36-.05H33.6l-0.9-1.39L14,56.57ZM84,71.58s-22.38,1.3-34,1.3-34-1.3-34-1.3l-1.49-5.41S36.29,67.63,50,67.63s35.49-1.46,35.49-1.46Zm1.13-20.83L86,56.57l-18.72,2-0.9,1.39H66.16L63.8,60l3.37-8.74,4.08-.13,0.89,0h0Z"/><path d="M92.48,40c-1.59-1.16-4.45-1.28-6.12-1.39a2.7,2.7,0,0,0-2.44,1.55l0.22,1.12c2.94,0.26,8.51.16,8.57,0.16A3,3,0,0,0,92.48,40Z"/><polygon points="67.95 57.54 84.96 55.75 84.34 51.7 71.52 52.03 67.95 57.54"/><circle cx="81.15" cy="69.16" r="1.85"/><circle cx="76.26" cy="69.53" r="1.85" transform="translate(-4.96 5.87) rotate(-4.27)"/></svg>
              </div>
              <p className="text-center">valid car license: <span className="text-bg">23/02/2022</span></p>
              <code>VIN: TMBER6NJ6KZ056541</code>
              </div>
            </Col> */}
      </div>
    )
  }
}
export default MySkodaData;