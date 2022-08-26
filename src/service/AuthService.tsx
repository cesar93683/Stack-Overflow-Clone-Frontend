import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";
class AuthService {
  login(username: String, password: String) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("token");
  }
  register(email: String, username: String, password: String) {
    return axios.post(API_URL + "signup", {
      email,
      username,
      password
    });
  }
  getCurrentToken() {
    let token = localStorage.getItem('token');
    if (token) {
        return JSON.parse(token);
    }
    return null;
  }
}
export default new AuthService();