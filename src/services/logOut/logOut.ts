import axios from "axios";
import { API_KEY, BASE_URL } from "../../constants/utils/utils";

export const logOut = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/logout`,
      {
        headers: {
          api_key: API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
