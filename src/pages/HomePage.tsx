import { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import PostCardSmall from '../components/PostCardSmall';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
import getAuthHeader from '../utils/getAuthHeader';
import IPost from '../utils/interfaces/IPost';

export default function HomePage() {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortedByVotes, setSortedByVotes] = useState(false);

  useEffect(() => {
    PostsService.getPosts(0, sortedByVotes, getAuthHeader(token)).then(
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
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" className="">
          {sortedByVotes ? 'Score' : 'Newest'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSortedByVotes(false)}>
            Newest
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortedByVotes(true)}>
            Score
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div>
        {posts.map((post, i) => (
          <PostCardSmall post={post} key={i} className="my-2" />
        ))}
      </div>
    </div>
  );
}
