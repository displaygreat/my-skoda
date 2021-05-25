import React, { useState } from "react";
import "./SignupFormOne.css";
import { Alert, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import govData from "../../shared/govData";
import { ButtonComp } from "../ButtonComp/ButtonComp";

export const SignupFormOne = (props) => {
  const { handleSignupOne } = props;
  const [hideAlertCheck, setHideAlertCheck] = useState(false);
  let history = useHistory();

  const schema = yup.object().shape({
    carPlate: yup
      .string()
      .required("Please enter license plate number of your car")
      .matches(
        /^\d{7,8}$/,
        "License plate number should contain 7 or 8 digits"
      ),
    email: yup
      .string()
      .required("Please enter your email")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Email should include '@'. Email could contain english letters, numbers and symbols"
      ),
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

  const onSubmit = (data) => {
    reset();
    getData(data.carPlate, data.email);
  };

  const getData = (carPlate, email) => {
    govData(carPlate).then((res) => {
      if (!res) {
        setError("car-plate", "check");
        setHideAlertCheck(false);
        return;
      } else {
        let plateNumber = res.mispar_rechev;
        if (plateNumber === +carPlate) {
          handleSignupOne(plateNumber, email);
        }
      }
    });
  };

  return (
    <Form className="signup-form-one" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        className="mb-2"
        id="carPlate"
        name="carPlate"
        type="text"
        label="License plate number"
        placeholder="License plate number"
        register={register}
        error={errors.carPlate}
      />
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
      {Object.keys(errors).length > 0 && (
        <Alert
          className="error-alert"
          hidden={hideAlertCheck}
          onClose={() => setHideAlertCheck(true)}
          dismissible
        >
          <p className="m-0">
            Check license plate number
            <br />
            and email
          </p>
        </Alert>
      )}
      <div className="buttons-group">
        <ButtonComp
          className="prev-button"
          content="Back"
          variant="outline-success"
          onClick={() => history.push("./login")}
        />
        <ButtonComp
          className="next-button"
          content="Next"
          variant="success"
          type="submit"
        />
      </div>
    </Form>
  );
};
