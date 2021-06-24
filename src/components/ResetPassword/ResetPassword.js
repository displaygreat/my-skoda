import React, { useState } from "react";
import "./ResetPassword.css";
import { Form } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import Parse from "parse";
import { ModalComp } from "../ModalComp/ModalComp";
import { ButtonComp } from "../ButtonComp/ButtonComp";

export const ResetPassword = () => {
  const [showModalReset, setShowModalReset] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const schema = yup.object().shape({
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
        setShowModalReset(false);
        setShowModalError(true);
      });
  };

  const onCloseReset = () => {
    setShowModalReset(false);
    reset();
  };

  return (
    <>
      <span className="reset-link" onClick={() => setShowModalReset(true)}>
        Forgot password?
      </span>
      <ModalComp
        className="reset-modal"
        title="Reset password"
        body={
          <p>
            Please enter your email.
            <br />
            You will get a link to reset password.
          </p>
        }
        show={showModalReset}
        onHide={onCloseReset}
        animation={false}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            className="w-75 mb-2"
            id="resetPwd"
            name="resetPwd"
            type="email"
            placeholder="Enter email"
            register={register}
            error={errors.resetPwd}
          />
          <div className="buttons-group mt-5">
            <ButtonComp
              className="mr-3"
              content="Send"
              variant="success"
              type="submit"
            />
            <ButtonComp
              content="Close"
              variant="outline-success"
              onClick={onCloseReset}
            />
          </div>
        </Form>
      </ModalComp>
      <ModalComp
        className="reset-modal-success"
        title="Success!"
        body={
          <p>
            Reset password email sent successfully.
            <br />
            Check your email to reset password
          </p>
        }
        show={showModalSuccess}
        animation={false}
        onHide={() => setShowModalSuccess(false)}
      >
        <ButtonComp
          className="mt-4"
          content="Close"
          variant="success"
          onClick={() => setShowModalSuccess(false)}
        />
      </ModalComp>

      {Object.keys(errors).length > 0 && (
        <ModalComp
          className="reset-modal"
          title="Error!"
          body={
            <p>
              Error while creating request to reset user password.
              <br />
              Please try again later.
            </p>
          }
          show={showModalError}
          animation={false}
          onHide={() => setShowModalError(false)}
        >
          <ButtonComp
            className="mt-4"
            content="Close"
            variant="success"
            onClick={() => setShowModalError(false)}
          />
        </ModalComp>
      )}
    </>
  );
};
