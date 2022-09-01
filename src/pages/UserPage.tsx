import { useContext, useMemo, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionCardUser from '../components/QuestionCardUser';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import IQuestion from '../utils/interfaces/IQuestion';

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [sortedByVotes, setSortedByVotes] = useState(false);

  useMemo(() => {
    QuestionService.getQuestionsByUserId(
      Number(id),
      0,
      sortedByVotes,
      token
    ).then(
      (data) => {
        setQuestions(data);
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

  if (questions.length === 0) {
    return <div>There are no questions</div>;
  }

  return (
    <div>
      <Tabs>
        <Tab eventKey="questions" title="Questions">
          {questions.length === 0 ? (
            <h1>No Questions</h1>
          ) : (
            <>
              {questions.map((questions, i) => (
                <QuestionCardUser
                  question={questions}
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
