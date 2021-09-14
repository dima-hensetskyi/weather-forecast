import axios from "axios";

const apiKey = "7348e4f6ac1a71a3c54af1c6fc194623";
const units = "metric";

const instance = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/`,
  headers: {},
});

const API = {
  async getCurrentWeather(cityName) {
    try {
      return await instance.get(
        `weather?appid=${apiKey}&q=${cityName}&units=${units}`
      );
    } catch (error) {
      console.log(error);
    }
  },
  async getWeekForecast(cityName) {
    try {
      return await instance.get(
        `forecast?q=${cityName}&appid=${apiKey}&units=${units}`
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default API;
