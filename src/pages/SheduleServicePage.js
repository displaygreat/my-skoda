import './SheduleServicePage.css';
import React from 'react';
import MySkodaNavbar from '../components/MySkodaNavbar/MySkodaNavbar';
import MySkodaFooter from '../components/MySkodaFooter/MySkodaFooter';

class SheduleServicePage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div>
        <MySkodaNavbar />
        <p>SheduleServicePage</p>
        <MySkodaFooter />
        </div>
    )
  }
}
export default SheduleServicePage;