import React, { useEffect, useState } from "react";
import "./ScheduleForm.css";
import DatePickerComp from "../DatePickerComp/DatePickerComp";
import Parse from "parse";
import { useData } from "../../shared/dataContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormSelect } from "../FormSelect/FormSelect";
import { FormInput } from "../FormInput/FormInput";
import { Button } from "react-bootstrap";

const ScheduleForm = () => {
  const { setValues, data } = useData();

  const [dealer, setDealer] = useState();
  const [service, setervice] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const schema = yup.object().shape({
    dealer: yup.string().required("Please choose dealer"),
    service: yup.string().required("Please choose service"),
    email: yup
      .string()
      .required("Please enter your email")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Email should include '@'. Email could contain english letters, numbers and symbols"
      ),
    phone: yup
      .string()
      .required("Please enter your phone")
      .matches(/[0-9]{2,3}-?[0-9]{7}/, "Phone should contain 9 or 10 digits"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const getSelectedDate = (date) => {
    setSelectedDate(date);
  };

  const sheduleDate = () => {
    const Shedule = Parse.Object.extend("Shedule");
    const myNewObject = new Shedule();

    myNewObject.set("sheduledDate", selectedDate.toString());
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

  const onSubmit = (data) => {
    console.log(data, selectedDate);
    reset();
    sheduleDate();
  };

  const carPlate = data.mispar_rechev;
  const carModel = data.kinuy_mishari;

  return (
    <form className="row g-3 shedule-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-6 mb-2">
        <label className="form-label">PlateNumber</label>
        <input
          type="text"
          className="form-control is-valid"
          value={carPlate}
          readOnly
          disabled
        />
      </div>
      <div className="col-md-6 mb-2">
        <label className="form-label">Model</label>
        <input
          type="text"
          className="form-control is-valid"
          value={carModel}
          readOnly
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

      <div className="col-md-12">
        <p className="mt-2">Select Date and Time</p>
        <DatePickerComp getSelectedDate={getSelectedDate} />
      </div>

      <div className="col-md-12">
        <FormInput
          className="mb-2"
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          register={register}
          error={errors.email}
        />
      </div>
      <div className="col-md-12">
        <FormInput
          className="mb-2"
          id="phone"
          name="phone"
          type="phone"
          label="Phone"
          placeholder="Phone"
          register={register}
          error={errors.phone}
        />
      </div>
      <div className="col-12">
        <Button className="btn my-4" variant="success" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ScheduleForm;
