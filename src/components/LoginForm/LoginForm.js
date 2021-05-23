import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import "./LoginForm.css";
import server from "../../shared/server";
import govData from "../../shared/govData";
import { Alert, Button, Form, Image } from "react-bootstrap";
import eye from "../../assets/img/eye.png";
import eyeOff from "../../assets/img/eye-off.png";

export const LoginForm = (props) => {
  const { handleLogIn, getVehicle } = props;
  const [hideAlertCheck, setHideAlertCheck] = useState(false);
  const [offPwd, setOffPwd] = useState("show");
  const [onPwd, setOnPwd] = useState("hide");
  const [type, setType] = useState("password");
  let history = useHistory();

  const schema = yup.object().shape({
    login: yup.string().required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();
    server(data.login, data.password).then(
      (res) => {
        console.log(res);
        if (!res) {
          console.log("error");
          setError("login-password", "check");
          setHideAlertCheck(false);
          return;
        } else {
          handleLogIn(res.attributes);
          console.log(res.attributes.plateNumber);
          govData(res.attributes.plateNumber).then((res) => {
            getVehicle(res);
          });
        }
      },
      (err) => console.log(err, "error in login: no such user exists")
    );
  };

  const showPassword = () => {
    setOffPwd("hide");
    setOnPwd("show");
    setType("text");
  };

  const hidePassword = () => {
    setOffPwd("show");
    setOnPwd("hide");
    setType("password");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="login"
        name="login"
        type="email"
        label="Email"
        placeholder="Email"
        register={register}
        error={errors.login}
      />
      <div className="input-password">
        <FormInput
          id="password"
          name="password"
          type={type}
          label="Password"
          placeholder="Password"
          register={register}
          error={errors.password}
        />
        <Image
          className={`icon-eye-off ${offPwd}`}
          src={eyeOff}
          onClick={showPassword}
        />
        <Image
          className={`icon-eye ${onPwd}`}
          src={eye}
          onClick={hidePassword}
        />
      </div>
      {Object.keys(errors).length > 0 && (
        <Alert
          className="error-alert"
          hidden={hideAlertCheck}
          onClose={() => setHideAlertCheck(true)}
          dismissible
        >
          <p className="m-0">
            Check email
            <br />
            and password
            <br />
            or{" "}
            <a className="login-link" href="/#/signup-step-one">
              Create account
            </a>
          </p>
        </Alert>
      )}
      <Button
        className="prev-button"
        variant="outline-success"
        onClick={() => {
          history.push("./signup-step-one");
        }}
      >
        Back
      </Button>
      <Button type="submit" className="next-button" variant="success">
        Next
      </Button>
    </Form>
  );
};
