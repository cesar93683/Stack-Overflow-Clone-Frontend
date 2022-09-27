import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Questions from '../components/Questions';
import QuestionService from '../service/QuestionService';
import IQuestion from '../utils/interfaces/IQuestion';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const sortedByVotes = searchParams.get('sortedByVotes') !== 'false';

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    QuestionService.getQuestions(!page ? 0 : page - 1, sortedByVotes).then(
      (data) => {
        setQuestions(data.questions);
        setTotalPages(data.totalPages);
        setLoading(false);
      },
      () => {
        setLoading(false);
        setErrorOccurred(true);
      }
    );
  }, [page, sortedByVotes]);

  return (
    <Questions
      loading={loading}
      errorOccurred={errorOccurred}
      questions={questions}
      page={page}
      sortedByVotes={sortedByVotes}
      totalPages={totalPages}
      apiLink="/"
    />
  );
}
