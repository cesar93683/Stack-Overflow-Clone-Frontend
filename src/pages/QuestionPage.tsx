import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnswerForm from '../components/AnswerForm';
import CustomCard from '../components/CustomCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SortDropdown from '../components/SortDropdown';
import AnswerService from '../service/AnswerService';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import IAnswer from '../utils/interfaces/IAnswer';
import IComment from '../utils/interfaces/IComment';
import IQuestion from '../utils/interfaces/IQuestion';
import ValidateUtils from '../utils/ValidateUtils';
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
    answered: 0,
    answers: [],
    comments: [],
    user: {
      id: 0,
      username: '',
      reputation: 0,
    },
    tags: [],
    currVote: 0,
    createdAt: '',
    updatedAt: '',
  });
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [answerFormContent, setAnswerFormContent] = useState('');
  const [answerAddSubmitLoading, setAnswerAddSubmitLoading] = useState(false);
  const [answerAddError, setAnswerAddError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortedByVotes, setSortedByVotes] = useState(true);
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
        data.answers.sort((a, b) => b.votes - a.votes);
        setAnswers(data.answers);
        if (token) {
          let hasCreatedAnswer = false;
          for (const answer of data.answers) {
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
      setQuestion((prevState: IQuestion) => ({
        ...prevState,
        currVote: 0,
        comments: prevState.comments.map((comment) => ({
          ...comment,
          currVote: 0,
        })),
      }));
      setAnswers((prevState: IAnswer[]) =>
        prevState.map((answer) => ({
          ...answer,
          currVote: 0,
          comments: answer.comments.map((comment) => ({
            ...comment,
            currVote: 0,
          })),
        }))
      );
    }
  }, [token]);

  useEffect(() => {
    setAnswers((prevState) =>
      [...prevState].sort((a, b) =>
        sortedByVotes
          ? b.votes - a.votes
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    );
  }, [sortedByVotes]);

  const deleteQuestion = () => {
    navigate('/');
  };
  const onEditQuestionClick = () => {
    navigate('/questions/edit/' + questionId);
  };
  const setQuestionVote = (newVote: number) => {
    setQuestion((prevState: IQuestion) => ({
      ...prevState,
      currVote: newVote,
      votes:
        prevState.votes + VoteUtils.getVoteDiff(prevState.currVote, newVote),
    }));
  };
  const addQuestionComment = (comment: IComment) => {
    setQuestion((prevState: IQuestion) => ({
      ...prevState,
      comments: [...prevState.comments, comment],
    }));
  };
  const setCommentQuestionVote = (newVote: number, index: number) => {
    setQuestion((prevState: IQuestion) => ({
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
    }));
  };

  const addAnswer = (answer: IAnswer) => {
    setShowAddAnswerForm(false);
    setAnswers((prevState: IAnswer[]) => [...prevState, answer]);
  };
  const deleteAnswer = (index: number) => {
    setAnswers((prevState: IAnswer[]) =>
      prevState.filter((_, i) => i !== index)
    );
  };
  const onEditAnswerClick = (answerId: number) => {
    navigate('/questions/answers/edit/' + answerId);
  };
  const setAnswerVote = (newVote: number, index: number) => {
    setAnswers((prevState: IAnswer[]) =>
      prevState.map((answer, i) =>
        i === index
          ? {
              ...answer,
              currVote: newVote,
              votes:
                answer.votes + VoteUtils.getVoteDiff(answer.currVote, newVote),
            }
          : answer
      )
    );
  };
  const addAnswerComment = (comment: IComment, index: number) => {
    setAnswers((prevState: IAnswer[]) =>
      prevState.map((answer, i) =>
        i === index
          ? { ...answer, comments: [...answer.comments, comment] }
          : answer
      )
    );
  };
  const setCommentAnswerVote = (
    newVote: number,
    commentIndex: number,
    answerIndex: number
  ) => {
    setAnswers((prevState: IAnswer[]) =>
      prevState.map((answer, i) =>
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
      )
    );
  };

  const acceptAnswer = (index: number) => {
    setAnswers((prevState: IAnswer[]) =>
      prevState.map((answer, i) =>
        i === index
          ? {
              ...answer,
              accepted: 1,
            }
          : {
              ...answer,
              accepted: 0,
            }
      )
    );
  };

  const onAnswerFormContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswerFormContent(event.target.value);
  };

  const onAnswerAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const contentTrimmed = answerFormContent.trim();
    const contentValidate = ValidateUtils.validateContent(contentTrimmed);
    if (contentValidate) {
      setAnswerAddError(contentValidate);
      return;
    }
    setAnswerAddError('');

    setAnswerAddSubmitLoading(true);
    AnswerService.createAnswer(contentTrimmed, Number(questionId), token).then(
      (data) => {
        setAnswerAddSubmitLoading(false);
        if (data) {
          addAnswer(data);
        } else {
          setAnswerAddError('An error occured');
        }
      },
      () => {
        setAnswerAddSubmitLoading(false);
        setAnswerAddError('An error occured');
      }
    );
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
        questionUserId={question.user.id}
        card={{
          questionId: question.id,
          title: question.title,
          content: question.content,
          votes: question.votes,
          comments: question.comments,
          user: question.user,
          tags: question.tags,
          currVote: question.currVote,
          createdAt: question.createdAt,
          updatedAt: question.updatedAt,
        }}
        onDelete={deleteQuestion}
        onEditClick={onEditQuestionClick}
        setVote={setQuestionVote}
        addComment={addQuestionComment}
        setCommentVote={setCommentQuestionVote}
      />
      {answers.length ? (
        <div className="d-flex justify-content-between align-items-center mt-1">
          <h3 className="fw-normal">
            {answers.length + ' Answer' + (answers.length === 1 ? '' : 's')}
          </h3>
          <SortDropdown
            sortedByVotes={sortedByVotes}
            setSortedByVotes={setSortedByVotes}
          />
        </div>
      ) : null}
      {answers.map((answer, answerIndex) => (
        <CustomCard
          questionUserId={question.user.id}
          onDelete={() => deleteAnswer(answerIndex)}
          onEditClick={() => onEditAnswerClick(answer.id)}
          className="mt-1"
          key={answerIndex}
          card={{
            answerId: answer.id,
            accepted: answer.accepted === 1,
            content: answer.content,
            votes: answer.votes,
            comments: answer.comments,
            user: answer.user,
            currVote: answer.currVote,
            createdAt: answer.createdAt,
            updatedAt: answer.updatedAt,
          }}
          setVote={(newVote: number) => setAnswerVote(newVote, answerIndex)}
          addComment={(comment: IComment) =>
            addAnswerComment(comment, answerIndex)
          }
          setCommentVote={(newVote: number, commentIndex: number) =>
            setCommentAnswerVote(newVote, commentIndex, answerIndex)
          }
          acceptAnswer={() => acceptAnswer(answerIndex)}
        />
      ))}
      {showAddAnswerForm ? (
        <>
          <h4 className="mt-2 fw-normal">Your Answer</h4>
          <AnswerForm
            content={answerFormContent}
            onContentChange={onAnswerFormContentChange}
            className="mt-1"
            onSubmit={onAnswerAddSubmit}
            submitLoading={answerAddSubmitLoading}
            error={answerAddError}
          />
        </>
      ) : null}
    </div>
  );
}
