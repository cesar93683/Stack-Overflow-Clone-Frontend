import axios from 'axios';
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
}
export default new PostsService();
