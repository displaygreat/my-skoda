import React from 'react';
import moment from 'moment';
import Parse from 'parse';
import DatePicker from "react-datepicker";
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Styles = styled.div`
.react-datepicker__input-container input,
.react-datepicker__input-container,
.react-datepicker-wrapper {
  width: 240px;
  height: 38px;
  margin-bottom: 30px;
  display: block;
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
 .react-datepicker__day--keyboard-selected:focus,
 .react-datepicker__day--selected:focus {
    outline: none;
 }
 .react-datepicker__header {
    background-color:#29a84633;
 }
 .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
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
 }
`;

class DatePickerComp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedDate: setHours(setMinutes(new Date(), 0), 8),
      excludeTimes: []
    }
  }

  handleSelectedDate = (date) => {
    this.setState({
      selectedDate: date
    })
    this.props.getSelectedDate(date);
  }

  getExcludeTimes = (date) => {
    this.setState({
      excludeTimes: []
    })

    const Shedule = Parse.Object.extend('Shedule');
    const query = new Parse.Query(Shedule);
    
    query.find().then((results) => {
      let arrDates = [];
      for (let i=0; i<results.length; i++) {
         arrDates.push(results[i].attributes.sheduledDate);
      }

      let arrExcludeDates = [];
      for (let i=0; i<arrDates.length; i++) {
        if (moment(date).format('YYYY/MM/DD') === moment(arrDates[i]).format('YYYY/MM/DD')) {
          arrExcludeDates.push(moment(Date.parse(arrDates[i])).toObject());
        }
      }
      
      let arrExcludeTimes = [];
        for (let j=0; j<arrExcludeDates.length; j++) {
          arrExcludeTimes.push(setHours(setMinutes(new Date(), arrExcludeDates[j].minutes), arrExcludeDates[j].hours))
          this.setState({
            excludeTimes: arrExcludeTimes
          })
        }
        
    }, (error) => {
      console.error('Error while fetching Shedule', error);
    });
  }

  render () {
    const { selectedDate, excludeTimes } = this.state;
      return (
        <Styles>
          <DatePicker
            isClearable
            selected={selectedDate}
            onChange={this.handleSelectedDate}
            onSelect={this.getExcludeTimes}
            placeholderText="Select Date and Time"
            popperPlacement="top-start"
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
            dateFormat="dd/MM/yyy"
            minDate={new Date()}
          />
          <DatePicker
            isClearable
            selected={selectedDate}
            onChange={this.handleSelectedDate}
            onSelect={this.getExcludeTimes}
            placeholderText="Select Date and Time"
            popperPlacement="top-start"
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
            dateFormat="hh:mm aa"
            minDate={new Date()}
            excludeTimes={excludeTimes}
            minTime={setHours(setMinutes(new Date(), 0), 8)}
            maxTime={setHours(setMinutes(new Date(), 45), 14)}
          />
        </Styles>
    )
  }
}
export default DatePickerComp;