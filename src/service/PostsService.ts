import axios from 'axios';
const API_URL = 'http://localhost:8080/api/posts/';
class PostsService {
  getAllPosts() {
    return axios.get(API_URL + 'all').then((response) => {
      return response.data;
    });
  }
}
export default new PostsService();
