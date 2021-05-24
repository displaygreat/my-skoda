import React, { useState } from "react";
import "./SignupForm.css";
import { Alert, Button, Form, Image } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import govData from "../../shared/govData";

export const SignupForm = (props) => {
  const { handleSignupOne } = props;
  const [showAlertCheck, setShowAlertCheck] = useState(false);
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
    govData(carPlate).then(
      (res) => {
        console.log(res);
        // if (!res) {
        // console.log("error");
        // setError("car-plate", "check");
        // setShowAlertCheck(true);
        // return;
        // } else {
        let plateNumber = res.mispar_rechev;
        console.log(plateNumber, carPlate);
        if (plateNumber === +carPlate) {
          handleSignupOne(plateNumber, email);
        }

        // }
      },
      (err) => {
        console.log(err, "error in signup: no such vehicle exists");
        setError("car-plate-email", "check");
        setShowAlertCheck(true);
        return;
      }
    );
  };

  return (
    <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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
          hidden={showAlertCheck}
          onClose={() => setShowAlertCheck(false)}
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
        <Button
          className="prev-button"
          variant="outline-success"
          onClick={() => history.push("./login")}
        >
          Back
        </Button>
        <Button className="next-button" variant="success" type="submit">
          Next
        </Button>
      </div>
    </Form>
    // <Form>
    //   <Form.Group controlId="formBasicPassword">
    //     <Form.Label>License plate number</Form.Label>
    //     <Form.Control
    //       type="text"
    //       placeholder="License plate number"
    //       value={this.state.userCarPlate}
    //       onChange={this.handleChangeInputPlate}
    //     />
    //     <Form.Text className="text-muted" hidden={this.state.hideErrorCarPlate}>
    //       License plate number should contain 7 or 8 digits
    //     </Form.Text>
    //   </Form.Group>
    //   <Form.Group controlId="formBasicEmail">
    //     <Form.Label>Email address</Form.Label>
    //     <Form.Control
    //       type="email"
    //       placeholder="Enter email"
    //       value={this.state.userEmail}
    //       onChange={this.handleChangeInputEmail}
    //     />
    //     <Form.Text className="text-muted" hidden={this.state.hideErrorEmail}>
    //       Email should include '@' and '.' Email could contain english letters,
    //       numbers and symbols
    //     </Form.Text>
    //   </Form.Group>
    //   <Alert
    //     className="error-alert"
    //     hidden={this.state.hideAlertRequired}
    //     onClose={() => this.setState({ hideAlertRequired: true })}
    //     dismissible
    //   >
    //     <p className="m-0">All fields are required</p>
    //   </Alert>
    //   <Alert
    //     className="error-alert"
    //     hidden={this.state.hideAlertIsExist}
    //     onClose={() => this.setState({ hideAlertIsExist: true })}
    //     dismissible
    //   >
    //     <p className="m-0">
    //       Check license plate number
    //       <br />
    //       and email
    //     </p>
    //   </Alert>
    //   <div className="prev-next-buttons">
    //     <Button
    //       className="prev-button"
    //       variant="outline-success"
    //       onClick={this.handleClickOnBackButton}
    //     >
    //       Back
    //     </Button>
    //     <Button
    //       className="next-button"
    //       type="submit"
    //       variant="success"
    //       onClick={this.getVehicle}
    //     >
    //       Next
    //     </Button>
    //   </div>
    // </Form>
  );
};
