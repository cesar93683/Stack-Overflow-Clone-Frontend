import axios from 'axios';
import IUser from '../utils/interfaces/IUser';
import { API_HOST_URL } from './Constants';

const API_URL = API_HOST_URL + 'api/users/';

class UserService {
  async getUserById(userId: number) {
    const response = await axios.get<IUser>(API_URL + userId);
    return response.data;
  }
}
export default new UserService();
