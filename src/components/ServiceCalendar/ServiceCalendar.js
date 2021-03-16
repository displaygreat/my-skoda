import './ServiceCalendar.css';
import React from 'react';
import moment from 'moment';


class ServiceCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inspectionBeforeTest: '',
      multiPointInspection: '',
      summerInspection: '',
      winterInspection: ''
    }
  }

  componentDidMount () {
    this.getInspectionBeforeTest();
    this.getMultiPointInspection();
    this.getSeasonInspection();
  }

  componentDidUpdate (prevProps, prevState) {
    if(this.props !== prevProps) {
      this.getInspectionBeforeTest();
    }
  }

  getFullDate = (date) => {
    let momentObjDate = moment(date, 'DD/MM/YYYY');
    let fullDate = momentObjDate.toDate();
    return fullDate;
  }

  getInspectionBeforeTest = () => {
    let yearNow = new Date().getFullYear();
    let carYear = this.props.carYear;
    let carAge = yearNow - carYear;

    let lastTest = this.props.carTest;
    let fullDateLastTest = this.getFullDate(lastTest);

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

  getMultiPointInspection = () => {
    let lastInspection = this.props.lastInspection;
    console.log(lastInspection);
    if (lastInspection === '' || lastInspection === undefined) {
      let dateNow = new Date();
      let momentObjDateToInspection = moment(dateNow).add(7, 'days');
      let dateToInspection = moment(momentObjDateToInspection).format('DD/MM/YYYY');
      this.setState({
        multiPointInspection: dateToInspection
      })
      return;
    }
    let fullDateLastInspection = this.getFullDate(lastInspection);
    let momentObjMultiPointInspection = moment(fullDateLastInspection).add(1, 'year');
    let dateMultiPointInspection = moment(momentObjMultiPointInspection).format('DD/MM/YYYY');
    this.setState({
      multiPointInspection: dateMultiPointInspection
    })
  }

  getSeasonInspection = () => {
    let fullDateNow = new Date();
    let dateNow = moment(fullDateNow);
    let momentObjDateAfterYear = moment(fullDateNow).add(1, 'year');
    let dateAfterYear = moment(momentObjDateAfterYear);
    let firstOfMay;
    let firstOfNovember;
    while (dateAfterYear > dateNow) {
      if(dateNow.format('DD/MM/YYYY') === "01/05/2021") {
        firstOfMay = dateNow.format('DD/MM/YYYY');
      }
      if(dateNow.format('DD/MM/YYYY') === "01/11/2021") {
        firstOfNovember = dateNow.format('DD/MM/YYYY');
      }
      dateNow.add(1, 'day'); 
    }
    this.setState({
      summerInspection: firstOfMay,
      winterInspection: firstOfNovember
    })
  }

  sheduleServices = (date) => {
    let fullRecommendedDate = this.getFullDate(date);
    let momentObjDateToShedule = moment(fullRecommendedDate).subtract(7, 'days');
    let dateToShedule = moment(momentObjDateToShedule).format('DD/MM/YYYY');
    return dateToShedule;
  }

  getSortedData = () => {
    const { inspectionBeforeTest, multiPointInspection, summerInspection, winterInspection } = this.state;
    const services = [
      {
        "recommended": inspectionBeforeTest,
        "service": "Inspection Before Annual Vehicle Licensing Test",
        "shedule": this.sheduleServices(inspectionBeforeTest)
      },
      {
        "recommended": multiPointInspection,
        "service": "Multi-Point Inspection",
        "shedule": this.sheduleServices(multiPointInspection)
      },
      {
        "recommended": winterInspection,
        "service": "Inspection before winter",
        "shedule": this.sheduleServices(winterInspection)
      },
      {
        "recommended": summerInspection,
        "service": "Inspection before summer",
        "shedule": this.sheduleServices(summerInspection)
      }
    ];
    const sortedData = services.sort((a, b) => {
      let dateA=new Date(a.recommended.split("/").reverse().join("-"));
      let dateB=new Date(b.recommended.split("/").reverse().join("-"));
      return dateA-dateB
    });
    return sortedData;
  }

  render() {
    const sortedData = this.getSortedData();
    console.log(sortedData);
    const servicesTable = sortedData.map((service) => {
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
          {servicesTable}
        </table>
      </div>
    )
  }
}
export default ServiceCalendar;