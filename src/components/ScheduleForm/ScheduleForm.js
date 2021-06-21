import React, { useState } from "react";
import DatePickerComp from "../DatePickerComp/DatePickerComp";
import Parse from "parse";
import { useData } from "../../shared/dataContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormSelect } from "../FormSelect/FormSelect";

const ScheduleForm = () => {
  const { setValues, data } = useData();

  const [dealer, setDealer] = useState();
  const [service, setervice] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const schema = yup.object().shape({
    dealer: yup.string().required("Please choose dealer"),
    service: yup.string().required("Please choose service"),
    date: yup.string().required("Please choose date"),
    time: yup.string().required("Please choose time"),
    email: yup.string().required("Please enter your email"),
    phone: yup.string().required("Please enter your phone"),
  });

  const {
    register,
    // handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     selectedDate: {},
  //     values: {
  //       // dealer: '',
  //       // service: '',
  //       // email: '',
  //       // phone: '',
  //       // date: ''
  //     },
  //     touched: {
  //       // dealer: '',
  //       // service: '',
  //       // email: '',
  //       // phone: '',
  //       // date: ''
  //     },
  //     errors: {
  //       // dealer: '',
  //       // service: '',
  //       // email: '',
  //       // phone: '',
  //       // date: ''
  //     },
  //   };
  // }

  // handleChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   this.setState({
  //     values: {
  //       ...this.state.values,
  //       [name]: value,
  //     },
  //     touched: {
  //       ...this.state.touched,
  //       [name]: true,
  //     },
  //   });
  // };

  // handleBlur = (e) => {
  //   const { name, value } = e.target;
  //   const { [name]: removedError, ...rest } = this.state.errors;
  //   const error = this.props.validate[name](value);
  //   this.setState({
  //     errors: {
  //       ...rest,
  //       ...(error && { [name]: this.state.touched[name] && error }),
  //     },
  //   });
  // };

  // getSelectedDate = (date) => {
  //   const error = this.props.validate.date(date);
  //   this.setState({
  //     selectedDate: date,
  //     values: {
  //       ...this.state.values,
  //       date: date,
  //     },
  //     touched: {
  //       ...this.state.touched,
  //       date: true,
  //     },
  //     errors: {
  //       ...this.state.errors,
  //       ...(error && { date: this.state.touched.date && error }),
  //     },
  //   });
  // };

  const sheduleDate = () => {
    const Shedule = Parse.Object.extend("Shedule");
    const myNewObject = new Shedule();

    myNewObject.set("sheduledDate", this.state.selectedDate.toString());
    myNewObject.set("userId", Parse.User.current());

    myNewObject.save().then(
      (result) => {
        console.log("Shedule created", result);
      },
      (error) => {
        console.error("Error while creating Vehicle: ", error);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sheduleDate();
    // let errors = this.state.errors;
    // let touched = this.state.touched;
    // let values = this.state.values;
    // const formValidation = Object.keys(values).reduce(
    //   (acc, key) => {
    //     const newError = this.props.validate[key](values[key]);
    //     const newTouched = { [key]: true };
    //     return {
    //       errors: {
    //         ...acc.errors,
    //         ...(newError && { [key]: newError }),
    //       },
    //       touched: {
    //         ...acc.touched,
    //         ...newTouched,
    //       },
    //     };
    //   },
    //   {
    //     errors: { ...errors },
    //     touched: { ...touched },
    //   }
    // );
    // this.setState({
    //   errors: formValidation.errors,
    //   touched: formValidation.touched,
    // });

    // console.log(Object.values(formValidation.errors));
    // console.log(Object.values(formValidation.touched));
    // console.log(Object.values(this.state.values));

    // if (
    //   !Object.values(formValidation.errors).length && // errors object is empty
    //   Object.values(formValidation.touched).length ===
    //     Object.values(this.state.values).length && // all fields were touched
    //   Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
    // ) {
    //   alert(JSON.stringify(this.state.values, null, 2));
    // }
  };

  const carPlate = data.mispar_rechev;
  const carModel = data.kinuy_mishari;

  return (
    <form className="row g-3 shedule-form">
      <div className="col-md-6 mb-2">
        <label htmlFor="validationServer01" className="form-label">
          PlateNumber
        </label>
        <input
          type="text"
          className="form-control is-valid"
          // id="validationServer01"
          value={carPlate}
          readOnly
          // required
          disabled
        />
      </div>
      <div className="col-md-6 mb-2">
        <label htmlFor="validationServer02" className="form-label">
          Model
        </label>
        <input
          type="text"
          className="form-control is-valid"
          // id="validationServer02"
          value={carModel}
          readOnly
          // required
          disabled
        />
      </div>
      <div className="col-md-12">
        <FormSelect
          className="mb-2"
          id="dealer"
          name="dealer"
          label="Choose dealer"
          register={register}
          error={errors.dealer}
          options={[
            "",
            "Felix Official Dealer Tel-Aviv",
            "HaGoren Official Dealer Nataniya",
            "MotorUp Official Dealer Petach-Tikva",
          ]}
        />
      </div>
      <div className="col-md-12">
        <FormSelect
          className="mb-2"
          id="service"
          name="service"
          label="Choose services"
          register={register}
          error={errors.service}
          options={[
            "",
            "Inspection Before Annual Vehicle Licensing Test",
            "Multi-Point Inspection",
            "Full service",
            "Inspection before summer",
            "Inspection before winter",
          ]}
        />
      </div>
      {/* <div className="col-md-12">
        <p className="mt-2">Select Date and Time</p>
        <label htmlFor="validationServer03" className="mt-2">
          Select Date and Time
        </label>
        <div id="validationServer03" className={this.state.errors.date}>
          <DatePickerComp getSelectedDate={this.getSelectedDate} />
        </div>
        <div id="validationServer03Feedback" className="invalid-feedback">
          Please select date and time.
        </div>
      </div>
      <div className="col-md-12">
        <label
          htmlFor="validationServer03"
          className="col-2 col-form-label pl-0 pt-0"
        >
          Email
        </label>
        <div className="col-lg-10 col-md-12 col-sm-10 col-xs-12 pl-0">
          <input
            className={`form-control ${this.state.errors.email}`}
            style={{ backgroundImage: "none", borderColor: "#000" }}
            type="email"
            placeholder="example@example.com"
            name="email"
            onChange={this.handleChangeInput}
            onBlur={this.handleBlur}
            value={email}
            id="validationServer03"
            aria-describedby="validationServer03Feedback"
            required
          />
          <div id="validationServer03Feedback" className="invalid-feedback">
            Please provide a valid email.
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <label
          htmlFor="validationServer03"
          className="col-2 col-form-label pl-0"
        >
          Phone
        </label>
        <div className="col-lg-10 col-md-12 col-sm-10 col-xs-12 pl-0">
          <input
            className={`form-control ${this.state.errors.phone}`}
            style={{ backgroundImage: "none", borderColor: "#000" }}
            type="tel"
            placeholder="050-5005050"
            name="phone"
            onChange={this.handleChangeInput}
            onBlur={this.handleBlur}
            value={phone}
            id="validationServer03"
            aria-describedby="validationServer03Feedback"
            required
          />
          <div id="validationServer03Feedback" className="invalid-feedback">
            Please provide a valid telephone.
          </div>
        </div>
      </div>
      <div className="col-12">
        <button
          className="btn btn-primary shedule-submit my-4"
          type="submit"
          onClick={this.handleSubmit}
        >
          Submit form
        </button>
      </div> */}
    </form>
  );
};

export default ScheduleForm;
