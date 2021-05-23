import React, { useState } from "react";
import "./ResetPassword.css";
import { Alert, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import Parse from "parse";

export const ResetPassword = () => {
  const [hideAlertReset, setHideAlertReset] = useState(true);
  const [hideAlertSuccess, setHideAlertSuccess] = useState(true);

  const schema = yup.object().shape({
    // password: yup
    //   .string()
    //   .required("Please enter your password")
    //   .matches(
    //     /(?=.*\d)(?=.*[a-z]).{8,}/,
    //     "Password should contain at least one number and one lowercase letter, and at least 8 characters"
    //   ),
    resetPwd: yup
      .string()
      .required("Please enter your email")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Email should include '@' and '.' Email could contain english letters, numbers and symbols"
      ),
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
    resetPassword(data.resetPwd);
    e.target.reset();
    console.log(data);
  };

  const resetPassword = (email) => {
    let emailResetPwd = email;
    // Pass the username and password to logIn function
    Parse.User.requestPasswordReset(emailResetPwd)
      .then(() => {
        // Password reset request was sent successfully
        console.log("Reset password email sent successfully");
        setHideAlertReset(true);
        setHideAlertSuccess(false);
      })
      .catch((error) => {
        console.error(
          "Error while creating request to reset user password",
          error
        );
        setError("reset-email", "check");
      });
  };

  return (
    <>
      <div
        className="login-link d-inline-block mt-3"
        onClick={() => setHideAlertReset(false)}
      >
        Forgot password?
      </div>
      <Alert
        className="error-alert pt-5 mt-4"
        hidden={hideAlertReset}
        onClose={() => setHideAlertReset(true)}
        dismissible
      >
        <p className="m-0 mb-2">
          Please enter your email.
          <br />
          You will get a link to reset password.
        </p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            id="resetPwd"
            name="resetPwd"
            type="email"
            placeholder="Enter email"
            register={register}
            error={errors.reset}
            className="mb-2"
          />
          <Button className="next-button mt-5" variant="success" type="submit">
            Send
          </Button>
        </Form>
      </Alert>
      <Alert
        className="mt-2"
        variant="success"
        hidden={hideAlertSuccess}
        onClose={() => setHideAlertSuccess(true)}
        dismissible
      >
        <p className="m-0">
          Reset password email sent successfully. Check your email to reset
          password
        </p>
      </Alert>
    </>
  );
};
