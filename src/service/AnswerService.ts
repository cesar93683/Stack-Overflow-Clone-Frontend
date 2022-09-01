import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import IAnswer from '../utils/interfaces/IAnswer';
import IComment from '../utils/interfaces/IComment';
import IGenericResponse from '../utils/interfaces/service/IGenericResponse';

const API_URL = 'http://localhost:8080/api/answers/';

class AnswerService {
  async getAnswersByQuestionId(questionId: number, token: string) {
    const response = await axios.get<IAnswer[]>(
      API_URL + questionId,
      getAuthHeader(token)
    );
    return response.data;
  }

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

  async voteAnswer(id: number, action: string, token: string) {
    const response = await axios.post<IGenericResponse>(
      API_URL + 'vote',
      { id, action },
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
