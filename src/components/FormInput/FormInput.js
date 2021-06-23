import React from "react";
import { Form } from "react-bootstrap";
import "./FormInput.css";

export const FormInput = ({ register, error, label, id, ...inputProps }) => {
  return (
    <>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Control {...register(id)} id={id} {...inputProps} />
      {error && <div className="mb-3 text-danger">{error.message}</div>}
    </>
  );
};
