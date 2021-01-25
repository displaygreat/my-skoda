import './MySkodaPage.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import MySkodaData from '../components/MySkodaData/MySkodaData';

class MySkodaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCarPlate: this.props.sendUserCarPlate
    }
  }

  // getDataVehicle = async (e) => {
  //   e.preventDefault();
  //   let carPlate = this.props.sendUserCarPlate;
  //   console.log(carPlate);
  //   this.setState({
  //     userCarPlate: carPlate
  //   })
  //   const apiUrl = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={%22mispar_rechev%22:[%22${carPlate}%22]}`);

  //   const data = await apiUrl.json();
  //   console.log(data);
  // }

  render() {
    return(
      <Container>
        <MySkodaData sendUserCarPlate={this.state.userCarPlate} />
      </Container>
    )
  }
}
export default MySkodaPage;