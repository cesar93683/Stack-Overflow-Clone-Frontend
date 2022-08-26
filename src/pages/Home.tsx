import { useEffect, useState } from "react";
import PostsService from "../service/PostsService";
import IPost from "../interfaces/IPost";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    PostsService.getAllPosts().then(
      data => {
        setPosts(data)
      }, error => {
        // TODO
      })
  }, []);

  return (
    <div>
      {posts.map((post, i) => 
      <div>
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