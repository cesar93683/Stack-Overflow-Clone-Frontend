import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Questions from '../components/Questions';
import QuestionService from '../service/QuestionService';
import IQuestion from '../utils/interfaces/IQuestion';

export default function TagPage() {
  const { id: tag } = useParams<{ id: string }>();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const sortedByVotes = searchParams.get('sortedByVotes') !== 'false';

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    if (!tag) {
      setErrorOccurred(true);
      return;
    }
    QuestionService.getQuestionsByTag(
      tag,
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
      apiLink={'/questions/tagged/' + tag + '/'}
    />
  );
}
