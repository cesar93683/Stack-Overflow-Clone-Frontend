import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import IGenericResponse from '../utils/interfaces/service/IGenericResponse';

const API_URL = 'http://localhost:8080/api/posts/';

class CommentService {
  async deleteComment(commentId: number, token: string) {
    const response = await axios.delete<IGenericResponse>(
      API_URL + 'comments/' + commentId,
      getAuthHeader(token)
    );
    return response.data;
  }

  async voteComment(id: number, action: string, token: string) {
    const response = await axios.post<IGenericResponse>(
      API_URL + 'comments/vote',
      { id, action },
      getAuthHeader(token)
    );
    return response.data;
  }
}
export default new CommentService();
