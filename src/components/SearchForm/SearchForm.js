import { useEffect, useState } from "react";
import { Badge, Col, Row } from "react-bootstrap";
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
    const arr = markedСities.filter((city) => popularCities.indexOf(city));
    arr.sort((a, b) => b.main.temp - a.main.temp);
    setHottestCity(arr[0]);
  }, [markedСities, popularCities]);

  const saveCity = (cityName) => {
    const includedCity = popularCities.some((city) => city === cityName);

    if (!includedCity) {
      const cityList = popularCities.slice(1);
      cityList.push(cityName);
      setPopularCities(cityList);
    }
  };

  const onCityButtonClick = async (e) => {
    if (e.target.tagName === "SPAN") {
      const currentCity = e.target.innerText;
      const weather = await fetchWeather(currentCity);
      const contained = markedСities.some((city) => currentCity === city.name);
      if (!contained) {
        setMarkedСities([...markedСities, weather.data]);
      }
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const cities = reorder(popularCities, source.index, destination.index);
    setPopularCities(cities);
  };

  return (
    <>
      <InputForm
        fetchWeather={fetchWeather}
        isLoading={isLoading}
        saveCity={saveCity}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="cities" direction="horizontal">
          {(provided) => (
            <Row
              className="my-4 p-0 w-50 width-100 d-flex justify-content-between flex-wrap cities"
              onClick={onCityButtonClick}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {popularCities.map((city, i) => (
                <Draggable key={city} draggableId={city} index={i}>
                  {(provided) => (
                    <Col className="text-center col-6 col-md-4">
                      <Badge
                        bg={`${city === hottestCity?.name ? "danger" : "info"}`}
                        className={`m-1 badge p-3 ${
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
                      </Badge>
                    </Col>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Row>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
