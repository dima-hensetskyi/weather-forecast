import { Card, Col, Row } from "react-bootstrap";

import { getCorrectDate } from "../utils/getCorrectDate";
import { getCorrectDescription } from "../utils/getCorrectDescription";

export const CurrentWeatherCard = ({ currentWeather }) => {
  const mainWeatherInformation = currentWeather?.weather[0];

  return (
    <Card className="shadow-sm">
      <Card.Header as="h5" className="d-flex justify-content-between">
        <span>
          {currentWeather.name}, {currentWeather.sys.country}
        </span>
        <span>{getCorrectDate(currentWeather.dt * 1000, "time")}</span>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col className="d-flex justify-content-center align-items-center flex-column">
            <img
              src={`http://openweathermap.org/img/wn/${mainWeatherInformation.icon}@2x.png`}
              alt="Weather icon"
            />
            <h2>{(currentWeather.main?.temp).toFixed(0)}°C</h2>
            <h5>{mainWeatherInformation.main}</h5>
            <h5>{getCorrectDescription(mainWeatherInformation.description)}</h5>
            <p>Feels like: {currentWeather.main?.feels_like}°C</p>
            <p className="d-flex">
              <span className="mx-2">
                <i className="fas fa-wind mr-3"></i>
                {` ${currentWeather.wind.speed} m/s`}
              </span>
              <span className="mx-2">
                <i className="fas fa-tint"></i>
                {` ${currentWeather.main.humidity}%`}
              </span>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-between flex-wrap">
            <p>
              Pressure:
              {` ${currentWeather.main.pressure} hPa`}
            </p>
            <p>
              Visibility:
              {` ${(currentWeather.visibility / 1000).toFixed(2)} km`}
            </p>
            <p>
              Dew point:
              {` ${currentWeather.main?.temp_min}°C`}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
