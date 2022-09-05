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

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const sortedByVotes = searchParams.get('sortedByVotes') === 'true';
  const questionsTab = searchParams.get('tab') !== 'answers';

  const navigate = useNavigate();

  const [questions, setQuestions] = useState<IQuestion[]>([]);
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
          setQuestions(data.questions);
          setTotalPages(data.totalPages);
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
          setQuestions(data.questions);
          setTotalPages(data.totalPages);
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
        <Button className="ms-auto d-block mt-2">Next</Button>
      </Link>
    );
  }

  return (
    <div>
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
            <>
              <SortDropdown
                sortedByVotes={sortedByVotes}
                setSortedByVotes={setSortedByVotes}
                className="mt-2 ms-auto w-fit-content"
              />
              {questions.map((question, i) => (
                <QuestionCardUser
                  question={question}
                  key={i}
                  className="mt-2"
                />
              ))}
              {nextButton ? nextButton : null}
            </>
          )}
        </Tab>
        <Tab eventKey="answers" title="Answers">
          {loading ? (
            <LoadingSpinner />
          ) : questions.length === 0 ? (
            <h1>No Questions Answered</h1>
          ) : (
            <>
              <SortDropdown
                sortedByVotes={sortedByVotes}
                setSortedByVotes={setSortedByVotes}
                className="mt-2 ms-auto w-fit-content"
              />
              {questions.map((question, i) => (
                <QuestionCardUser
                  question={question}
                  key={i}
                  className="my-2"
                />
              ))}
              {nextButton ? nextButton : null}
            </>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
