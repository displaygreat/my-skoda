import './SheduleService.css';
import React from 'react';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import superb from '../../assets/img/superb.jpg';
import octavia from '../../assets/img/octavia.jpg';
import karoq from '../../assets/img/karoq.jpg';
import SheduleForm from '../SheduleForm/SheduleForm';

const emailValidation = email => {
  if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return null;
  }
  if (email.trim() === '') {
    return 'Email is required';
  }
  return 'Please enter a valid email';
}

const phoneValidation = phone => {
  if (/[0-9]{2,3}-?[0-9]{7}/.test(phone)) {
    return null;
  }
  if (phone.trim() === '') {
    return 'Phone is required';
  }
  return 'Please enter a valid phone';
}

const selectValidation = (select) => {
  if (select === '') {
    return 'Please choose an option';
  }
}

const validate = {
  dealer: name => selectValidation(name),
  service: name => selectValidation(name),
  email: emailValidation(),
  phone: phoneValidation()
}

class SheduleService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        carModel: '',
        carLastTest: '',
        hideError: 'is-valid'
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

  render() {
    const { userCarPlate, lastInspection } = this.props;
    const { carModel, carLastTest } = this.state;

    return(
      <div className="c-shedule-service">
        <div className="col-sm-12 col-md-5">
          <h1 className="display-4 my-skoda-title ml-0">Shedule Service Appointment</h1>
          <p className="text-regular text-bg last ml-0">your last annual vehicle licensing test: <strong>{carLastTest}</strong></p>
          {lastInspection === "" || lastInspection === undefined 
          ? <p className="text-regular text-bg last ml-0">your last multi-point inspection:<br/> <small>Choose date for your first inspection in our dealer centers</small></p> 
          : <p className="text-regular text-bg last ml-0">your last multi-point inspection: <strong>{lastInspection}</strong></p>}
          <SheduleForm carModel={carModel} userCarPlate={userCarPlate} validate={validate} />
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