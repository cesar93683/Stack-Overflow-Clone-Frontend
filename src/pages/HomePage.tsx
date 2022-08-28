import { useContext, useEffect, useState } from 'react';
import PostsService from '../service/PostsService';
import IPost from '../utils/interfaces/IPost';
import LoadingSpinner from '../components/LoadingSpinner';
import PostCard from '../components/PostCard';
import { AuthContext } from '../utils/auth-context';
import getAuthHeader from '../utils/getAuthHeader';

export default function HomePage() {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    PostsService.getAllPosts(getAuthHeader(token)).then(
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
        <PostCard post={post} key={i} className="my-2" linkable />
      ))}
    </div>
  );
}
