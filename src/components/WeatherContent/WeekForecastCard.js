import React from "react";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

import { getCorrectDate } from "../utils/getCorrectDate";
import { getCorrectDescription } from "../utils/getCorrectDescription";

export const WeekForecastCard = React.memo(
  ({ weekForecast }) => {
    console.log(weekForecast);
    return (
      <>
        <h3 className="mx-3">6-day forecast</h3>
        <ListGroup variant="flush" className="shadow-sm">
          {weekForecast.map((dayForecast) => {
            const weatherInfo = dayForecast.weather[0];
            return (
              <ListGroupItem key={dayForecast.dt}>
                <Row>
                  <Col className="d-flex align-items-center justify-content-center">
                    {getCorrectDate(dayForecast.dt_txt)}
                  </Col>
                  <Col className="d-flex align-items-center justify-content-center">
                    <img
                      src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
                      className="weather-icon"
                      alt="Weather icon"
                    />
                    {`${dayForecast.main.temp_min.toFixed(
                      0
                    )}/${dayForecast.main.temp_max.toFixed(0)} °C`}
                  </Col>
                  <Col className="d-flex align-items-center justify-content-center">
                    {getCorrectDescription(weatherInfo.description)}
                  </Col>
                </Row>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </>
    );
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.alertData) === JSON.stringify(nextProps.alertData)
);
