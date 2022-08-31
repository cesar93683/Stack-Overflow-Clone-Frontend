import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PostCard from '../components/PostCard';
import PostResponseForm from '../components/PostResponseForm';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
import IPost from '../utils/interfaces/IPost';

export default function PostPage() {
  const { userId, token } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<IPost | undefined>(undefined);
  const [postResponses, setPostResponses] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostResponseForm, setShowPostResponseForm] = useState(false);

  const navigate = useNavigate();

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
        if (token) {
          let hasCreatedPostResponse = false;
          for (const postResponse of data) {
            if (postResponse.user.id === userId) {
              hasCreatedPostResponse = true;
              break;
            }
          }
          setShowPostResponseForm(!hasCreatedPostResponse);
        }
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  const onDeletePostSuccess = () => {
    navigate('/');
  };

  const onDeletePostResponseSuccess = (index: number) => {
    const newPostResponses = [...postResponses];
    newPostResponses.splice(index, 1);
    setPostResponses(newPostResponses);
  };

  const onAddPostResponseSuccess = (postResponse: IPost) => {
    setShowPostResponseForm(false);
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
      <PostCard post={post} onDeleteSuccess={onDeletePostSuccess} />
      {postResponses.length ? (
        <h3 className="fw-normal">
          {postResponses.length +
            ' Answer' +
            (postResponses.length === 1 ? '' : 's')}
        </h3>
      ) : null}
      {postResponses.map((postResponse, i) => (
        <PostCard
          onDeleteSuccess={() => onDeletePostResponseSuccess(i)}
          className="mt-1"
          key={i}
          post={postResponse}
        />
      ))}
      {showPostResponseForm ? (
        <PostResponseForm
          className="mt-1"
          postId={Number(id)}
          onAddPostResponseSuccess={onAddPostResponseSuccess}
        />
      ) : null}
    </div>
  );
}
