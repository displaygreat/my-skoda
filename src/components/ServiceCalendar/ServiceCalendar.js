import './ServiceCalendar.css';
import React from 'react';
import servicesJSON from '../../data/services.json';
import moment from 'moment';


class ServiceCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inspectionBeforeTest: '',
      multiPointInspection: '',
    }
  }

  componentDidMount () {
    this.getInspectionBeforeTest();
  }

  componentDidUpdate (prevProps, prevState) {
    if(this.props !== prevProps) {
      this.getInspectionBeforeTest();
    }
  }

  getInspectionBeforeTest = () => {
    let yearNow = new Date().getFullYear();
    let carYear = this.props.carYear;
    let carAge = yearNow - carYear;
    let lastTest = this.props.carTest;
    let momentObjLastTest = moment(lastTest, "DD/MM/YYYY");
    let fullDateLastTest = momentObjLastTest.toDate();
    console.log(carYear, lastTest);
    let momentObjNextTest = {};
    if (carAge <= 2) {
      momentObjNextTest = moment(fullDateLastTest).add(3, 'years');
    }
    if (carAge >= 3 && carAge < 20) {
      momentObjNextTest = moment(fullDateLastTest).add(1, 'years');
    }
    if (carAge >= 20 ) {
      momentObjNextTest = moment(fullDateLastTest).add(6, 'months');
    }
    let momentObjInspectionBeforeTest = moment(momentObjNextTest).subtract(14, 'days');
    let dateInspectionBeforeTest = moment(momentObjInspectionBeforeTest).format('DD/MM/YYYY');
    this.setState({
      inspectionBeforeTest: dateInspectionBeforeTest
    })
  }

  render() {
    console.log(this.state.inspectionBeforeTest);
    const table = servicesJSON;
    
    const sortedTable = table.sort((a, b) => {
      let dateA=new Date(a.recommended.split("/").reverse().join("-")), dateB=new Date(b.recommended.split("/").reverse().join("-"))
      return dateA-dateB
    });
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
        <h1 className="display-4 my-skoda-title">Service Calendar</h1>
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