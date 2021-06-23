import React from "react";
import "./ModalComp.css";
import { Modal } from "react-bootstrap";

export const ModalComp = ({ show, onHide, title, body, children, ...rest }) => (
  <Modal show={show} onHide={onHide} {...rest}>
    <Modal.Header className="px-5 py-3" closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="px-5 pt-4 pb-5">
      {body}
      {children}
    </Modal.Body>
  </Modal>
);
