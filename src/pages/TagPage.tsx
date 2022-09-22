import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Questions from '../components/Questions';
import QuestionService from '../service/QuestionService';
import IQuestion from '../utils/interfaces/IQuestion';
import ITag from '../utils/interfaces/ITag';

export default function TagPage() {
  const { id: tagType } = useParams<{ id: string }>();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const sortedByVotes = searchParams.get('sortedByVotes') !== 'false';

  const [tag, setTag] = useState<ITag>({
    tag: '',
    description: '',
    numQuestions: 0,
  });
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    if (!tagType) {
      setErrorOccurred(true);
      return;
    }
    QuestionService.getQuestionsByTag(
      tagType,
      !page ? 0 : page - 1,
      sortedByVotes
    ).then(
      (data) => {
        setTag(data.tag);
        setQuestions(data.questions.questions);
        setTotalPages(data.questions.totalPages);
        setLoading(false);
      },
      () => {
        setLoading(false);
        setErrorOccurred(true);
      }
    );
  }, [tagType, page, sortedByVotes]);

  return (
    <div>
      <div>
        <h4>{'Questions tagged [' + tag.tag + ']'}</h4>
        <p>{tag.description}</p>
      </div>
      <Questions
        loading={loading}
        errorOccurred={errorOccurred}
        questions={questions}
        page={page}
        sortedByVotes={sortedByVotes}
        totalPages={totalPages}
        apiLink={'/questions/tagged/' + tag + '/'}
      />
    </div>
  );
}
