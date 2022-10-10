import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import IAnswer from '../utils/interfaces/IAnswer';
import IComment from '../utils/interfaces/IComment';
import IGenericResponse from '../utils/interfaces/service/IGenericResponse';
import { API_HOST_URL } from './Constants';

const API_URL = API_HOST_URL + 'api/answers/';

class AnswerService {
  async createAnswer(content: string, questionId: number, token: string) {
    const response = await axios.post<IAnswer>(
      API_URL,
      {
        questionId,
        content,
      },
      getAuthHeader(token)
    );
    return response.data;
  }

  async getAnswer(id: number) {
    const response = await axios.get<IAnswer>(API_URL + id);
    return response.data;
  }

  async updateAnswer(content: string, id: number, token: string) {
    const response = await axios.put<IGenericResponse>(
      API_URL + id,
      {
        content,
      },
      getAuthHeader(token)
    );
    return response.data;
  }

  async deleteAnswer(id: number, token: string) {
    const response = await axios.delete<IGenericResponse>(
      API_URL + id,
      getAuthHeader(token)
    );
    return response.data;
  }

  async acceptAnswer(id: number, token: string) {
    const response = await axios.post<IGenericResponse>(
      API_URL + 'accept/' + id,
      {},
      getAuthHeader(token)
    );
    return response.data;
  }

  async voteAnswer(id: number, vote: number, token: string) {
    const response = await axios.post<IGenericResponse>(
      API_URL + 'vote',
      { id, vote },
      getAuthHeader(token)
    );
    return response.data;
  }

  async createComment(content: string, id: number, token: string) {
    const response = await axios.post<IComment>(
      API_URL + 'comments',
      {
        content,
        id,
      },
      getAuthHeader(token)
    );
    return response.data;
  }
}
export default new AnswerService();
