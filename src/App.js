import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { useHttp } from "./components/hooks/useHttp";

import { SearchForm } from "./components/SearchForm/SearchForm";
import { Preloader } from "./components/common/preloader/Preloader";
import { WeekForecastCard } from "./components/WeatherContent/WeekForecastCard";
import { CurrentWeatherCard } from "./components/WeatherContent/CurrentWeatherCard";
import { Alert } from "./components/common/alert/Alert";

import "./app.scss";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weekForecast, setWeekForecast] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const { loading, request, error, clearError } = useHttp();

  const fetchCurrentWeather = async (cityName) => {
    try {
      const currentWeatherData = await request(`weather?q=${cityName}`, "GET");
      setCurrentWeather(currentWeatherData.data);
      return currentWeatherData;
    } catch (e) {}
  };

  useEffect(() => {
    if (error) {
      setShowAlert(error.response.data.message);
    }
    clearError();
  }, [error, clearError]);

  const fetchWeekForecast = async (cityName) => {
    try {
      const weekForecastData = await request(`forecast?q=${cityName}`, "GET");
      const correctList = [];
      weekForecastData.data.list.reduce((obj, forecast) => {
        const date = new Date(forecast.dt * 1000).getDate();
        if (!obj[date]) {
          obj[date] = date;
          correctList.push(forecast);
        }
        return obj;
      }, {});
      await setWeekForecast(correctList);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const fetchWeather = async (cityName) => {
    const resp = await fetchCurrentWeather(cityName);
    await fetchWeekForecast(cityName);
    return resp;
  };

  const closeAlert = () => setShowAlert(false);

  return (
    <Container fluid className="bg-light full-height">
      <Container className="pt-1 pt-lg-5">
        <SearchForm isLoading={loading} fetchWeather={fetchWeather} />
        <Row>
          {loading ? (
            <Preloader />
          ) : (
            <>
              <Col>
                {currentWeather && (
                  <CurrentWeatherCard currentWeather={currentWeather} />
                )}
              </Col>
              <Col className="col-12 col-lg-7">
                {weekForecast && (
                  <WeekForecastCard weekForecast={weekForecast} />
                )}
              </Col>
            </>
          )}
        </Row>
      </Container>
      <Alert message={showAlert} closeAlert={closeAlert} />
    </Container>
  );
};

export default App;
