import React, { useState } from "react";
import "./SignupFormTwo.css";
import { Alert, Form, Image } from "react-bootstrap";
import eye from "../../assets/img/eye.png";
import eyeOff from "../../assets/img/eye-off.png";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import { ButtonComp } from "../ButtonComp/ButtonComp";
import Parse from "parse";
import { useData } from "../../shared/dataContext";

export const SignupFormTwo = (props) => {
  const { data, setValues } = useData();
  const email = data?.newUserEmail;
  const vehicle = data?.newUserVehicle?.toString();

  const [type, setType] = useState("password");
  const [offPwd, setOffPwd] = useState("show");
  const [onPwd, setOnPwd] = useState("hide");
  const [status, setStatus] = useState("notSignedUp");
  const [hideAlertSuccess, setHideAlertSuccess] = useState(true);
  const [hideAlertIsExists, setHideAlertIsExists] = useState(true);
  let history = useHistory();

  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Please type password")
      .matches(
        /(?=.*\d)(?=.*[a-z]).{8,}/,
        "Password should contain at least one number and one lowercase letter, and at least 8 or more characters"
      ),
    passwordConfirmation: yup
      .string()
      .required("Please confirm password!")
      .test("shouldMatch", "Passwords should match!", (value) => {
        const { password } = getValues();
        return value === password;
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const showPassword = () => {
    setType("text");
    setOffPwd("hide");
    setOnPwd("show");
  };

  const hidePassword = () => {
    setType("password");
    setOffPwd("show");
    setOnPwd("hide");
  };

  const onSubmit = (data) => {
    reset();
    signupUser(data.passwordConfirmation);
  };

  const signupUser = (pwd) => {
    const user = new Parse.User();
    user.set("username", email);
    user.set("email", email);
    user.set("password", pwd);
    user.set("plateNumber", vehicle);

    user
      .signUp()
      .then((user) => {
        console.log("User signed up", user);
        setHideAlertSuccess(false);
        setStatus("signedUp");
      })
      .catch((error) => {
        console.error("Error while signing up user", error);
        setHideAlertIsExists(false);
        setStatus("signedUp");
      });
  };

  return (
    <Form className="signup-form-two" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-password">
        <FormInput
          className="mb-2"
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
      <div className="input-password">
        <FormInput
          className="mb-2"
          id="passwordConfirmation"
          name="passwordConfirmation"
          type={type}
          label="Confirm password"
          placeholder="Confirm password"
          register={register}
          error={errors.passwordConfirmation}
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
      <Alert
        variant="success"
        hidden={hideAlertSuccess}
        onClose={() => setHideAlertSuccess(true)}
        dismissible
      >
        <p className="m-0">
          Success!
          <br />
          You are signed up.
          <br />
          Please{" "}
          <a className="signup-link" href="#/login">
            Login
          </a>
        </p>
      </Alert>
      <Alert
        className="error-alert"
        hidden={hideAlertIsExists}
        onClose={() => setHideAlertIsExists(true)}
        dismissible
      >
        <p className="m-0">
          Account already exists.
          <br />
          Please{" "}
          <a className="signup-link" href="#/login">
            Login
          </a>
        </p>
      </Alert>
      <div className="buttons-group">
        <ButtonComp
          className="prev-button"
          content="Back"
          variant="outline-success"
          onClick={() => {
            history.push("./signup-step-one");
            localStorage.clear();
          }}
        />
        {status === "signedUp" && (
          <ButtonComp
            className="prev-button"
            content="LogIn"
            variant="success"
            onClick={() => {
              history.push("./login");
              localStorage.clear();
            }}
          />
        )}
        {status === "notSignedUp" && (
          <ButtonComp
            className="next-button"
            content="SignUp"
            variant="success"
            type="submit"
          />
        )}
      </div>
    </Form>
  );
};
