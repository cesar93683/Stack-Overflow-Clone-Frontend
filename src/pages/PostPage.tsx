import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PostCard from '../components/PostCard';
import PostResponseForm from '../components/PostResponseForm';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
import IPost from '../utils/interfaces/IPost';

export default function PostPage() {
  const { token } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<IPost | undefined>(undefined);
  const [postResponses, setPostResponses] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    PostsService.getPost(Number(id), token).then(
      (data) => {
        setPost(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
    PostsService.getPostsResponses(Number(id), 0, false, token).then(
      (data) => {
        setPostResponses(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  const onAddPostResponseSuccess = (postResponse: IPost) => {
    if (postResponses) {
      setPostResponses([...postResponses, postResponse]);
    } else {
      setPostResponses([postResponse]);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!post) {
    return <div>An error has occured</div>;
  }

  return (
    <div>
      <PostCard post={post} />
      {postResponses.length ? (
        <h1 className="display-6">
          {postResponses.length +
            ' Answer' +
            (postResponses.length === 1 ? '' : 's')}
        </h1>
      ) : null}
      {postResponses.map((postResponse, i) => (
        <PostCard className="mt-1" key={i} post={postResponse} />
      ))}
      <PostResponseForm
        className="mt-1"
        postId={Number(id)}
        onAddPostResponseSuccess={onAddPostResponseSuccess}
      />
    </div>
  );
}
