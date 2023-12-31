import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";

export default function CheckoutSteps(props) {
  return (
    <Container>
      <Row className="checkout-steps">
        <Col className={props.step1 ? "active" : ""}>Sign-In</Col>
        <Col className={props.step2 ? "active" : ""}>Shipping</Col>
        <Col className={props.step3 ? "active" : ""}>Place Orders</Col>
      </Row>
    </Container>
  );
}
