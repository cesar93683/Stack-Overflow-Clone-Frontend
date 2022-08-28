import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PostCard from '../components/PostCard';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
import IPost from '../utils/interfaces/IPost';

export default function PostPage() {
  const { token } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<IPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const onDelete = () => {
    PostsService.deletePost(Number(id), token).then(
      (data) => {
        if (data?.code === 0) {
          navigate('/');
        } else {
          // TODO
          console.log('error');
        }
      },
      () => {
        // TODO
        console.log('error');
      }
    );
  };

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    PostsService.getPost(id, token).then(
      (data) => {
        setPost(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!post) {
    return <div>An error has occured</div>;
  }

  return <div>{<PostCard post={post as IPost} onDelete={onDelete} />}</div>;
}
