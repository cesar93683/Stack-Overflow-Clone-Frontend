import axios from 'axios';
import IHeaders from '../utils/interfaces/IHeaders';

const API_URL = 'http://localhost:8080/api/posts/';
class PostsService {
  async getAllPosts(headers: IHeaders) {
    const response = await axios.get(API_URL + 'all', headers);
    return response.data;
  }
  async getPost(id: string, headers: IHeaders) {
    const response = await axios.get(API_URL + id, headers);
    return response.data;
  }
  async votePost(postId: string, action: string, headers: IHeaders) {
    const response = await axios.post(
      API_URL + 'vote',
      { action, postId },
      headers
    );
    return response.data;
  }
}
export default new PostsService();
