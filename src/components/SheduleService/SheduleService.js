import './SheduleService.css';
import React from 'react';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import DatePicker from "react-datepicker";
import subDays from 'date-fns/subDays';
import getDay from 'date-fns/getDay';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Parse from 'parse';

const Styles = styled.div`
 .react-datepicker-wrapper,
 .react-datepicker__input-container,
 .react-datepicker__input-container input {
    width: 290px;
 }
 .react-datepicker__close-icon::before,
 .react-datepicker__close-icon::after {
    background-color: #218838;
 }
 .react-datepicker__day--keyboard-selected,
 .react-datepicker__day--selected {
    background-color: #218838;
 }
 .react-datepicker__day--keyboard-selected:hover,
 .react-datepicker__day--selected:hover {
    background-color: #218838;
 }
 .react-datepicker__day--keyboard-selected:focus,
 .react-datepicker__day--selected:focus {
    outline: none;
 }
 .react-datepicker__header {
    background-color: rgb(41, 168, 71, 0.2);
 }
 .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
   background-color: #218838;
 }
 .react-datepicker__time-container:hover .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
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
`;

class SheduleService extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    this.state = {
        // carPlate: '',
        carMake: '',
        carModel: '',
        carYear: '',
        carLastTest: '',
        carLastService: '',
        startDate: setHours(setMinutes(new Date(), 0), 8),
        excludeDates: [],
        excludeTimes: []
      }
  }

  componentDidMount () {
    let plate = this.props.sendUserCarPlate;
    // console.log(plate);
    axios.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={%22mispar_rechev%22:[%22${plate}%22]}`)
    .then((result) => {
      let data = result.data.result.records[0];
      // console.log(data);
      let make = data.tozeret_nm;
      if(make === `סקודה צ'כיה`) {
        make = "Skoda"
      }
      let model = data.kinuy_mishari;
      let year = data.shnat_yitzur;
      let test = moment(data.mivchan_acharon_dt).format('L');
      // console.log(make, model, year, test);
      this.setState({
        carPlate: plate,
        carMake: make,
        carModel: model,
        carYear: year,
        carLastTest: test,
        email: '',
        phone: ''
      })
      // console.log(this.state);
    })

    const Vehicle = Parse.Object.extend('Vehicle');
    const query = new Parse.Query(Vehicle);
    // query.equalTo("lastService", 'A string');
    // query.equalTo("sheduledDate", 'A string');
    query.equalTo("userId", Parse.User.current());
    query.find().then((results) => {
      
      // console.log('Vehicle found', results);
      // console.log(results[results.length-1].attributes.lastService);
      // console.log(results[results.length-1].attributes.sheduledDate);
      const lastService = results[results.length-1].attributes.lastService;
      const exDate = results[results.length-1].attributes.sheduledDate
      this.setState({
        carLastService: lastService,
        excludeDates: exDate
      })
    }, (error) => {
      
      console.error('Error while fetching Vehicle', error);
    });
    
  }

  handleChangeInputEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  } 
  handleChangeInputPhone = (e) => {
    this.setState({
      phone: e.target.value
    })
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
    console.log(this.state.startDate);
  }

  handleSelect = (date, event) => {
        console.log('onSelect', date, event);
        if(moment(date).format('YYYY/MM/DD') === moment('Thu Feb 04 2021 08:00:13 GMT+0200 (Israel Standard Time').format('YYYY/MM/DD')) {
          console.log('yes');
        }
        const selectedDate = moment(date).format('YYYY/MM/DD');
        console.log(selectedDate);
        const transDate = moment(selectedDate).toObject();
        console.log(transDate);

        const Vehicle = Parse.Object.extend('Vehicle');
    const query = new Parse.Query(Vehicle);
    // query.equalTo("lastService", 'A string');
    // query.equalTo("sheduledDate", 'A string');
    query.equalTo("userId", Parse.User.current());
    query.find().then((results) => {
      
      const exDate = results[results.length-1].attributes.sheduledDate;
      console.log(moment(exDate).format('YYYY/MM/DD'));
      if (moment(exDate).format('YYYY/MM/DD') === '2021/02/04') {
        console.log('!!!');
        const arrExDates = [];
        arrExDates.push(moment(exDate).format('hh:mm'))
        console.log(arrExDates);
        this.setState({
          excludeTimes: arrExDates
        })
      }

    }, (error) => {
      
      console.error('Error while fetching Vehicle', error);
    });
  }

  handleFocus = (event) => {
        console.log('onFocus', event.nativeEvent.path[0].defaultValue);
  }

   handleCalendarClose = (e) => {
        console.log('CalendarClose', e);
    };

  handleClickOnButtonSubmit = (e) => {
    
    e.preventDefault();
    console.log(this.state.startDate);
    const Vehicle = Parse.Object.extend('Vehicle');
    const myNewObject = new Vehicle();

    myNewObject.set('lastService', '12/07/2020');
    myNewObject.set('sheduledDate', this.state.startDate.toString());
    myNewObject.set('userId', Parse.User.current());

    myNewObject.save().then(
      (result) => {
        
        console.log('Vehicle created', result);
      },
      (error) => {
        
        console.error('Error while creating Vehicle: ', error);
      }
    );
  }

  // isWeekday = date => {
  //   const day = getDay(date);
  //   return day !== 0 && day !== 6;
  // };

  // filterPassedTime = time => {
  //   const currentDate = new Date();
  //   const selectedDate = new Date(time);
  //   return currentDate.getTime() < selectedDate.getTime();
  // }

  render() {
    const { startDate } = this.state;
    const formExDate = moment( Date.parse(this.state.excludeDates)).toObject();
    // console.log(formExDate);
    const exDate = setHours(setMinutes(new Date(formExDate.years, formExDate.months, formExDate.date), formExDate.minutes), formExDate.hours);
    // console.log(exDate);
    return(
      <div>
        <h1 className="display-4 myskoda-title">Shedule Service Appointment</h1>
        <p className="text-regular text-bg last">your last annual vehicle licensing test: <strong>{this.state.carLastTest}</strong></p>
        <p className="text-regular text-bg last">your last multi-point inspection: <strong>{this.state.carLastService}</strong></p>
        <Col className="column" xs={12} md={4}>
          <form class="row g-3 shedule-form">
          
            <div class="col-md-6">
              <label for="validationServer01" class="form-label">PlateNumber</label>
              <input type="text" class="form-control is-valid" id="validationServer01" value={this.props.sendUserCarPlate} required disabled/>
              {/* <div class="valid-feedback">
                Looks good!
              </div> */}
            </div>
            <div class="col-md-6">
              <label for="validationServer02" class="form-label">Model</label>
              <input type="text" class="form-control is-valid" id="validationServer02" value={this.state.carModel} required />
              {/* <div class="valid-feedback">
                Looks good!
              </div> */}
            </div>

            <div class="col-md-12">
              <label for="validationServer04" class="form-label shedule-label">Dealer</label>
              <select class="form-select shedule-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" required>
                <option selected disabled value="">Choose dealer</option>
                <option>Felix Oficial Dealer Tel-Aviv</option>
                <option>HaGoren Oficial Dealer Nataniya</option>
                <option>MotorUp Oficial Dealer Petach-Tikva</option>
              </select>
              <div id="validationServer04Feedback" class="invalid-feedback">
                Please select a valid state.
              </div>
            </div>

            <div class="col-md-12">
              <label for="validationServer04" class="form-label shedule-label">Service</label>
              <select class="form-select shedule-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" required>
                <option selected disabled value="">Choose services</option>
                <option>Inspection Before Annual Vehicle Licensing Test</option>
                <option>Multi-Point Inspection</option>
                <option>Full service</option>
                <option>Inspection before summer</option>
                <option>Inspection before winter</option>
              </select>
              <div id="validationServer04Feedback" class="invalid-feedback">
                Please select a valid state.
              </div>
            </div>

            <div class="col-md-12">
              <label for="validationServer03" class="col-2 col-form-label pl-0">Email</label>
              <div class="col-10 pl-0">
                <input class="form-control is-invalid" type="email" placeholder="example@example.com" onChange={this.handleChangeInputEmail} value={this.state.email} id="validationServer03" aria-describedby="validationServer03Feedback" required/>
                <div id="validationServer03Feedback" class="invalid-feedback">
                Please provide a valid email.
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <label for="validationServer03" class="col-2 col-form-label pl-0">Telephone</label>
              <div class="col-10 pl-0">
                <input class="form-control is-invalid" type="tel" placeholder="000-000-0000" onChange={this.handleChangeInputPhone} value={this.state.phone} id="validationServer03" aria-describedby="validationServer03Feedback" required/>
                <div id="validationServer03Feedback" class="invalid-feedback">
                Please provide a valid telephone.
                </div>
              </div>
            </div>
            
            <div class="col-md-12">
              <Styles>
                <DatePicker
                isClearable
                selected={startDate}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                // onFocus={this.handleFocus}
                // onCalendarClose={this.handleCalendarClose}
                placeholderText="Select Date and Time"
                // showTimeSelect
                // timeIntervals={15}
                // timeFormat="HH:mm"
                // withPortal
                dateFormat="dd/MM/yyy"
                minDate={new Date()}
                // onCalendarClose={this.handleCalendarClose}
                // onCalendarOpen={handleCalendarOpen}
                // excludeDates={[new Date(), subDays(new Date(), 1)]}
                // excludeOutOfBoundTimes
                excludeDates={[this.state.excludeTimes]}
                // excludeTimes={[
                //   setHours(setMinutes(new Date(2021, 2, 12), 15), 8),
                //   setHours(setMinutes(new Date(2021, 3, 15), 15), 9),
                //   setHours(setMinutes(new Date(2021, 4, 25), 15), 10),
                //   setHours(setMinutes(new Date(2021, 5, 14), 15), 11)
                // ]}
                // excludeTimes={[exDate]}
                // filterDate={this.isWeekday}
                // filterTime={this.filterPassedTime}
                // minTime={setHours(setMinutes(new Date(), 0), 8)}
                // maxTime={setHours(setMinutes(new Date(), 45), 14)}
              />
              <DatePicker
                isClearable
                selected={startDate}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                // onFocus={this.handleFocus}
                // onCalendarClose={this.handleCalendarClose}
                placeholderText="Select Date and Time"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeFormat="HH:mm"
                // withPortal
                dateFormat="hh:mm aa"
                minDate={new Date()}
                // onCalendarClose={this.handleCalendarClose}
                // onCalendarOpen={handleCalendarOpen}
                // excludeDates={[new Date(), subDays(new Date(), 1)]}
                // excludeOutOfBoundTimes
                // excludeDates={[exDate]}
                // excludeTimes={[
                //   setHours(setMinutes(new Date(2021, 2, 12), 15), 8),
                //   setHours(setMinutes(new Date(2021, 3, 15), 15), 9),
                //   setHours(setMinutes(new Date(2021, 4, 25), 15), 10),
                //   setHours(setMinutes(new Date(2021, 5, 14), 15), 11)
                // ]}
                excludeTimes={[exDate]}
                // filterDate={this.isWeekday}
                // filterTime={this.filterPassedTime}
                // minTime={setHours(setMinutes(new Date(), 0), 8)}
                // maxTime={setHours(setMinutes(new Date(), 45), 14)}
              />
              </Styles>
              {/* <div>{startDate.toString()}</div> */}
            </div>
            <div class="col-12">
              <button class="btn btn-primary shedule-submit" type="submit" onClick={this.handleClickOnButtonSubmit}>Submit form</button>
            </div>
          </form> 
        </Col>
      </div>
    )
  }
}
export default SheduleService;