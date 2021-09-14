import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { useHttp } from "./components/hooks/useHttp";

import { SearchForm } from "./components/SearchForm/SearchForm";
import { Preloader } from "./components/common/preloader/Preloader";
import { WeekForecastCard } from "./components/WeatherContent/WeekForecastCard";
import { CurrentWeatherCard } from "./components/WeatherContent/CurrentWeatherCard";

import "./app.scss";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weekForecast, setWeekForecast] = useState(null);

  const { loading, request, error, clearError } = useHttp();

  const fetchCurrentWeather = async (cityName) => {
    try {
      const currentWeatherData = await request(`weather?q=${cityName}`, "GET");
      setCurrentWeather(currentWeatherData.data);
    } catch (e) {}
  };

  useEffect(() => {
    if (error) {
      console.log(error);
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
          obj[date] = date; /*  виправити */
          correctList.push(forecast);
        }
        return obj;
      }, {});
      await setWeekForecast(correctList);
    } catch (e) {}
  };

  const fetchWeather = async (cityName) => {
    await fetchCurrentWeather(cityName);
    await fetchWeekForecast(cityName);
  };

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
    </Container>
  );
};

export default App;
