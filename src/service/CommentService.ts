import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import IGenericResponse from '../utils/interfaces/service/IGenericResponse';

const API_URL = 'http://localhost:8080/api/comments/';

class CommentService {
  async deleteComment(id: number, token: string) {
    const response = await axios.delete<IGenericResponse>(
      API_URL + '/' + id,
      getAuthHeader(token)
    );
    return response.data;
  }

  async voteComment(id: number, action: string, token: string) {
    const response = await axios.post<IGenericResponse>(
      API_URL + '/vote',
      { id, action },
      getAuthHeader(token)
    );
    return response.data;
  }
}
export default new CommentService();
