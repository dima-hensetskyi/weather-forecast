import React from "react";
import { Toast } from "react-bootstrap";
import { getCorrectDescription } from "../../utils/getCorrectDescription";

export const Alert = React.memo(
  ({ alertData, closeAlert }) => {
    const { show, message } = alertData;
    return (
      <Toast
        show={show}
        position="top-end"
        className="message"
        bg={"danger"}
        onClose={closeAlert}
      >
        <Toast.Header className="d-flex justify-content-between">
          {message && <h5 className="m-0">{getCorrectDescription(message)}</h5>}
        </Toast.Header>
      </Toast>
    );
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.alertData) === JSON.stringify(nextProps.alertData)
);
