import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionCardSmall from '../components/QuestionCardSmall';
import SortDropdown from '../components/SortDropdown';
import QuestionService from '../service/QuestionService';
import IQuestion from '../utils/interfaces/IQuestion';

export default function HomePage() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortedByVotes, setSortedByVotes] = useState(false);

  useEffect(() => {
    QuestionService.getQuestions(0, sortedByVotes).then(
      (data) => {
        setQuestions(data.questions);
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
      <SortDropdown
        sortedByVotes={sortedByVotes}
        setSortedByVotes={setSortedByVotes}
        className="ms-auto w-fit-content"
      />
      <div>
        {questions.map((question, i) => (
          <QuestionCardSmall question={question} key={i} className="mt-2" />
        ))}
      </div>
    </div>
  );
}
