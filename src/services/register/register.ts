import axios from 'axios';
import { API_KEY, BASE_URL } from '../../constants/utils/utils';

interface Iregister {
    email: string,
    password : string
}

export const registers = async ({ email, password }:Iregister) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/register`,
      { email, password },
      {
        headers: {
          api_key: API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    localStorage.setItem('token', response.data.accessToken);
    return response;
  } catch (error) {
    console.log(error);
  }
};
