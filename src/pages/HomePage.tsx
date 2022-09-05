import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionCardSmall from '../components/QuestionCardSmall';
import SortDropdown from '../components/SortDropdown';
import QuestionService from '../service/QuestionService';
import IQuestion from '../utils/interfaces/IQuestion';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const sortedByVotes = searchParams.get('sortedByVotes') !== 'false';

  const navigate = useNavigate();

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    QuestionService.getQuestions(!page ? 0 : page - 1, sortedByVotes).then(
      (data) => {
        setQuestions(data.questions);
        setTotalPages(data.totalPages);
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError(true);
      }
    );
  }, [page, sortedByVotes]);

  const setSortedByVotes = (state: boolean) => {
    navigate('/?sortedByVotes=' + state);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>An error has occured</div>;
  }

  if (questions.length === 0) {
    return <div>There are no questions</div>;
  }

  let nextButton = null;
  if ((page && page < totalPages) || (!page && totalPages > 1)) {
    nextButton = (
      <Link
        to={
          '/?sortedByVotes=' + sortedByVotes + '&page=' + (!page ? 2 : page + 1)
        }
      >
        <Button>Next</Button>
      </Link>
    );
  }

  let prevButton = null;
  if (page > 1) {
    prevButton = (
      <Link to={'/?sortedByVotes=' + sortedByVotes + '&page=' + (page - 1)}>
        <Button>Prev</Button>
      </Link>
    );
  }

  const navButtons =
    nextButton && !prevButton ? (
      <div className="d-flex justify-content-end mt-2">{nextButton}</div>
    ) : (
      <div className="d-flex justify-content-between mt-1">
        {prevButton ? prevButton : null}
        {nextButton ? nextButton : null}
      </div>
    );

  return (
    <div>
      <SortDropdown
        sortedByVotes={sortedByVotes}
        setSortedByVotes={setSortedByVotes}
        className="ms-auto w-fit-content"
      />
      {questions.map((question, i) => (
        <QuestionCardSmall question={question} key={i} className="mt-2" />
      ))}
      {navButtons}
    </div>
  );
}
