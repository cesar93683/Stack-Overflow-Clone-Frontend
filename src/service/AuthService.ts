import axios from 'axios';
const API_URL = 'http://localhost:8080/api/auth/';
class AuthService {
  async login(username: string, password: string) {
    const response = await axios.post(API_URL + 'login', {
      username,
      password,
    });
    return response.data;
  }
  async signup(email: string, username: string, password: string) {
    const response = await axios.post(API_URL + 'signup', {
      email,
      username,
      password,
    });
    return response.data;
  }
}
export default new AuthService();
