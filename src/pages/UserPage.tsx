import { useMemo, useState } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionCardUser from '../components/QuestionCardUser';
import SortDropdown from '../components/SortDropdown';
import QuestionService from '../service/QuestionService';
import IQuestion from '../utils/interfaces/IQuestion';
import IUser from '../utils/interfaces/IUser';

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const sortedByVotes = searchParams.get('sortedByVotes') === 'true';
  const questionsTab = searchParams.get('tab') !== 'answers';

  const navigate = useNavigate();

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [user, setUser] = useState<IUser>({
    id: 0,
    username: '',
    reputation: 0,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const setSortedByVotes = (state: boolean) => {
    navigate(
      '/users/' +
        id +
        '?sortedByVotes=' +
        state +
        '&tab=' +
        (questionsTab ? 'questions' : 'answers')
    );
  };

  const onTabClick = (eventKey: string | null) => {
    navigate(
      '/users/' + id + '?sortedByVotes=' + sortedByVotes + '&tab=' + eventKey
    );
  };

  useMemo(() => {
    setLoading(true);
    if (questionsTab) {
      QuestionService.getQuestionsByUserId(
        Number(id),
        !page ? 0 : page - 1,
        sortedByVotes
      ).then(
        (data) => {
          setQuestions(data.questions.questions);
          setTotalPages(data.questions.totalPages);
          setUser(data.user);
          setLoading(false);
        },
        () => {
          setLoading(false);
          setError(true);
        }
      );
    } else {
      QuestionService.getQuestionsAnsweredByUserId(
        Number(id),
        !page ? 0 : page - 1,
        sortedByVotes
      ).then(
        (data) => {
          setQuestions(data.questions.questions);
          setTotalPages(data.questions.totalPages);
          setUser(data.user);
          setLoading(false);
        },
        () => {
          setLoading(false);
          setError(true);
        }
      );
    }
  }, [page, sortedByVotes, questionsTab]);

  if (error) {
    return <div>An error has occured</div>;
  }

  let nextButton = null;
  if ((page && page < totalPages) || (!page && totalPages > 1)) {
    nextButton = (
      <Link
        to={
          '/users/' +
          id +
          '?sortedByVotes=' +
          sortedByVotes +
          '&tab=' +
          (questionsTab ? 'questions' : 'answers') +
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
        to={
          '/users/' +
          id +
          '?sortedByVotes=' +
          sortedByVotes +
          '&tab=' +
          (questionsTab ? 'questions' : 'answers') +
          '&page=' +
          (page - 1)
        }
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

  const tabContent = (
    <>
      <SortDropdown
        sortedByVotes={sortedByVotes}
        setSortedByVotes={setSortedByVotes}
        className="mt-2 ms-auto w-fit-content"
      />
      {questions.map((question, i) => (
        <QuestionCardUser question={question} key={i} className="mt-2" />
      ))}
      {navButtons}
    </>
  );

  return (
    <div>
      <div>
        <div>{user.username}</div>
        <div>{user.reputation}</div>
      </div>
      <Tabs
        defaultActiveKey={questionsTab ? 'questions' : 'answers'}
        onSelect={onTabClick}
      >
        <Tab eventKey="questions" title="Questions">
          {loading ? (
            <LoadingSpinner />
          ) : questions.length === 0 ? (
            <h1>No Questions</h1>
          ) : (
            tabContent
          )}
        </Tab>
        <Tab eventKey="answers" title="Answers">
          {loading ? (
            <LoadingSpinner />
          ) : questions.length === 0 ? (
            <h1>No Questions Answered</h1>
          ) : (
            tabContent
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
