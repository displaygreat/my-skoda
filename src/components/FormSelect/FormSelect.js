import React from "react";
import { Form } from "react-bootstrap";
import "./FormSelect.css";

export const FormSelect = ({
  register,
  error,
  label,
  id,
  options,
  ...inputProps
}) => (
  <>
    <Form.Label htmlFor={id}>{label}</Form.Label>
    <Form.Control as="select" {...register(id)} id={id} {...inputProps}>
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </Form.Control>
    {error && <div className="mb-3 text-danger">{error.message}</div>}
  </>
);
