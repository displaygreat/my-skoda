import './SheduleService.css';
import React from 'react';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import DatePicker from "react-datepicker";
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Parse from 'parse';
import superb from '../../assets/img/superb.jpg';
import octavia from '../../assets/img/octavia.jpg';
import karoq from '../../assets/img/karoq.jpg';

const Styles = styled.div`
.react-datepicker__input-container input,
.react-datepicker__input-container,
.react-datepicker-wrapper {
  width: 240px;
  height: 38px;
  margin-bottom: 30px;
  display: block;
}
 .react-datepicker__close-icon::before,
 .react-datepicker__close-icon::after {
    background-color: #28a745;
 }
 .react-datepicker__time-container,
 .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
   width: 240px;
 }
 .react-datepicker__day--keyboard-selected,
 .react-datepicker__day--selected {
    background-color: #218838;
 }
 .react-datepicker__day--keyboard-selected:focus,
 .react-datepicker__day--selected:focus {
    outline: none;
 }
 .react-datepicker__header {
    background-color:#29a84633;
 }
 .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
   background-color: #218838;
 }
 .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected,
 .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item
 {
   height: 50px;
   display: flex;
   align-items: center;
   justify-content: center;
  }
 }
`;

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
        selectedDate: setHours(setMinutes(new Date(), 0), 8),
        excludeTimes: [],
        showErrorEmail: 'is-valid'
      }
  }

  componentDidMount () {
    this.getVehicle();
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

  handleChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e.target.value);
  }

  // handleChangeSelectDealer = (e) => {
  //   this.setState({
  //     dealer: e.target.value
  //   })
  // }

  // handleChangeSelectService = (e) => {
  //   this.setState({
  //     service: e.target.value
  //   })
  // }

  // handleChangeInputEmail = (e) => {
  //   this.setState({
  //     email: e.target.value
  //   })
  // } 
  // handleChangeInputPhone = (e) => {
  //   this.setState({
  //     phone: e.target.value
  //   })
  // }

  handleChangeDate = date => {
    this.setState({
      selectedDate: date
    });
  }

  handleSelect = (date) => {
    const Shedule = Parse.Object.extend('Shedule');
    const query = new Parse.Query(Shedule);
  
    query.find().then((results) => {
      let arrDates = [];
      for (let i=0; i<results.length; i++) {
         arrDates.push(results[i].attributes.sheduledDate);
      }

      let arrExcludeDates = [];
      for (let i=0; i<arrDates.length; i++) {
        if (moment(date).format('YYYY/MM/DD') === moment(arrDates[i]).format('YYYY/MM/DD')) {
          arrExcludeDates.push(moment(Date.parse(arrDates[i])).toObject());
        }
      }
      
      let arrExcludeTimes = [];
        for (let j=0; j<arrExcludeDates.length; j++) {
          arrExcludeTimes.push(setHours(setMinutes(new Date(), arrExcludeDates[j].minutes), arrExcludeDates[j].hours))
          this.setState({
            excludeTimes: arrExcludeTimes
          })
        }

    }, (error) => {
      console.error('Error while fetching Shedule', error);
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
    // this.sheduleDate();
    if (this.state.dealer === '' || this.state.service === '') {
      this.setState({
        showError: 'is-invalid'
      })
    }
  }
  
  //validation email
  // validationEmail = (e) => {
  //    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  //   if (!pattern.test(e.target.value)) {
  //           this.setState({
  //             showErrorEmail: 'is-invalid'
  //           })
  //           this.setState({
  //             showErrorEmail: 'is-valid'
  //           })
  //       }
  // }

  render() {
    const { carLastTest, selectedDate, dealer, service, email, phone } = this.state;
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
              <label for="validationServer01" className="form-label">PlateNumber</label>
              <input type="text" className="form-control is-valid" id="validationServer01" value={userCarPlate} required disabled/>
            </div>
            <div className="col-md-6">
              <label for="validationServer02" className="form-label">Model</label>
              <input type="text" className="form-control is-valid" id="validationServer02" value={this.state.carModel} required disabled/>
            </div>
            <div className="col-md-12">
              <label for="validationServer01" className="form-label shedule-label">Dealer</label>
              <select className={`form-select shedule-select ${this.state.showError}`} name="dealer" onChange={this.handleChangeInput} id="validationServer01" aria-describedby="validationServer01Feedback" required>
                <option selected disabled value="">Choose dealer</option>
                <option>Felix Oficial Dealer Tel-Aviv</option>
                <option>HaGoren Oficial Dealer Nataniya</option>
                <option>MotorUp Oficial Dealer Petach-Tikva</option>
              </select>
              <div id="validationServer01Feedback" className="invalid-feedback">
                Please select a dealer.
              </div>
            </div>
            <div className="col-md-12">
              <label for="validationServer04" className="form-label shedule-label">Service</label>
              <select className={`form-select shedule-select ${this.state.showError}`} name="service" onChange={this.handleChangeInput} id="validationServer04" aria-describedby="validationServer04Feedback" required>
                <option selected disabled value="">Choose services</option>
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
              <Styles>
                <DatePicker
                  isClearable
                  selected={selectedDate}
                  onChange={this.handleChangeDate}
                  onSelect={this.handleSelect}
                  placeholderText="Select Date and Time"
                  popperPlacement="top-start"
                  popperModifiers={{
                    offset: {
                      enabled: true,
                      offset: "0px, 10px"
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                      boundariesElement: "viewport"
                    }
                  }}
                  dateFormat="dd/MM/yyy"
                  minDate={new Date()}
                />
                <DatePicker
                  isClearable
                  selected={selectedDate}
                  onChange={this.handleChangeDate}
                  onSelect={this.handleSelect}
                  placeholderText="Select Date and Time"
                  popperPlacement="top-start"
                  popperModifiers={{
                    offset: {
                      enabled: true,
                      offset: "0px, 10px"
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                      boundariesElement: "viewport"
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeFormat="HH:mm"
                  dateFormat="hh:mm aa"
                  minDate={new Date()}
                  excludeTimes={this.state.excludeTimes}
                  minTime={setHours(setMinutes(new Date(), 0), 8)}
                  maxTime={setHours(setMinutes(new Date(), 45), 14)}
                />
              </Styles>
            </div>
            <div className="col-md-12">
              <label for="validationServer03" className="col-2 col-form-label pl-0 pt-0">Email</label>
              <div className="col-lg-10 col-md-12 col-sm-10 col-xs-12 pl-0">
                <input className={`form-control ${this.state.showError}`} style={{backgroundImage: "none", borderColor: "#000"}} type="email" placeholder="example@example.com" name="email" onChange={this.handleChangeInput} value={email} id="validationServer03" aria-describedby="validationServer03Feedback" required/>
                <div id="validationServer03Feedback" className="invalid-feedback">
                Please provide a valid email.
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <label for="validationServer03" className="col-2 col-form-label pl-0">Telephone</label>
              <div className="col-lg-10 col-md-12 col-sm-10 col-xs-12 pl-0">
                <input className={`form-control ${this.state.showError}`} style={{backgroundImage: "none", borderColor: "#000"}} type="tel" placeholder="000-000-0000" name="phone" onChange={this.handleChangeInput} value={phone} id="validationServer03" aria-describedby="validationServer03Feedback" required/>
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