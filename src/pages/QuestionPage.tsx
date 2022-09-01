import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnswerForm from '../components/AnswerForm';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionCard from '../components/QuestionCard';
import AnswerService from '../service/AnswerService';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import IAnswer from '../utils/interfaces/IAnswer';
import IQuestion from '../utils/interfaces/IQuestion';

export default function QuestionPage() {
  const { userId, token } = useContext(AuthContext);
  const { id: questionId } = useParams<{ id: string }>();

  const [question, setQuestion] = useState<IQuestion | undefined>(undefined);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddAnswerForm, setShowAddAnswerForm] = useState(false);

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
      }
    );
    AnswerService.getAnswersByQuestionId(
      Number(questionId),
      0,
      false,
      token
    ).then(
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
      }
    );
  }, []);

  const onDeleteQuestionSuccess = () => {
    navigate('/');
  };

  const onDeleteAnswerSuccess = (index: number) => {
    const newAnswer = [...answers];
    newAnswer.splice(index, 1);
    setAnswers(newAnswer);
  };

  const onAddAnswerSuccess = (answer: IAnswer) => {
    setShowAddAnswerForm(false);
    if (answers) {
      setAnswers([...answers, answer]);
    } else {
      setAnswers([answer]);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!question) {
    return <div>An error has occured</div>;
  }

  return (
    <div>
      <QuestionCard
        question={question}
        onDeleteSuccess={onDeleteQuestionSuccess}
      />
      {answers.length ? (
        <h3 className="fw-normal">
          {answers.length + ' Answer' + (answers.length === 1 ? '' : 's')}
        </h3>
      ) : null}
      {answers.map((answer, i) => (
        <QuestionCard
          onDeleteSuccess={() => onDeleteAnswerSuccess(i)}
          className="mt-1"
          key={i}
          question={answer}
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
