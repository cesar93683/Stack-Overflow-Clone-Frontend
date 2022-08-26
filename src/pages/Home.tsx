import PostsService from "../service/PostsService";

export default function Home() {
  PostsService.getAllPosts()
    return (
      <div>
        Home Page
      </div>
    );
  }