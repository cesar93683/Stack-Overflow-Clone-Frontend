import axios from 'axios';
import IUser from '../utils/interfaces/IUser';

const API_URL = 'http://localhost:8080/api/users/';

class UserService {
  async getUserById(userId: number) {
    const response = await axios.get<IUser>(API_URL + userId);
    return response.data;
  }
}
export default new UserService();
