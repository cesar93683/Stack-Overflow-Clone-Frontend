import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import IComment from '../utils/interfaces/IComment';
import IQuestion from '../utils/interfaces/IQuestion';
import IGenericResponse from '../utils/interfaces/service/IGenericResponse';

const API_URL = 'http://localhost:8080/api/questions/';

class PostsService {
  async getQuestions(page: number, sortedByVotes: boolean, token: string) {
    const response = await axios.get<IQuestion[]>(
      API_URL + 'all?page=' + page + '&sortedByVotes=' + sortedByVotes,
      getAuthHeader(token)
    );
    return response.data;
  }

  async getQuestionsByUserId(
    userId: number,
    page: number,
    sortedByVotes: boolean,
    token: string
  ) {
    const response = await axios.get<IQuestion[]>(
      API_URL +
        'users/' +
        userId +
        '?page=' +
        page +
        '&sortedByVotes=' +
        sortedByVotes,
      getAuthHeader(token)
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

  async updateQuestion(content: string, postId: number, token: string) {
    const response = await axios.put<IGenericResponse>(
      API_URL + postId,
      {
        content,
      },
      getAuthHeader(token)
    );
    return response.data;
  }

  async deleteQuestion(postId: number, token: string) {
    const response = await axios.delete<IGenericResponse>(
      API_URL + postId,
      getAuthHeader(token)
    );
    return response.data;
  }

  async voteQuestion(postId: number, action: string, token: string) {
    const response = await axios.post<IGenericResponse>(
      API_URL + 'vote',
      { postId, action },
      getAuthHeader(token)
    );
    return response.data;
  }

  async createComment(content: string, postId: number, token: string) {
    const response = await axios.post<IComment>(
      API_URL + 'comments',
      {
        content,
        postId,
      },
      getAuthHeader(token)
    );
    return response.data;
  }
}
export default new PostsService();
