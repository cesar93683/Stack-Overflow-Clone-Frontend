import { useMemo, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionCardUser from '../components/QuestionCardUser';
import QuestionService from '../service/QuestionService';
import IQuestion from '../utils/interfaces/IQuestion';

export default function UserPage() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [questionsAnswered, setQuestionsAnswered] = useState<IQuestion[]>([]);
  const [sortedByVotes, setSortedByVotes] = useState(false);

  useMemo(() => {
    QuestionService.getQuestionsByUserId(Number(id), 0, sortedByVotes).then(
      (data) => {
        setQuestions(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError(true);
      }
    );
    QuestionService.getQuestionsAnsweredByUserId(
      Number(id),
      0,
      sortedByVotes
    ).then(
      (data) => {
        setQuestionsAnswered(data);
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

  return (
    <div>
      <Tabs>
        <Tab eventKey="questions" title="Questions">
          {questions.length === 0 ? (
            <h1>No Questions</h1>
          ) : (
            <>
              {questions.map((question, i) => (
                <QuestionCardUser
                  question={question}
                  key={i}
                  className="my-2"
                />
              ))}
            </>
          )}
        </Tab>
        <Tab eventKey="answers" title="Answers">
          {questionsAnswered.length === 0 ? (
            <h1>No Questions Answered</h1>
          ) : (
            <>
              {questionsAnswered.map((question, i) => (
                <QuestionCardUser
                  question={question}
                  key={i}
                  className="my-2"
                />
              ))}
            </>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
