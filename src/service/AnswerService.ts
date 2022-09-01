import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import IComment from '../utils/interfaces/IComment';
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

  async getPost(id: number, token: string) {
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

  async createPost(title: string, content: string, token: string) {
    const response = await axios.post<IPost>(
      API_URL,
      {
        title,
        content,
      },
      getAuthHeader(token)
    );
    return response.data;
  }

  async createPostResponse(
    content: string,
    postResponseId: number,
    token: string
  ) {
    const response = await axios.post<IPost>(
      API_URL,
      {
        content,
        postResponseId,
      },
      getAuthHeader(token)
    );
    return response.data;
  }

  async updatePost(content: string, postId: number, token: string) {
    const response = await axios.put<IGenericResponse>(
      API_URL + postId,
      {
        content,
      },
      getAuthHeader(token)
    );
    return response.data;
  }

  async deletePost(postId: number, token: string) {
    const response = await axios.delete<IGenericResponse>(
      API_URL + postId,
      getAuthHeader(token)
    );
    return response.data;
  }

  async votePost(postId: number, action: string, token: string) {
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
