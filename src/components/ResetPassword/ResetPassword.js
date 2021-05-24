import React, { useState } from "react";
import "./ResetPassword.css";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import Parse from "parse";

export const ResetPassword = () => {
  const [hideAlertCheck, setHideAlertCheck] = useState(true);
  const [showModalReset, setShowModalReset] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const onCloseReset = () => {
    setShowModalReset(false);
    reset();
  };

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
    resetPassword(data.resetPwd);
  };

  const resetPassword = (email) => {
    // Pass the username and password to logIn function
    Parse.User.requestPasswordReset(email)
      .then(() => {
        // Password reset request was sent successfully
        console.log("Reset password email sent successfully");
        setShowModalReset(false);
        setShowModalSuccess(true);
      })
      .catch((error) => {
        console.error(
          "Error while creating request to reset user password",
          error
        );
        setError("email", "check");
        setHideAlertCheck(false);
      });
  };

  return (
    <>
      <span className="reset-link" onClick={() => setShowModalReset(true)}>
        Forgot password?
      </span>
      <Modal
        className="reset-modal"
        show={showModalReset}
        animation={false}
        onHide={onCloseReset}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              error={errors.resetPwd}
              className="mb-2 w-75"
            />
            <div className="send-close-btns">
              <Button
                className="next-button mt-3 mr-3"
                variant="success"
                type="submit"
              >
                Send
              </Button>
              <Button
                className="next-button mt-3"
                variant="outline-success"
                onClick={onCloseReset}
              >
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        className="reset-modal-success"
        show={showModalSuccess}
        animation={false}
        onHide={() => setShowModalSuccess(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Reset password email sent successfully.
            <br />
            Check your email to reset password
          </p>
          <Button
            variant="outline-success"
            onClick={() => setShowModalSuccess(false)}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
      {Object.keys(errors).length > 0 && (
        <Alert
          className="error-alert"
          hidden={hideAlertCheck}
          onClose={() => setHideAlertCheck(true)}
          dismissible
        >
          <p className="m-0">
            Error while creating request to reset user password.
            <br />
            Please try again later.
          </p>
        </Alert>
      )}
    </>
  );
};
