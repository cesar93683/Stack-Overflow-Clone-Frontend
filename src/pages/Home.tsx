import { useEffect, useState } from "react";
import PostsService from "../service/PostsService";
import IPost from "../interfaces/IPost";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    PostsService.getAllPosts().then(
      data => {
        setPosts(data)
        setLoading(false)
      }, error => {
        setLoading(false)
        setError(true)
      })
  }, []);

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div>An error has occured</div>
  }

  if (posts.length === 0) {
    return <div>There are no posts</div>
  }

  return (
    <div>
      {posts.map((post, i) => 
      <div key={i}>
      <div>{post.id}</div>
        <div>{post.title}</div>
        <div>{post.content}</div>
        <div>{post.votes}</div>
        <div>{post.user.id}</div>
        <div>{post.user.username}</div>
        <div>{post.createdAt}</div>
        <div>{post.updatedAt}</div>
      </div>)}
    </div>
  );
}