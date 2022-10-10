import axios from 'axios';
import IGenericResponse from '../utils/interfaces/service/IGenericResponse';
import ILoginResponse from '../utils/interfaces/service/ILoginResponse';
import { API_HOST_URL } from './Constants';

const API_URL = API_HOST_URL + 'api/auth/';

class AuthService {
  async login(username: string, password: string) {
    const response = await axios.post<ILoginResponse>(API_URL + 'login', {
      username,
      password,
    });
    return response.data;
  }
  async signup(email: string, username: string, password: string) {
    const response = await axios.post<IGenericResponse>(API_URL + 'signup', {
      email,
      username,
      password,
    });
    return response.data;
  }
}
export default new AuthService();
