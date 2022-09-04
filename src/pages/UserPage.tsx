import { useMemo, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionCardUser from '../components/QuestionCardUser';
import SortDropdown from '../components/SortDropdown';
import QuestionService from '../service/QuestionService';
import IQuestion from '../utils/interfaces/IQuestion';

export default function UserPage() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [questionsAnswered, setQuestionsAnswered] = useState<IQuestion[]>([]);
  const [questionsSortedByVotes, setQuestionsSortedByVotes] = useState(false);
  const [answersSortedByVotes, setAnswersSortedByVotes] = useState(false);

  useMemo(() => {
    setLoading(true);
    QuestionService.getQuestionsByUserId(
      Number(id),
      0,
      questionsSortedByVotes
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
  }, [questionsSortedByVotes]);

  useMemo(() => {
    setLoading(true);
    QuestionService.getQuestionsAnsweredByUserId(
      Number(id),
      0,
      answersSortedByVotes
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
  }, [answersSortedByVotes]);
  if (error) {
    return <div>An error has occured</div>;
  }

  return (
    <div>
      <Tabs>
        <Tab eventKey="questions" title="Questions">
          {loading ? (
            <LoadingSpinner />
          ) : questions.length === 0 ? (
            <h1>No Questions</h1>
          ) : (
            <>
              <SortDropdown
                sortedByVotes={questionsSortedByVotes}
                setSortedByVotes={setQuestionsSortedByVotes}
                className="mt-2 ms-auto w-fit-content"
              />
              {questions.map((question, i) => (
                <QuestionCardUser
                  question={question}
                  key={i}
                  className="mt-2"
                />
              ))}
            </>
          )}
        </Tab>
        <Tab eventKey="answers" title="Answers">
          {loading ? (
            <LoadingSpinner />
          ) : questionsAnswered.length === 0 ? (
            <h1>No Questions Answered</h1>
          ) : (
            <>
              <SortDropdown
                sortedByVotes={answersSortedByVotes}
                setSortedByVotes={setAnswersSortedByVotes}
                className="mt-2 ms-auto w-fit-content"
              />
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
