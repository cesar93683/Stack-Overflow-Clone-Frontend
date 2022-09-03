import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnswerForm from '../components/AnswerForm';
import CustomCard from '../components/CustomCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AnswerService from '../service/AnswerService';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import DateUtils from '../utils/DateUtils';
import IAnswer from '../utils/interfaces/IAnswer';
import IComment from '../utils/interfaces/IComment';
import IQuestion from '../utils/interfaces/IQuestion';
import VoteUtils from '../utils/VoteUtils';

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

  useEffect(() => {
    if (!token) {
      setQuestion((prevState: IQuestion) => {
        return {
          ...prevState,
          currVote: 0,
          comments: prevState.comments.map((comment) => ({
            ...comment,
            currVote: 0,
          })),
        };
      });
      setAnswers((prevState: IAnswer[]) => {
        return prevState.map((answer) => ({
          ...answer,
          currVote: 0,
          comments: answer.comments.map((comment) => ({
            ...comment,
            currVote: 0,
          })),
        }));
      });
    }
  }, [token]);

  const deleteQuestion = () => {
    navigate('/');
  };
  const setQuestionVote = (newVote: number) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        currVote: newVote,
        votes:
          prevState.votes + VoteUtils.getVoteDiff(prevState.currVote, newVote),
      };
    });
  };
  const setQuestionContent = (content: string) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        content,
        updatedAt: DateUtils.getLocaleDateString(new Date()),
      };
    });
  };
  const addQuestionComment = (comment: IComment) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        comments: [...prevState.comments, comment],
      };
    });
  };
  const setCommentQuestionVote = (newVote: number, index: number) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        comments: prevState.comments.map((comment: IComment, i: number) =>
          i === index
            ? {
                ...comment,
                currVote: newVote,
                votes:
                  comment.votes +
                  VoteUtils.getVoteDiff(comment.currVote, newVote),
              }
            : comment
        ),
      };
    });
  };

  const addAnswer = (answer: IAnswer) => {
    setShowAddAnswerForm(false);
    if (answers) {
      setAnswers([...answers, answer]);
    } else {
      setAnswers([answer]);
    }
  };
  const deleteAnswer = (index: number) => {
    setAnswers((prevState: IAnswer[]) => {
      return prevState.filter((_, i) => i !== index);
    });
  };
  const setAnswerVote = (newVote: number, index: number) => {
    setAnswers((prevState: IAnswer[]) => {
      return prevState.map((answer, i) =>
        i === index
          ? {
              ...answer,
              currVote: newVote,
              votes:
                answer.votes + VoteUtils.getVoteDiff(answer.currVote, newVote),
            }
          : answer
      );
    });
  };
  const setAnswerContent = (content: string, index: number) => {
    setAnswers((prevState: IAnswer[]) => {
      return prevState.map((answer, i) =>
        i === index
          ? {
              ...answer,
              content,
              updatedAt: DateUtils.getLocaleDateString(new Date()),
            }
          : answer
      );
    });
  };
  const addAnswerComment = (comment: IComment, index: number) => {
    setAnswers((prevState: IAnswer[]) => {
      return prevState.map((answer, i) =>
        i === index
          ? { ...answer, comments: [...answer.comments, comment] }
          : answer
      );
    });
  };
  const setCommentAnswerVote = (
    newVote: number,
    commentIndex: number,
    answerIndex: number
  ) => {
    setAnswers((prevState: IAnswer[]) => {
      return prevState.map((answer, i) =>
        i === answerIndex
          ? {
              ...answer,
              comments: answer.comments.map((comment: IComment, j: number) =>
                j === commentIndex
                  ? {
                      ...comment,
                      currVote: newVote,
                      votes:
                        comment.votes +
                        VoteUtils.getVoteDiff(comment.currVote, newVote),
                    }
                  : comment
              ),
            }
          : answer
      );
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
        onDelete={deleteQuestion}
        setVote={setQuestionVote}
        setContent={setQuestionContent}
        addComment={addQuestionComment}
        setCommentVote={setCommentQuestionVote}
      />
      {answers.length ? (
        <h3 className="fw-normal">
          {answers.length + ' Answer' + (answers.length === 1 ? '' : 's')}
        </h3>
      ) : null}
      {answers.map((answer, answerIndex) => (
        <CustomCard
          onDelete={() => deleteAnswer(answerIndex)}
          className="mt-1"
          key={answerIndex}
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
          setVote={(newVote: number) => setAnswerVote(newVote, answerIndex)}
          setContent={(updatedAt: string) =>
            setAnswerContent(updatedAt, answerIndex)
          }
          addComment={(comment: IComment) =>
            addAnswerComment(comment, answerIndex)
          }
          setCommentVote={(newVote: number, commentIndex: number) =>
            setCommentAnswerVote(newVote, commentIndex, answerIndex)
          }
        />
      ))}
      {showAddAnswerForm ? (
        <AnswerForm
          className="mt-1"
          questionId={Number(questionId)}
          onAddAnswerSuccess={addAnswer}
        />
      ) : null}
    </div>
  );
}
