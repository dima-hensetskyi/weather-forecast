import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { InputForm } from "./InputForm";

const defaultCities = [
  "Kyiv",
  "Lviv",
  "Dnipro",
  "London",
  "Los Angeles",
  "New York",
];

export const SearchForm = ({ fetchWeather, isLoading }) => {
  const [popularCities, setPopularCities] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("popularCities")) || defaultCities;
    setPopularCities(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("popularCities", JSON.stringify(popularCities));
  }, [popularCities]);

  const saveCity = (cityName) => {
    const includedCity = popularCities.some((city) => city === cityName);

    if (!includedCity) {
      const cityList = popularCities.slice(1);
      cityList.push(cityName);
      setPopularCities(cityList);
    }
  };

  const onCityButtonClick = (e) => {
    if (e.target.tagName === "BUTTON") {
      fetchWeather(e.target.innerText);
    }
  };

  return (
    <>
      <InputForm
        fetchWeather={fetchWeather}
        isLoading={isLoading}
        saveCity={saveCity}
      />
      <Col
        className="my-4 p-0 w-50 width-100 d-flex justify-content-between flex-wrap"
        onClick={onCityButtonClick}
      >
        {popularCities.map((city, i) => (
          <Button variant="outline-success" className="m-1" key={i}>
            {city}
          </Button>
        ))}
      </Col>
    </>
  );
};
