import axios from 'axios';
const API_URL = 'http://localhost:8080/api/auth/';
class AuthService {
  async login(username: string, password: string) {
    const response = await axios.post(API_URL + 'login', {
      username,
      password,
    });
    if (response.data?.token) {
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }
    return response.data;
  }
  logout() {
    localStorage.removeItem('token');
  }
  async signup(email: string, username: string, password: string) {
    const response = await axios.post(API_URL + 'signup', {
      email,
      username,
      password,
    });
    return response.data;
  }
  getCurrentToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }
  getAuthHeader() {
    const token = this.getCurrentToken();
    console.log(token);
    if (token === null) {
      // TODO
      return {};
    }
    return { Cookie: 'token=' + token };
  }
}
export default new AuthService();
