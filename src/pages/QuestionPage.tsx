import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnswerForm from '../components/AnswerForm';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionCard from '../components/QuestionCard';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import IQuestion from '../utils/interfaces/IQuestion';

export default function PostPage() {
  const { userId, token } = useContext(AuthContext);
  const { id: postId } = useParams<{ id: string }>();

  const [post, setPost] = useState<IQuestion | undefined>(undefined);
  const [postResponses, setPostResponses] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostResponseForm, setShowPostResponseForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }
    QuestionService.getQuestion(Number(postId), token).then(
      (data) => {
        setPost(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
    QuestionService.getPostsResponses(Number(postId), 0, false, token).then(
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

  const onAddPostResponseSuccess = (postResponse: IQuestion) => {
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
      <QuestionCard question={post} onDeleteSuccess={onDeletePostSuccess} />
      {postResponses.length ? (
        <h3 className="fw-normal">
          {postResponses.length +
            ' Answer' +
            (postResponses.length === 1 ? '' : 's')}
        </h3>
      ) : null}
      {postResponses.map((postResponse, i) => (
        <QuestionCard
          onDeleteSuccess={() => onDeletePostResponseSuccess(i)}
          className="mt-1"
          key={i}
          question={postResponse}
        />
      ))}
      {showPostResponseForm ? (
        <AnswerForm
          className="mt-1"
          questionId={Number(postId)}
          onAddAnswerSuccess={onAddPostResponseSuccess}
        />
      ) : null}
    </div>
  );
}
