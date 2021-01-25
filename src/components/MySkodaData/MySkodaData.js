import './MySkodaData.css';
import React from 'react';
import axios from 'axios';
import moment from 'moment';

class MySkodaData extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
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
      let license = moment(data.tokef_dt).format('L');
      let vin = data.misgeret;
      console.log(make, model, year, test, license, vin);
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
          <h1>My Skoda: </h1>
          <img src="https://via.placeholder.com/150/92c952" /> 
          <p>license-plate-number: {this.state.carPlate} </p>
          <p>make: {this.state.carMake}</p>
          <p>model: {this.state.carModel}</p>
          <p>year: {this.state.carYear}</p>
          <p>last annual vehicle licensing test: {this.state.carTest}</p>
          <p>valid car license: {this.state.carLicense}</p>
          <p>VIN: {this.state.carVIN}</p>
        </div>
    )
  }
}
export default MySkodaData;