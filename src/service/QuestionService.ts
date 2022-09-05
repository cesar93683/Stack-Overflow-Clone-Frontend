import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import IComment from '../utils/interfaces/IComment';
import IQuestion from '../utils/interfaces/IQuestion';
import IQuestions from '../utils/interfaces/IQuestions';
import IGenericResponse from '../utils/interfaces/service/IGenericResponse';

const API_URL = 'http://localhost:8080/api/questions/';

class QuestionService {
  async getQuestions(page: number, sortedByVotes: boolean) {
    const response = await axios.get<IQuestions>(
      API_URL + '?page=' + page + '&sortedByVotes=' + sortedByVotes
    );
    return response.data;
  }

  async getQuestionsByUserId(
    userId: number,
    page: number,
    sortedByVotes: boolean
  ) {
    const response = await axios.get<IQuestion[]>(
      API_URL +
        'users/' +
        userId +
        '?page=' +
        page +
        '&sortedByVotes=' +
        sortedByVotes
    );
    return response.data;
  }

  async getQuestionsAnsweredByUserId(
    userId: number,
    page: number,
    sortedByVotes: boolean
  ) {
    const response = await axios.get<IQuestion[]>(
      API_URL +
        'users/answered/' +
        userId +
        '?page=' +
        page +
        '&sortedByVotes=' +
        sortedByVotes
    );
    return response.data;
  }

  async getQuestion(id: number, token: string) {
    const response = await axios.get<IQuestion>(
      API_URL + id,
      getAuthHeader(token)
    );
    return response.data;
  }

  async createQuestion(title: string, content: string, token: string) {
    const response = await axios.post<IQuestion>(
      API_URL,
      {
        title,
        content,
      },
      getAuthHeader(token)
    );
    return response.data;
  }

  async updateQuestion(content: string, id: number, token: string) {
    const response = await axios.put<IGenericResponse>(
      API_URL + id,
      {
        content,
      },
      getAuthHeader(token)
    );
    return response.data;
  }

  async deleteQuestion(id: number, token: string) {
    const response = await axios.delete<IGenericResponse>(
      API_URL + id,
      getAuthHeader(token)
    );
    return response.data;
  }

  async voteQuestion(id: number, vote: number, token: string) {
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
export default new QuestionService();
