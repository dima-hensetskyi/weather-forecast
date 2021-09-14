import { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { getCorrectDescription } from "../../utils/getCorrectDescription";

export const Alert = ({ message }) => {
  const [showAlertm, setShowAlert] = useState(false);
  useEffect(() => {
    if (message) {
      setShowAlert(true);
    }
  }, [message]);

  return (
    <Toast
      show={showAlertm}
      position="top-end"
      className="message"
      bg={"danger"}
      onClose={() => setShowAlert(false)}
    >
      <Toast.Header className="d-flex justify-content-between">
        {message && <h5 className="m-0">{getCorrectDescription(message)}</h5>}
      </Toast.Header>
    </Toast>
  );
};
