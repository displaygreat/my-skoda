import React from "react";
import "./ButtonComp.css";
import { Button } from "react-bootstrap";

export const ButtonComp = ({ className, onClick, content, ...rest }) => (
  <Button className={className} onClick={onClick} {...rest}>
    {content}
  </Button>
);
