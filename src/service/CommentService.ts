import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import IGenericResponse from '../utils/interfaces/service/IGenericResponse';
import { API_HOST_URL } from './Constants';

const API_URL = API_HOST_URL + 'api/comments/';

class CommentService {
  async deleteComment(id: number, token: string) {
    const response = await axios.delete<IGenericResponse>(
      API_URL + id,
      getAuthHeader(token)
    );
    return response.data;
  }

  async voteComment(id: number, vote: number, token: string) {
    const response = await axios.post<IGenericResponse>(
      API_URL + 'vote',
      { id, vote },
      getAuthHeader(token)
    );
    return response.data;
  }
}
export default new CommentService();
