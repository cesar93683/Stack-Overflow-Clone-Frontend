import axios from 'axios';
import IHeaders from '../utils/interfaces/IHeaders';
import IPost from '../utils/interfaces/IPost';
import IGenericResponse from '../utils/interfaces/service/IGenericResponse';

const API_URL = 'http://localhost:8080/api/posts/';

class PostsService {
  async getPosts(page: number, sortedByVotes: boolean, headers: IHeaders) {
    const response = await axios.get<IPost[]>(
      API_URL + 'all?page=' + page + '&sortedByVotes=' + sortedByVotes,
      headers
    );
    return response.data;
  }

  async getPostsByUserId(
    userId: number,
    page: number,
    sortedByVotes: boolean,
    headers: IHeaders
  ) {
    const response = await axios.get<IPost[]>(
      API_URL +
        'users/' +
        userId +
        '?page=' +
        page +
        '&sortedByVotes=' +
        sortedByVotes,
      headers
    );
    return response.data;
  }

  async getPost(id: string, headers: IHeaders) {
    const response = await axios.get<IPost>(API_URL + id, headers);
    return response.data;
  }

  async getPostsResponses(
    postId: number,
    page: number,
    sortedByVotes: boolean,
    headers: IHeaders
  ) {
    const response = await axios.get<IPost[]>(
      API_URL +
        'responses/' +
        postId +
        '?page=' +
        page +
        '&sortedByVotes=' +
        sortedByVotes,
      headers
    );
    return response.data;
  }

  async votePost(postId: string, action: string, headers: IHeaders) {
    const response = await axios.post<IGenericResponse>(
      API_URL + 'vote',
      { action, postId },
      headers
    );
    return response.data;
  }
}
export default new PostsService();
