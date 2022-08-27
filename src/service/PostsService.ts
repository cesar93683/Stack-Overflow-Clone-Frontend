import axios from 'axios';
import AuthService from './AuthService';
const API_URL = 'http://localhost:8080/api/posts/';
class PostsService {
  async getAllPosts() {
    const response = await axios.get(API_URL + 'all');
    return response.data;
  }
  async getPost(id: string) {
    const response = await axios.get(API_URL + id);
    return response.data;
  }
  async votePost(postId: string, action: string) {
    const response = await axios.post(
      API_URL + 'vote',
      { action, postId },
      {
        headers: { Authorization: 'Bearer ' + AuthService.getCurrentToken() },
      }
    );
    return response.data;
  }
}
export default new PostsService();
