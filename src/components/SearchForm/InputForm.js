import { useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";

export const InputForm = ({ fetchWeather, isLoading, saveCity }) => {
  const [cityName, setCityName] = useState("");

  const onButtonClick = async () => {
    if (!isLoading) {
      const resp = await fetchWeather(cityName);
      if (resp) {
        saveCity(cityName);
      }
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
        onChange={(e) => setCityName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !isLoading) {
            onButtonClick(cityName);
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
