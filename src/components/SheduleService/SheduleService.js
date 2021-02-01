import './SheduleService.css';
import React from 'react';
import { Button, Col, Image, Modal } from 'react-bootstrap';
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
.react-datepicker__input-container input,
.react-datepicker__input-container,
.react-datepicker-wrapper {
  width: 290px;
  height: 38px;
  margin-bottom: 30px;
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
    this.state = {
        userId: this.props.sendUserId,
        carMake: '',
        carModel: '',
        carYear: '',
        carLastTest: '',
        carLastService: '',
        startDate: setHours(setMinutes(new Date(), 0), 8),
        excludeTimes: [],
        showErrorEmail: '',
        setShow: false
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
      let test = moment(data.mivchan_acharon_dt).format('DD/MM/YYYY');
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

    //get last inspection from databse User
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

    //get sheduled dates and times from database Shedule
    const Shedule = Parse.Object.extend('Shedule');
    const queryDate = new Parse.Query(Shedule);

    queryDate.find().then((results) => {
      
      console.log('Shedule found', results);
    }, (error) => {
      
      console.error('Error while fetching Shedule', error);
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
    const selectedDate = moment(date).format('YYYY/MM/DD');
    console.log(selectedDate);
    const transDate = moment(selectedDate).toObject();
    console.log(transDate);

    const Shedule = Parse.Object.extend('Shedule');
    const query = new Parse.Query(Shedule);
  
    query.find().then((results) => {
      console.log(results);
      let arrDates = [];
      for (let i=0; i<results.length; i++) {
         arrDates.push(results[i].attributes.sheduledDate);
       }
       console.log(arrDates);

      let arrExcludeDates = [];
      for (let i=0; i<arrDates.length; i++) {
        if (moment(date).format('YYYY/MM/DD') === moment(arrDates[i]).format('YYYY/MM/DD')) {
          arrExcludeDates.push(moment(Date.parse(arrDates[i])).toObject());
          console.log(arrExcludeDates);
        }
      }
      
      let arrExcludeTimes = [];
        for (let j=0; j<arrExcludeDates.length; j++) {
          arrExcludeTimes.push(setHours(setMinutes(new Date(), arrExcludeDates[j].minutes), arrExcludeDates[j].hours))
          console.log(arrExcludeTimes);

          this.setState({
            excludeTimes: arrExcludeTimes
          })
          console.log(this.state);
        }

    }, (error) => {
      
      console.error('Error while fetching Shedule', error);
    });
  }

  handleClickOnButtonSubmit = (e) => {
    
    e.preventDefault();
    console.log(this.state.startDate);
    const Shedule = Parse.Object.extend('Shedule');
    const myNewObject = new Shedule();

    myNewObject.set('sheduledDate', this.state.startDate.toString());
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

  handleClose = () => {
    this.setState({
      setShow: false
    })
  }

  handleShow = () => {
    this.setState({
      setShow: true
    })
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
    const { startDate } = this.state;
     
    return(
      <div>
        <div className="d-flex">
          <Col className="column" style={{maxWidth: "max-content"}} xs={12} md={4}>
            <h1 className="display-4 myskoda-title ml-0">Shedule Service Appointment</h1>
            <p className="text-regular text-bg last ml-0">your last annual vehicle licensing test: <strong>{this.state.carLastTest}</strong></p>
        <p className="text-regular text-bg last ml-0">your last multi-point inspection: <strong>{this.state.carLastService}</strong></p>
          <form className="row g-3 shedule-form">
          
            <div class="col-md-6">
              <label for="validationServer01" className="form-label">PlateNumber</label>
              <input type="text" className="form-control is-valid" id="validationServer01" value={this.props.sendUserCarPlate} required disabled/>
              {/* <div class="valid-feedback">
                Looks good!
              </div> */}
            </div>
            <div class="col-md-6">
              <label for="validationServer02" className="form-label">Model</label>
              <input type="text" className="form-control is-valid" id="validationServer02" value={this.state.carModel} required />
              {/* <div class="valid-feedback">
                Looks good!
              </div> */}
            </div>

            <div class="col-md-12">
              <label for="validationServer04" className="form-label shedule-label">Dealer</label>
              <select className={`form-select shedule-select ${this.state.showError}`} id="validationServer04" aria-describedby="validationServer04Feedback" required>
                <option selected disabled value="">Choose dealer</option>
                <option>Felix Oficial Dealer Tel-Aviv</option>
                <option>HaGoren Oficial Dealer Nataniya</option>
                <option>MotorUp Oficial Dealer Petach-Tikva</option>
              </select>
              <div id="validationServer04Feedback" className="invalid-feedback">
                Please select a dealer.
              </div>
            </div>

            <div className="col-md-12">
              <label for="validationServer04" className="form-label shedule-label">Service</label>
              <select className={`form-select shedule-select ${this.state.showError}`} id="validationServer04" aria-describedby="validationServer04Feedback" required>
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
                selected={startDate}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                placeholderText="Select Date and Time"
                popperPlacement="right-start"
                popperModifiers={{
                  offset: {
                    enabled: true,
                    offset: "5px, 10px"
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
                selected={startDate}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                placeholderText="Select Date and Time"
                popperPlacement="right-start"
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
                // withPortal
                dateFormat="hh:mm aa"
                minDate={new Date()}
                excludeTimes={this.state.excludeTimes}
                minTime={setHours(setMinutes(new Date(), 0), 8)}
                maxTime={setHours(setMinutes(new Date(), 45), 14)}
              />
              </Styles>
            </div>

            <div class="col-md-12">
              <label for="validationServer03" className="col-2 col-form-label pl-0 pt-0">Email</label>
              <div className="col-10 pl-0">
                <input className={`form-control ${this.state.showErrorEmail}`} style={{backgroundImage: "none"}, {borderColor: "#000"}} type="email" placeholder="example@example.com" onChange={this.handleChangeInputEmail} value={this.state.email} id="validationServer03" aria-describedby="validationServer03Feedback" required/>
                <div id="validationServer03Feedback" className="invalid-feedback">
                Please provide a valid email.
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <label for="validationServer03" class="col-2 col-form-label pl-0">Telephone</label>
              <div className="col-10 pl-0">
                <input className={`form-control ${this.state.showError}`} style={{backgroundImage: "none"}, {borderColor: "#000"}} type="tel" placeholder="000-000-0000" onChange={this.handleChangeInputPhone} value={this.state.phone} id="validationServer03" aria-describedby="validationServer03Feedback" required/>
                <div id="validationServer03Feedback" className="invalid-feedback">
                Please provide a valid telephone.
                </div>
              </div>
            </div>
            
            
            <div className="col-12">
              <button className="btn btn-primary shedule-submit my-4" type="submit" onClick={this.handleClickOnButtonSubmit}>Submit form</button>
            </div>
          </form> 
        </Col>
        <Col className="column rounded" style={{maxWidth: "max-content"}} xs={12} md={6}>
          <h3 className="title-discount">Shedule your visit online and get 10% discount for service</h3>
          <div className="wrap-shedule-img">
            <Image src="img/superb.jpg" className="shedule-img" />
          </div>
          <div className="wrap-shedule-img">
            <Image src="img/octavia.jpg" className="shedule-img" />
          </div>
          <div className="wrap-shedule-img" onClick={this.handleShow}>
            <Image src="img/karoq.jpg" className="shedule-img" />
          </div>
        </Col>
        </div>
        <Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrap-shedule-img modal-card" onClick={this.handleShow}>
            <Image src="img/congratulation.jpg" className="shedule-img" />
            <h1 className="modal-text">תודה לירון<br/>המדריך המקסים,<br/>המוכשר והמקצועי! בהצלחה לכל החברים מהקורס!</h1>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      </div>
    )
  }
}
export default SheduleService;