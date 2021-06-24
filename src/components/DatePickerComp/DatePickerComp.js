import React, { useState } from "react";
import moment from "moment";
import Parse from "parse";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
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
.react-datepicker-wrapper + p {
  margin-top: -1.3rem;
  color: #dc3545;
}
.react-datepicker__input-container > input {
  padding: .375rem .75rem;
}
.react-datepicker__close-icon {
  padding: 0 .75rem 0 0;
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

const DatePickerComp = (props) => {
  const { getSelectedDate } = props;
  const [selectedDate, setSelectedDate] = useState();
  const [excludedTimes, setExcludedTimes] = useState([]);
  const {
    control,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { onChange, ...rest } = register("date");

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    getSelectedDate(date);
  };

  const getExcludedTimes = (date) => {
    setExcludedTimes([]);

    const Schedule = Parse.Object.extend("Schedule");
    const query = new Parse.Query(Schedule);

    query.find().then(
      (results) => {
        let arrDates = [];
        for (let i = 0; i < results.length; i++) {
          arrDates.push(results[i].attributes.scheduledDate);
        }

        let arrExcludeDates = [];
        for (let i = 0; i < arrDates.length; i++) {
          if (
            moment(date, moment.ISO_8601).format("YYYY/MM/DD") ===
            moment(new Date(arrDates[i]), moment.ISO_8601).format("YYYY/MM/DD")
          ) {
            arrExcludeDates.push(
              moment(new Date(arrDates[i]), moment.ISO_8601).toObject()
            );
          }
        }

        let arrExcludedTimes = [];
        for (let j = 0; j < arrExcludeDates.length; j++) {
          arrExcludedTimes.push(
            setHours(
              setMinutes(new Date(), arrExcludeDates[j].minutes),
              arrExcludeDates[j].hours
            )
          );
          setExcludedTimes(arrExcludedTimes);
        }
        console.log(arrExcludedTimes);
      },
      (error) => {
        console.error("Error while fetching Shedule", error);
      }
    );
  };

  return (
    <Styles>
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DatePicker
            isClearable
            selected={selectedDate}
            onChange={(date) => {
              field.onChange(date);
              handleSelectedDate(date);
              setError("date", {
                type: "manual",
                message: "Please choose date and time",
              });
            }}
            onBlur={() => {
              setError("date", {
                type: "manual",
                message: "Please choose date and time",
              });
            }}
            onSelect={(date) => {
              handleSelectedDate(date);
              getExcludedTimes(date);
              clearErrors(["date"]);
            }}
            placeholderText="Select Date and Time"
            popperPlacement="top-start"
            popperModifiers={{
              offset: {
                enabled: true,
                offset: "0px, 10px",
              },
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: "viewport",
              },
            }}
            dateFormat="dd/MM/yyy"
            minDate={new Date()}
          />
        )}
      />
      {errors.date && <p>{errors.date.message}</p>}
      <Controller
        control={control}
        name="time"
        render={({ field }) => (
          <DatePicker
            isClearable
            selected={selectedDate}
            excludeTimes={excludedTimes}
            onChange={(date) => {
              field.onChange(date);
              handleSelectedDate(date);
              setError("time", {
                type: "manual",
                message: "Please choose date",
              });
            }}
            onBlur={() => {
              setError("date", {
                type: "manual",
                message: "Please choose date",
              });
            }}
            onSelect={() => {
              getExcludedTimes();
              clearErrors(["time"]);
            }}
            placeholderText="Select Date and Time"
            popperPlacement="top-start"
            popperModifiers={{
              offset: {
                enabled: true,
                offset: "0px, 10px",
              },
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: "viewport",
              },
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="hh:mm aa"
            minDate={new Date()}
            minTime={setHours(setMinutes(new Date(), 0), 8)}
            maxTime={setHours(setMinutes(new Date(), 45), 14)}
          />
        )}
      />
      {errors.date && <p>{errors.date.message}</p>}
    </Styles>
  );
};
export default DatePickerComp;
