import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import "./LoginForm.css";
import server from "../../shared/server";
import data from "../../shared/data";
import { Button, Form, Image } from "react-bootstrap";

export const LoginForm = (props) => {
  const { handleLogIn, getVehicle } = props;

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema: Yup.object({
      login: Yup.string().required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
    }),
  });

  const onSubmit = ({ email, pwd }) => {
    console.log(email, pwd);
    // server(email, pwd).then(
    //   (res) => {
    //     console.log(res);
    //     // if (!res) {
    //     //   setHideAlertIsLogin(false);
    //     //   setUserEmail("");
    //     //   setUserPwd("");
    //     // } else {
    //     handleLogIn(res.attributes);
    //     console.log(res.attributes.plateNumber);
    //     data(res.attributes.plateNumber).then((res) => {
    //       getVehicle(res);
    //     });
    //     // }
    //   },
    //   (err) => console.log(err, "error in login: no such user exists")
    // );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="login"
        name="login"
        type="email"
        label="Email"
        {...register("example")}
        error={errors}
        placeholder="Enter email"
        // required
        // value={userEmail}
        // onChange={handleChangeInputEmail}
      />
      <div className="input-password">
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          {...register("example2")}
          error={errors}
          placeholder="Password"
          // required
          // type={type}
          // value={userPwd}
          // onChange={handleChangeInputPwd}
        />
        {/* <Image
          className={`icon-eye-off ${offPwd}`}
          src={eyeOff}
          onClick={showPassword}
        />
        <Image
          className={`icon-eye ${onPwd}`}
          src={eye}
          onClick={hidePassword}
        /> */}
      </div>
      <button
        className="prev-button"
        variant="outline-success"
        // onClick={handleClickOnBackButton}
      >
        Back
      </button>
      <button type="submit" className="next-button" variant="success">
        Next
      </button>
    </form>
  );
};
