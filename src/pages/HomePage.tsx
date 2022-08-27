import { useEffect, useState } from 'react';
import PostsService from '../service/PostsService';
import IPost from '../utils/interfaces/IPost';
import LoadingSpinner from '../components/LoadingSpinner';
import PostCard from '../components/PostCard';

export default function HomePage() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    PostsService.getAllPosts().then(
      (data) => {
        setPosts(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError(true);
      }
    );
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>An error has occured</div>;
  }

  if (posts.length === 0) {
    return <div>There are no posts</div>;
  }

  return (
    <div>
      {posts.map((post, i) => (
        <PostCard post={post} key={i} />
      ))}
    </div>
  );
}
