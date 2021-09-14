import { Container } from "react-bootstrap";
import "./preloader.scss";

export const Preloader = () => (
  <Container className="d-flex justify-content-center align-items-center w-100 h-100">
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </Container>
);
