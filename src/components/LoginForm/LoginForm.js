import React, { useState } from "react";
import "./LoginForm.css";
import { Alert, Button, Form, Image } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import server from "../../shared/server";
import govData from "../../shared/govData";
import eye from "../../assets/img/eye.png";
import eyeOff from "../../assets/img/eye-off.png";
import { ResetPassword } from "../ResetPassword/ResetPassword";

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
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, e) => {
    console.log(data);
    reset();
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
    <>
      <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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
            </p>
          </Alert>
        )}
        <div className="prev-next-buttons">
          <Button
            className="prev-button"
            variant="outline-success"
            onClick={() => {
              history.push("./signup-step-one");
            }}
          >
            Back
          </Button>
          <Button className="next-button" variant="success" type="submit">
            Next
          </Button>
        </div>
      </Form>
      <ResetPassword />
      <Link className="login-form-link" to="./signup-step-one">
        Don't have an account?
      </Link>
      <Button
        className="signup-button"
        variant="success"
        onClick={() => {
          history.push("./signup-step-one");
        }}
      >
        Create account
      </Button>
    </>
  );
};
