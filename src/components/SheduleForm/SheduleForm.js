import React from 'react';
import DatePickerComp from '../DatePickerComp/DatePickerComp';
import Parse from 'parse';

class SheduleForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedDate: {},
      dealer: '',
      service: '',
      email: '',
      phone: ''
    }
  }

  handleChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getSelectedDate = (date) => {
    this.setState({
      selectedDate: date
    })
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

  render () {
    const { userCarPlate, carModel } = this.props;
    const { email, phone } = this.state;
    return (
      <form className="row g-3 shedule-form">
        <div className="col-md-6">
          <label htmlFor="validationServer01" className="form-label">PlateNumber</label>
          <input 
            type="text" 
            className="form-control is-valid" 
            id="validationServer01" 
            value={userCarPlate} 
            readOnly 
            required 
            disabled/>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationServer02" className="form-label">Model</label>
          <input 
            type="text" 
            className="form-control is-valid" 
            id="validationServer02" 
            value={carModel} 
            readOnly 
            required 
            disabled/>
        </div>
        <div className="col-md-12">
          <label htmlFor="validationServer01" className="form-label shedule-label">Dealer</label>
          <select 
            className={`form-select shedule-select ${this.state.showError}`} 
            name="dealer" 
            onChange={this.handleChangeInput} 
            id="validationServer01" 
            aria-describedby="validationServer01Feedback" 
            defaultValue="Choose dealer" 
            required>
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
          <select 
            className={`form-select shedule-select ${this.state.showError}`} 
            name="service" 
            onChange={this.handleChangeInput} 
            id="validationServer04" 
            aria-describedby="validationServer04Feedback" 
            defaultValue="Choose services" 
            required>
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
          <DatePickerComp getSelectedDate={this.getSelectedDate} />
        </div>
        <div className="col-md-12">
          <label htmlFor="validationServer03" className="col-2 col-form-label pl-0 pt-0">Email</label>
          <div className="col-lg-10 col-md-12 col-sm-10 col-xs-12 pl-0">
            <input 
              className={`form-control ${this.state.showError}`} 
              style={{backgroundImage: "none", borderColor: "#000"}} 
              type="email" 
              placeholder="example@example.com" 
              name="email" onChange={this.handleChangeInput} 
              value={email} id="validationServer03" 
              aria-describedby="validationServer03Feedback" 
              required/>
            <div id="validationServer03Feedback" className="invalid-feedback">
            Please provide a valid email.
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <label htmlFor="validationServer03" className="col-2 col-form-label pl-0">Phone</label>
          <div className="col-lg-10 col-md-12 col-sm-10 col-xs-12 pl-0">
            <input 
              className={`form-control ${this.state.showError}`} 
              style={{backgroundImage: "none", borderColor: "#000"}} 
              type="tel" 
              placeholder="050-5005050" 
              name="phone" 
              onChange={this.handleChangeInput} 
              value={phone} 
              id="validationServer03" 
              aria-describedby="validationServer03Feedback" 
              required/>
            <div id="validationServer03Feedback" className="invalid-feedback">
            Please provide a valid telephone.
            </div>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary shedule-submit my-4" type="submit" onClick={this.handleSubmit}>Submit form</button>
        </div>
          </form> 
    )
  }
}
export default SheduleForm;