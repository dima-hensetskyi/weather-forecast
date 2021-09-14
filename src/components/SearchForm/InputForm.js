import { useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";

export const InputForm = ({ fetchWeather, isLoading, saveCity }) => {
  const [cityName, setSityName] = useState("");

  const onButtonClick = async () => {
    if (!isLoading) {
      await fetchWeather(cityName);
      saveCity(cityName);
    }
  };

  return (
    <InputGroup className="mb-3 w-50 width-100 shadow-sm">
      <InputGroup.Text>
        <i className="fas fa-map-marker-alt"></i>
      </InputGroup.Text>
      <FormControl
        required
        value={cityName}
        onChange={(e) => setSityName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !isLoading) {
            fetchWeather(cityName);
          }
        }}
        placeholder="Search city"
      />
      <Button variant="outline-secondary" onClick={onButtonClick}>
        Search
      </Button>
    </InputGroup>
  );
};
