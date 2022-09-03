import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnswerForm from '../components/AnswerForm';
import CustomCard from '../components/CustomCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AnswerService from '../service/AnswerService';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import IAnswer from '../utils/interfaces/IAnswer';
import IComment from '../utils/interfaces/IComment';
import IQuestion from '../utils/interfaces/IQuestion';

export default function QuestionPage() {
  const { userId, token } = useContext(AuthContext);
  const { id: questionId } = useParams<{ id: string }>();

  const [question, setQuestion] = useState<IQuestion>({
    id: 0,
    title: '',
    content: '',
    votes: 0,
    numAnswers: 0,
    comments: [],
    user: {
      id: 0,
      username: '',
    },
    currVote: 0,
    createdAt: '',
    updatedAt: '',
  });
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddAnswerForm, setShowAddAnswerForm] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!questionId) {
      setLoading(false);
      return;
    }
    QuestionService.getQuestion(Number(questionId), token).then(
      (data) => {
        setQuestion(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError(true);
      }
    );
    AnswerService.getAnswersByQuestionId(Number(questionId), token).then(
      (data) => {
        setAnswers(data);
        setLoading(false);
        if (token) {
          let hasCreatedAnswer = false;
          for (const answer of data) {
            if (answer.user.id === userId) {
              hasCreatedAnswer = true;
              break;
            }
          }
          setShowAddAnswerForm(!hasCreatedAnswer);
        }
      },
      () => {
        setLoading(false);
        setError(true);
      }
    );
  }, []);

  const onDeleteQuestionSuccess = () => {
    navigate('/');
  };
  const setQuestionCurrVote = (currVote: number) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        currVote,
      };
    });
  };
  const setQuestionVotes = (votes: number) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        votes,
      };
    });
  };
  const setQuestionContent = (content: string) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        content,
      };
    });
  };
  const setQuestionUpdatedAt = (updatedAt: string) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        updatedAt,
      };
    });
  };
  const onAddQuestionCommentSuccess = (comment: IComment) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        comments: [...prevState.comments, comment],
      };
    });
  };

  const onAddAnswerSuccess = (answer: IAnswer) => {
    setShowAddAnswerForm(false);
    if (answers) {
      setAnswers([...answers, answer]);
    } else {
      setAnswers([answer]);
    }
  };
  const onDeleteAnswerSuccess = (index: number) => {
    const newAnswer = [...answers];
    newAnswer.splice(index, 1);
    setAnswers(newAnswer);
  };
  const setAnswerCurrVote = (currVote: number, index: number) => {
    setAnswers((prevState: IAnswer[]) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        currVote,
      };
      return newState;
    });
  };
  const setAnswerVotes = (votes: number, index: number) => {
    setAnswers((prevState: IAnswer[]) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        votes,
      };
      return newState;
    });
  };
  const setAnswerContent = (content: string, index: number) => {
    setAnswers((prevState: IAnswer[]) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        content,
      };
      return newState;
    });
  };
  const setAnswerUpdatedAt = (updatedAt: string, index: number) => {
    setAnswers((prevState: IAnswer[]) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        updatedAt,
      };
      return newState;
    });
  };
  const onAddAnswerCommentSuccess = (comment: IComment, index: number) => {
    setAnswers((prevState: IAnswer[]) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        comments: [...newState[index].comments, comment],
      };
      return newState;
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>An error has occured</div>;
  }

  return (
    <div>
      <CustomCard
        card={{
          questionId: question.id,
          title: question.title,
          content: question.content,
          votes: question.votes,
          comments: question.comments,
          user: question.user,
          currVote: question.currVote,
          createdAt: question.createdAt,
          updatedAt: question.updatedAt,
        }}
        onDeleteSuccess={onDeleteQuestionSuccess}
        setCurrVote={setQuestionCurrVote}
        setVotes={setQuestionVotes}
        setContent={setQuestionContent}
        onAddCommentSuccess={onAddQuestionCommentSuccess}
        setUpdatedAt={setQuestionUpdatedAt}
      />
      {answers.length ? (
        <h3 className="fw-normal">
          {answers.length + ' Answer' + (answers.length === 1 ? '' : 's')}
        </h3>
      ) : null}
      {answers.map((answer, i) => (
        <CustomCard
          onDeleteSuccess={() => onDeleteAnswerSuccess(i)}
          className="mt-1"
          key={i}
          card={{
            answerId: answer.id,
            content: answer.content,
            votes: answer.votes,
            comments: answer.comments,
            user: answer.user,
            currVote: answer.currVote,
            createdAt: answer.createdAt,
            updatedAt: answer.updatedAt,
          }}
          setCurrVote={(currVote: number) => setAnswerCurrVote(currVote, i)}
          setVotes={(votes: number) => setAnswerVotes(votes, i)}
          setContent={(updatedAt: string) => setAnswerContent(updatedAt, i)}
          onAddCommentSuccess={(comment: IComment) =>
            onAddAnswerCommentSuccess(comment, i)
          }
          setUpdatedAt={(updatedAt: string) => setAnswerUpdatedAt(updatedAt, i)}
        />
      ))}
      {showAddAnswerForm ? (
        <AnswerForm
          className="mt-1"
          questionId={Number(questionId)}
          onAddAnswerSuccess={onAddAnswerSuccess}
        />
      ) : null}
    </div>
  );
}
