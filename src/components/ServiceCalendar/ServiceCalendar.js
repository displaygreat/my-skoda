import './ServiceCalendar.css';
import React from 'react';
import { Col } from 'react-bootstrap';
import servicesJSON from '../../data/services.json';


class ServiceCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.sendUserId,
      userCarPlate: this.props.sendUserCarPlate,
    }
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
            <td className="service-cell"><small>shedule</small><br/><a className="shedule-link" href="#/shedule">{service.shedule}</a></td>
          </tr>
        )
    })

    return(
     <div class="c-service-calendar col-md-12 col-lg-4">
        <h1 className="display-4 my-skoda-title" onClick={this.sortDates}>Service Calendar</h1>
        <p class="text-regular">Keep Your Skoda At Its Best with Our Service</p>
        <span className="text-small">Scheduled maintenance can saving you lots in the long run</span>
        <table class="table table-success table-striped table-bordered">
          <tr className="table-secondary">
            <th className="service-cell" scope="row">Visit</th>
            <th className="service-cell">Service</th>
            <th className="service-cell">Shedule</th>
          </tr>
          {newTable}
        </table>
      </div>
    )
  }
}
export default ServiceCalendar;