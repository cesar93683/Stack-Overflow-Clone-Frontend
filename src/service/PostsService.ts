import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import IPost from '../utils/interfaces/IPost';
import IGenericResponse from '../utils/interfaces/service/IGenericResponse';

const API_URL = 'http://localhost:8080/api/posts/';

class PostsService {
  async getPosts(page: number, sortedByVotes: boolean, token: string) {
    const response = await axios.get<IPost[]>(
      API_URL + 'all?page=' + page + '&sortedByVotes=' + sortedByVotes,
      getAuthHeader(token)
    );
    return response.data;
  }

  async getPostsByUserId(
    userId: number,
    page: number,
    sortedByVotes: boolean,
    token: string
  ) {
    const response = await axios.get<IPost[]>(
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

  async getPost(id: string, token: string) {
    const response = await axios.get<IPost>(API_URL + id, getAuthHeader(token));
    return response.data;
  }

  async getPostsResponses(
    postId: number,
    page: number,
    sortedByVotes: boolean,
    token: string
  ) {
    const response = await axios.get<IPost[]>(
      API_URL +
        'responses/' +
        postId +
        '?page=' +
        page +
        '&sortedByVotes=' +
        sortedByVotes,
      getAuthHeader(token)
    );
    return response.data;
  }

  async votePost(postId: string, action: string, token: string) {
    const response = await axios.post<IGenericResponse>(
      API_URL + 'vote',
      { action, postId },
      getAuthHeader(token)
    );
    return response.data;
  }
}
export default new PostsService();
