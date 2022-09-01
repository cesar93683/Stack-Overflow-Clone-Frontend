import { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionCardSmall from '../components/QuestionCardSmall';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import IQuestion from '../utils/interfaces/IQuestion';

export default function HomePage() {
  const { token } = useContext(AuthContext);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortedByVotes, setSortedByVotes] = useState(false);

  useEffect(() => {
    QuestionService.getQuestions(0, sortedByVotes, token).then(
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
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {sortedByVotes ? 'Score' : 'Newest'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSortedByVotes(false)}>
            Newest
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortedByVotes(true)}>
            Score
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div>
        {questions.map((question, i) => (
          <QuestionCardSmall question={question} key={i} className="my-2" />
        ))}
      </div>
    </div>
  );
}
