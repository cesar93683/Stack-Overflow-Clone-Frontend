import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Post from '../components/Post';
import IPost from '../interfaces/IPost';
import PostsService from '../service/PostsService';

export default function PostPage() {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<IPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    PostsService.getPost(id).then(
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

  return <div>{<Post post={post as IPost} />}</div>;
}
