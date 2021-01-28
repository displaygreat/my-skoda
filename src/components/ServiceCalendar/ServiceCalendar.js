import './ServiceCalendar.css';
import React from 'react';
import { Col } from 'react-bootstrap';
import servicesJSON from '../../data/services.json';
import moment from 'moment';
// import 'animate.css/animate.css';
// import Animate from 'animate.css-react';


class ServiceCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const table = servicesJSON;
    console.log(table);
    
    const sortedTable = table.sort((a, b) => {
      let dateA=new Date(a.recommended.split("/").reverse().join("-")), dateB=new Date(b.recommended.split("/").reverse().join("-"))
      return dateA-dateB
    });
    console.log(sortedTable);
    const newTable = sortedTable.map((service) => {
        return (
          <tr>
            <th className="service-cell"><small>recommended</small><br/>{service.recommended}</th>
            <td className="service-cell">{service.service}</td>
            <td className="service-cell"><small>shedule</small><br/><a className="shedule-link" href="/#/shedule">{service.shedule}</a></td>
          </tr>
        )
    })

    return(
     <div class="c-myskoda-service">
        <h1 className="display-4 myskoda-title" onClick={this.sortDates}>Service Calendar</h1>
        <Col className="column" xs={12} md={4}>
              <p class="text-regular">Keep Your Skoda At Its Best with Our Service</p>
              <span className="text-small">Scheduled maintenance can saving you lots in the long run</span>
              <table class="table table-success table-striped table-bordered" style={{ width: '397px' }}>
                <tr className="table-secondary">
                    <th className="service-cell" scope="row">Visit</th>
                    <th className="service-cell">Service</th>
                    <th className="service-cell">Shedule</th>
                  </tr>
                {newTable}
              </table>
        </Col>
      </div>
    )
  }
}
export default ServiceCalendar;