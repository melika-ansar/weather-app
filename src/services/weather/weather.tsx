import axios from "axios";
import { API_KEY_W, BASE_URL_W } from "../../constants/utils/utils";


export const weatherApi = {
  getWeatherByCity: async (city: string) => {
    const url = `${BASE_URL_W}/weather?q=${city}&appid=${API_KEY_W}&units=metric`;
    console.log('Request URL:', url);

    const response = await axios.get(url);
    return response.data;
  },
};
