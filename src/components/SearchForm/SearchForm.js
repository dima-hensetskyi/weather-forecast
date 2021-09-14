import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { InputForm } from "./InputForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  const [markedСities, setMarkedСities] = useState([]);
  const [hottestCity, setHottestCity] = useState("");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("popularCities")) || defaultCities;
    setPopularCities(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("popularCities", JSON.stringify(popularCities));
  }, [popularCities]);

  useEffect(() => {
    setHottestCity(getHottestCity());
  }, [markedСities]);

  const getHottestCity = () => {
    const arr = [...markedСities];
    arr.sort((a, b) => b.main.temp - a.main.temp);
    return arr[0];
  };

  const saveCity = (cityName) => {
    const includedCity = popularCities.some((city) => city === cityName);

    if (!includedCity) {
      const cityList = popularCities.slice(1);
      cityList.push(cityName);
      setPopularCities(cityList);
    }
  };

  const onCityButtonClick = async (e) => {
    if (e.target.tagName === "BUTTON") {
      const currentCity = e.target.innerText;
      const weather = await fetchWeather(currentCity);
      const contained = markedСities.some((city) => currentCity === city.name);
      if (!contained) {
        setMarkedСities([...markedСities, weather.data]);
      }
    }
  };

  return (
    <>
      <InputForm
        fetchWeather={fetchWeather}
        isLoading={isLoading}
        saveCity={saveCity}
      />
      <DragDropContext>
        <Droppable droppableId="cities">
          {(provided) => (
            <Col
              className="my-4 p-0 w-50 width-100 d-flex justify-content-between flex-wrap cities"
              onClick={onCityButtonClick}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {popularCities.map((city, i) => (
                <Draggable key={city} draggableId={city} index={i}>
                  {(provided) => (
                    <Button
                      variant={`${
                        city === hottestCity?.name
                          ? "outline-danger"
                          : "outline-success"
                      }`}
                      className={`m-1 ${
                        city === hottestCity?.name ? "hottest" : ""
                      }`}
                      key={i}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {city}{" "}
                      {city === hottestCity?.name && (
                        <i className="fas fa-temperature-high"></i>
                      )}
                    </Button>
                  )}
                </Draggable>
              ))}
            </Col>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
