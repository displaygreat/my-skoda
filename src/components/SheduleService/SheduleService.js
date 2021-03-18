import './SheduleService.css';
import React from 'react';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import Parse from 'parse';
import superb from '../../assets/img/superb.jpg';
import octavia from '../../assets/img/octavia.jpg';
import karoq from '../../assets/img/karoq.jpg';
import DatePickerComp from '../DatePickerComp/DatePickerComp';

// const emailValidation = email => {
//   if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
//     return null;
//   }
//   if (email.trim() === '') {
//     return 'Email is required';
//   }
//   return 'Please enter a valid email';
// }

// const phoneValidation = phone => {
//   if (/[0-9]{2,3}-?[0-9]{7}/.test(phone)) {
//     return null;
//   }
//   if (phone.trim() === '') {
//     return 'Phone is required';
//   }
//   return 'Please enter a valid phone';
// }

// const selectValidation = (select) => {
//   if (select === '') {
//     return 'Please choose an option';
//   }
// }

// const validate = {
//   dealer: name => selectValidation(name),
//   service: name => selectValidation(name),
//   email: emailValidation(),
//   phone: phoneValidation()
// }

class SheduleService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        carModel: '',
        carLastTest: '',
        dealer: '',
        service: '',
        email: '',
        phone: '',
        selectedDate: {},
        excludeTimes: [],
        hideError: 'is-valid'
      }
  }

  componentDidMount () {
    this.getVehicle();
    this.getSelectedDate();
    this.getExcludeTimes();
  } 

  getVehicle = () => {
    let plate = this.props.userCarPlate;
    axios.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={%22mispar_rechev%22:[%22${plate}%22]}`)
    .then((result) => {
      let data = result.data.result.records[0];
      let model = data.kinuy_mishari;
      let test = moment(data.mivchan_acharon_dt).format('DD/MM/YYYY');
      this.setState({
        carModel: model,
        carLastTest: test,
      })
    })
  }

  getSelectedDate = (date) => {
    this.setState({
      selectedDate: date
    })
  }

  handleChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e.target.value);
    console.log(e);
    this.validateInput(e.target.value, e.target.name);
  }

  handleChangeDate = date => {
    this.setState({
      selectedDate: date
    });
  }

  sheduleDate = () => {
    const Shedule = Parse.Object.extend('Shedule');
    const myNewObject = new Shedule();
    
    myNewObject.set('sheduledDate', this.state.selectedDate.toString());
    myNewObject.set('userId', Parse.User.current());

    myNewObject.save().then(
      (result) => {
        console.log('Shedule created', result);
      },
      (error) => {
        console.error('Error while creating Vehicle: ', error);
      }
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.sheduleDate();
  }

  validateInput = (value, name) => {
    console.log(value, name);
  }

  render() {
    const { carLastTest, dealer, service, email, phone } = this.state;
    const { userCarPlate, lastInspection } = this.props;
    console.log(dealer, service, email, phone);
    return(
      <div className="c-shedule-service">
        <div className="col-sm-12 col-md-5">
          <h1 className="display-4 my-skoda-title ml-0">Shedule Service Appointment</h1>
          <p className="text-regular text-bg last ml-0">your last annual vehicle licensing test: <strong>{carLastTest}</strong></p>
          {lastInspection === "" || lastInspection === undefined 
          ? <p className="text-regular text-bg last ml-0">your last multi-point inspection:<br/> <small>Choose date for your first inspection in our dealer centers</small></p> 
          : <p className="text-regular text-bg last ml-0">your last multi-point inspection: <strong>{lastInspection}</strong></p>}
          <form className="row g-3 shedule-form">
            <div className="col-md-6">
              <label htmlFor="validationServer01" className="form-label">PlateNumber</label>
              <input type="text" className="form-control is-valid" id="validationServer01" value={userCarPlate} required disabled/>
            </div>
            <div className="col-md-6">
              <label htmlFor="validationServer02" className="form-label">Model</label>
              <input type="text" className="form-control is-valid" id="validationServer02" value={this.state.carModel} required disabled/>
            </div>
            <div className="col-md-12">
              <label htmlFor="validationServer01" className="form-label shedule-label">Dealer</label>
              <select className={`form-select shedule-select ${this.state.showError}`} name="dealer" onChange={this.handleChangeInput} id="validationServer01" aria-describedby="validationServer01Feedback" defaultValue="Choose dealer" required>
                <option disabled>Choose dealer</option>
                <option>Felix Oficial Dealer Tel-Aviv</option>
                <option>HaGoren Oficial Dealer Nataniya</option>
                <option>MotorUp Oficial Dealer Petach-Tikva</option>
              </select>
              <div id="validationServer01Feedback" className="invalid-feedback">
                Please select a dealer.
              </div>
            </div>
            <div className="col-md-12">
              <label htmlFor="validationServer04" className="form-label shedule-label">Service</label>
              <select className={`form-select shedule-select ${this.state.showError}`} name="service" onChange={this.handleChangeInput} id="validationServer04" aria-describedby="validationServer04Feedback" defaultValue="Choose services" required>
                <option disabled>Choose services</option>
                <option>Inspection Before Annual Vehicle Licensing Test</option>
                <option>Multi-Point Inspection</option>
                <option>Full service</option>
                <option>Inspection before summer</option>
                <option>Inspection before winter</option>
              </select>
              <div id="validationServer04Feedback" className="invalid-feedback">
                Please select a service.
              </div>
            </div>
            <div className="col-md-12">
              <p className="mt-2">Select Date and Time</p>
              <DatePickerComp getSelectedDate={this.getSelectedDate} getExcludeTimes={this.getExcludeTimes} />
            </div>
            <div className="col-md-12">
              <label htmlFor="validationServer03" className="col-2 col-form-label pl-0 pt-0">Email</label>
              <div className="col-lg-10 col-md-12 col-sm-10 col-xs-12 pl-0">
                <input className={`form-control ${this.state.showError}`} style={{backgroundImage: "none", borderColor: "#000"}} type="email" placeholder="example@example.com" name="email" onChange={this.handleChangeInput} value={email} id="validationServer03" aria-describedby="validationServer03Feedback" required/>
                <div id="validationServer03Feedback" className="invalid-feedback">
                Please provide a valid email.
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <label htmlFor="validationServer03" className="col-2 col-form-label pl-0">Phone</label>
              <div className="col-lg-10 col-md-12 col-sm-10 col-xs-12 pl-0">
                <input className={`form-control ${this.state.showError}`} style={{backgroundImage: "none", borderColor: "#000"}} type="tel" placeholder="050-5005050" name="phone" onChange={this.handleChangeInput} value={phone} id="validationServer03" aria-describedby="validationServer03Feedback" required/>
                <div id="validationServer03Feedback" className="invalid-feedback">
                Please provide a valid telephone.
                </div>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary shedule-submit my-4" type="submit" onClick={this.handleSubmit}>Submit form</button>
            </div>
          </form> 
        </div>
        <div className="col-sm-12 col-md-5 rounded">
          <h3 className="title-discount">Shedule your visit online and get 10% discount for service</h3>
          <div className="wrap-shedule-img">
            <Image src={superb} className="shedule-img" />
          </div>
          <div className="wrap-shedule-img">
            <Image src={octavia} className="shedule-img" />
          </div>
          <div className="wrap-shedule-img">
            <Image src={karoq} className="shedule-img" />
          </div>
        </div>
      </div>
    )
  }
}
export default SheduleService;