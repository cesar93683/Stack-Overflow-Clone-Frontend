import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import IQuestion from '../utils/interfaces/IQuestion';
import LoadingSpinner from './LoadingSpinner';
import QuestionCardSmall from './QuestionCardSmall';
import SortDropdown from './SortDropdown';

interface QuestionProps {
  loading: boolean;
  errorOccurred: boolean;
  questions: IQuestion[];
  page: number;
  sortedByVotes: boolean;
  totalPages: number;
  apiLink: string;
}

export default function Questions(props: QuestionProps) {
  const {
    loading,
    errorOccurred,
    questions,
    page,
    sortedByVotes,
    totalPages,
    apiLink,
  } = props;

  const navigate = useNavigate();
  const setSortedByVotes = (state: boolean) => {
    navigate(apiLink + '?sortedByVotes=' + state);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (errorOccurred) {
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
          apiLink +
          '?sortedByVotes=' +
          sortedByVotes +
          '&page=' +
          (!page ? 2 : page + 1)
        }
      >
        <Button>Next</Button>
      </Link>
    );
  }

  let prevButton = null;
  if (page > 1) {
    prevButton = (
      <Link
        to={apiLink + '?sortedByVotes=' + sortedByVotes + '&page=' + (page - 1)}
      >
        <Button>Prev</Button>
      </Link>
    );
  }

  let navButtons = null;
  if (nextButton && !prevButton) {
    navButtons = (
      <div className="d-flex justify-content-end mt-2">{nextButton}</div>
    );
  } else if (nextButton && prevButton) {
    navButtons = (
      <div className="d-flex justify-content-between mt-1">
        {prevButton ? prevButton : null}
        {nextButton ? nextButton : null}
      </div>
    );
  }

  return (
    <div>
      <SortDropdown
        sortedByVotes={sortedByVotes}
        setSortedByVotes={setSortedByVotes}
        className="d-flex justify-content-end"
      />
      {questions.map((question, i) => (
        <QuestionCardSmall question={question} key={i} className="mt-2" />
      ))}
      {navButtons}
    </div>
  );
}
