import { useContext, useMemo, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PostCardUser from '../components/PostCardUser';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
import IPost from '../utils/interfaces/IPost';

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [sortedByVotes, setSortedByVotes] = useState(false);

  useMemo(() => {
    PostsService.getPostsByUserId(Number(id), 0, sortedByVotes, token).then(
      (data) => {
        setPosts(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError(true);
      }
    );
  }, [sortedByVotes]);

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
      <Tabs>
        <Tab eventKey="posts" title="Posts">
          {posts.length === 0 ? (
            <h1>No Posts</h1>
          ) : (
            <>
              {posts.map((post, i) => (
                <PostCardUser post={post} key={i} className="my-2" />
              ))}
            </>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
